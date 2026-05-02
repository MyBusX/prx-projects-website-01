from __future__ import annotations

from decimal import Decimal

from .models import CompanyProfile, PropertyRecord, Quote, money
from .validation import validate_measurement


DEFAULT_RATE_PER_M2 = Decimal("95")


def build_quote(
    record: PropertyRecord,
    company: CompanyProfile | None = None,
    rate_per_m2: Decimal = DEFAULT_RATE_PER_M2,
) -> Quote:
    profile = company or CompanyProfile()
    measurement = record.measurement
    building_cost = money(measurement.building_area_m2 * rate_per_m2)
    boundary_cost = money(measurement.boundary_area_m2 * rate_per_m2)
    subtotal = money(building_cost + boundary_cost)
    vat = money(subtotal * profile.vat_rate)
    total = money(subtotal + vat)
    valid, reason = validate_measurement(measurement)

    return Quote(
        property=record,
        rate_per_m2=rate_per_m2,
        building_cost=building_cost,
        boundary_cost=boundary_cost,
        subtotal=subtotal,
        vat=vat,
        total=total,
        requires_review=not valid,
        review_reason=reason,
    )

