from __future__ import annotations

import argparse
import csv
import json
from decimal import Decimal, InvalidOperation
from pathlib import Path
from typing import Any

from .emailer import build_email_body
from .models import PropertyMeasurement, PropertyRecord
from .pdf import generate_quote_pdf
from .providers import assess_delivery
from .quote import build_quote
from .storage import AuditStore
from .validation import valid_email


MAX_BATCH_SIZE = 20


def _decimal(row: dict[str, str], key: str) -> Decimal:
    try:
        return Decimal((row.get(key) or "").strip())
    except InvalidOperation as exc:
        raise ValueError(f"Invalid decimal value for {key}") from exc


def _bool(value: str) -> bool:
    return value.strip().lower() in {"1", "true", "yes", "y"}


def _record_from_row(row: dict[str, str]) -> PropertyRecord:
    measurement = PropertyMeasurement(
        single_storey_perimeter_m=_decimal(row, "single_storey_perimeter_m"),
        double_storey_perimeter_m=_decimal(row, "double_storey_perimeter_m"),
        boundary_wall_perimeter_m=_decimal(row, "boundary_wall_perimeter_m"),
        confidence=_decimal(row, "measurement_confidence"),
    )
    return PropertyRecord(
        address=(row.get("address") or "").strip(),
        estate=(row.get("estate") or "").strip(),
        city=(row.get("city") or "").strip(),
        measurement=measurement,
        owner_name=(row.get("owner_name") or "Property Owner").strip(),
        owner_email=(row.get("owner_email") or "").strip(),
        contact_source=(row.get("contact_source") or "").strip(),
        consent_to_email=_bool(row.get("consent_to_email") or ""),
    )


def process(csv_path: Path, out_dir: Path) -> dict[str, Any]:
    out_dir.mkdir(parents=True, exist_ok=True)
    quote_dir = out_dir / "quotations"
    email_dir = out_dir / "email_drafts"
    email_dir.mkdir(parents=True, exist_ok=True)

    with csv_path.open(newline="", encoding="utf-8-sig") as handle:
        rows = list(csv.DictReader(handle))

    if len(rows) > MAX_BATCH_SIZE:
        raise ValueError(f"Batch size is {len(rows)}; maximum allowed is {MAX_BATCH_SIZE}")

    store = AuditStore(out_dir / "plexi_agent.sqlite3")
    summary: dict[str, Any] = {
        "properties_processed": 0,
        "properties_skipped": [],
        "quotations_created": 0,
        "emails_ready": 0,
        "failed_deliveries": [],
        "total_estimated_revenue": "R0.00",
    }
    total_revenue = Decimal("0")

    try:
        for index, row in enumerate(rows, start=1):
            try:
                record = _record_from_row(row)
                if not record.address:
                    raise ValueError("Missing property address")

                quote = build_quote(record)
                pdf_path = generate_quote_pdf(quote, quote_dir)
                delivery = assess_delivery(record)

                if quote.requires_review:
                    delivery_status = f"skipped_review: {quote.review_reason}"
                    summary["properties_skipped"].append({"address": record.address, "reason": quote.review_reason})
                elif not valid_email(record.owner_email):
                    delivery_status = "skipped_invalid_email"
                    summary["failed_deliveries"].append({"address": record.address, "reason": "Invalid email format"})
                elif not delivery.can_send:
                    delivery_status = f"draft_only: {delivery.reason}"
                    summary["properties_skipped"].append({"address": record.address, "reason": delivery.reason})
                else:
                    delivery_status = "email_ready"
                    draft_path = email_dir / f"{pdf_path.stem}.txt"
                    draft_path.write_text(build_email_body(quote), encoding="utf-8")
                    summary["emails_ready"] += 1
                    total_revenue += quote.total

                store.log_quote(quote, pdf_path, delivery_status)
                summary["properties_processed"] += 1
                summary["quotations_created"] += 1
            except Exception as exc:  # Keep batch processing moving and audit the failure in the summary.
                summary["properties_skipped"].append({"row": index, "reason": str(exc)})
    finally:
        store.close()

    summary["total_estimated_revenue"] = f"R{total_revenue:,.2f}"
    (out_dir / "batch_summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    return summary


def main() -> None:
    parser = argparse.ArgumentParser(description="Plexi Renovations quotation agent")
    sub = parser.add_subparsers(dest="command", required=True)

    process_parser = sub.add_parser("process", help="Process a CSV batch")
    process_parser.add_argument("csv_path", type=Path)
    process_parser.add_argument("--out", type=Path, default=Path("output"))

    args = parser.parse_args()
    if args.command == "process":
        summary = process(args.csv_path, args.out)
        print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()

