from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path
import sqlite3

from .models import Quote


SCHEMA = """
CREATE TABLE IF NOT EXISTS processed_properties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT NOT NULL,
    address TEXT NOT NULL,
    estate TEXT NOT NULL,
    city TEXT NOT NULL,
    owner_name TEXT,
    owner_email TEXT,
    contact_source TEXT,
    measurement_confidence REAL NOT NULL,
    building_area_m2 REAL NOT NULL,
    boundary_area_m2 REAL NOT NULL,
    building_cost REAL NOT NULL,
    boundary_cost REAL NOT NULL,
    total REAL NOT NULL,
    pdf_path TEXT NOT NULL,
    delivery_status TEXT NOT NULL,
    review_reason TEXT
);
"""


class AuditStore:
    def __init__(self, path: Path) -> None:
        self.path = path
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self.conn = sqlite3.connect(path)
        self.conn.execute(SCHEMA)
        self.conn.commit()

    def log_quote(self, quote: Quote, pdf_path: Path, delivery_status: str) -> None:
        measurement = quote.property.measurement
        self.conn.execute(
            """
            INSERT INTO processed_properties (
                created_at, address, estate, city, owner_name, owner_email,
                contact_source, measurement_confidence, building_area_m2,
                boundary_area_m2, building_cost, boundary_cost, total,
                pdf_path, delivery_status, review_reason
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                datetime.now(timezone.utc).isoformat(),
                quote.property.address,
                quote.property.estate,
                quote.property.city,
                quote.property.owner_name,
                quote.property.owner_email,
                quote.property.contact_source,
                float(measurement.confidence),
                float(measurement.building_area_m2),
                float(measurement.boundary_area_m2),
                float(quote.building_cost),
                float(quote.boundary_cost),
                float(quote.total),
                str(pdf_path),
                delivery_status,
                quote.review_reason,
            ),
        )
        self.conn.commit()

    def close(self) -> None:
        self.conn.close()

