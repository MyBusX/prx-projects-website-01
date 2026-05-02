from __future__ import annotations

from datetime import date, timedelta
from decimal import Decimal
from pathlib import Path
import textwrap

from .models import CompanyProfile, Quote


def _fmt_money(value: Decimal) -> str:
    return f"R{value:,.2f}"


def _escape_pdf_text(value: str) -> str:
    return value.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


def _text_ops(lines: list[str], x: int = 54, y: int = 790, leading: int = 16) -> str:
    ops = ["BT", "/F1 10 Tf", f"{x} {y} Td"]
    for index, line in enumerate(lines):
        if index:
            ops.append(f"0 -{leading} Td")
        ops.append(f"({_escape_pdf_text(line)}) Tj")
    ops.append("ET")
    return "\n".join(ops)


def generate_quote_pdf(quote: Quote, output_dir: Path, company: CompanyProfile | None = None) -> Path:
    profile = company or CompanyProfile()
    output_dir.mkdir(parents=True, exist_ok=True)

    safe_address = "".join(ch if ch.isalnum() else "_" for ch in quote.property.address).strip("_")
    path = output_dir / f"plexi_quote_{safe_address[:48]}.pdf"
    valid_until = date.today() + timedelta(days=30)
    measurement = quote.property.measurement

    lines = [
        profile.name,
        profile.location,
        f"Email: {profile.email} | Contact: {profile.phone}",
        "",
        "Painting and Preparation Quotation",
        f"Property: {quote.property.address}, {quote.property.estate}, {quote.property.city}",
        f"Prepared for: {quote.property.owner_name}",
        f"Valid until: {valid_until.isoformat()}",
        "",
        "Measurement Summary",
        f"Single storey wall area: {measurement.single_storey_area_m2:,.1f} m2",
        f"Double storey wall area: {measurement.double_storey_area_m2:,.1f} m2",
        f"Boundary wall area: {measurement.boundary_area_m2:,.1f} m2",
        f"Measurement confidence: {measurement.confidence:.0%}",
        "",
        "Quotation Breakdown",
        f"Painting and preparation rate: {_fmt_money(quote.rate_per_m2)} per m2",
        f"Building painting and preparation: {_fmt_money(quote.building_cost)}",
        f"Boundary wall painting: {_fmt_money(quote.boundary_cost)}",
        f"Subtotal: {_fmt_money(quote.subtotal)}",
        f"VAT at 15%: {_fmt_money(quote.vat)}",
        f"Total including VAT: {_fmt_money(quote.total)}",
        "",
        "Notes and Disclaimers",
        "Waterproofing costs may apply depending on property condition.",
        "Paint specification and colour to be confirmed upon quotation finalisation.",
        "Product warranties and installation terms to be confirmed.",
        "This estimate is subject to on-site verification and is valid for 30 days.",
    ]

    if quote.requires_review:
        lines.extend(["", f"Internal review required: {quote.review_reason}"])

    wrapped: list[str] = []
    for line in lines:
        if not line:
            wrapped.append("")
            continue
        wrapped.extend(textwrap.wrap(line, width=90) or [""])

    content = _text_ops(wrapped)
    stream = content.encode("latin-1", errors="replace")

    objects = [
        b"<< /Type /Catalog /Pages 2 0 R >>",
        b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
        b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
        b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
        b"<< /Length " + str(len(stream)).encode("ascii") + b" >>\nstream\n" + stream + b"\nendstream",
    ]

    pdf = bytearray(b"%PDF-1.4\n")
    offsets = [0]
    for number, obj in enumerate(objects, start=1):
        offsets.append(len(pdf))
        pdf.extend(f"{number} 0 obj\n".encode("ascii"))
        pdf.extend(obj)
        pdf.extend(b"\nendobj\n")

    xref_at = len(pdf)
    pdf.extend(f"xref\n0 {len(objects) + 1}\n".encode("ascii"))
    pdf.extend(b"0000000000 65535 f \n")
    for offset in offsets[1:]:
        pdf.extend(f"{offset:010d} 00000 n \n".encode("ascii"))
    pdf.extend(
        f"trailer << /Size {len(objects) + 1} /Root 1 0 R >>\nstartxref\n{xref_at}\n%%EOF\n".encode("ascii")
    )

    path.write_bytes(pdf)
    return path

