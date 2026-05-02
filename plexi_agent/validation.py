from __future__ import annotations

import re
from decimal import Decimal

from .models import PropertyMeasurement


EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def validate_measurement(measurement: PropertyMeasurement) -> tuple[bool, str]:
    if measurement.confidence < Decimal("0.80"):
        return False, "Measurement confidence below 80% threshold"

    if measurement.building_area_m2 < Decimal("50"):
        return False, "Building area is unusually small"

    if measurement.building_area_m2 > Decimal("5000"):
        return False, "Building area is unusually large"

    if measurement.boundary_wall_perimeter_m < 0:
        return False, "Boundary wall perimeter cannot be negative"

    return True, ""


def valid_email(email: str) -> bool:
    return bool(EMAIL_RE.match(email.strip()))

