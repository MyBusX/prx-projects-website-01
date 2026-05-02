from __future__ import annotations

from dataclasses import dataclass
from decimal import Decimal, ROUND_HALF_UP


MONEY = Decimal("0.01")


def money(value: Decimal) -> Decimal:
    return value.quantize(MONEY, rounding=ROUND_HALF_UP)


@dataclass(frozen=True)
class CompanyProfile:
    name: str = "Plexi Renovations"
    location: str = "Midstream, Gauteng, South Africa"
    email: str = "quotes@plexirenovations.co.za"
    phone: str = "[phone number]"
    vat_rate: Decimal = Decimal("0.15")


@dataclass(frozen=True)
class PropertyMeasurement:
    single_storey_perimeter_m: Decimal
    double_storey_perimeter_m: Decimal
    boundary_wall_perimeter_m: Decimal
    confidence: Decimal

    @property
    def single_storey_area_m2(self) -> Decimal:
        return self.single_storey_perimeter_m * Decimal("3.5")

    @property
    def double_storey_area_m2(self) -> Decimal:
        return self.double_storey_perimeter_m * Decimal("7")

    @property
    def building_area_m2(self) -> Decimal:
        return self.single_storey_area_m2 + self.double_storey_area_m2

    @property
    def boundary_area_m2(self) -> Decimal:
        return self.boundary_wall_perimeter_m * Decimal("1.8")


@dataclass(frozen=True)
class PropertyRecord:
    address: str
    estate: str
    city: str
    measurement: PropertyMeasurement
    owner_name: str
    owner_email: str
    contact_source: str
    consent_to_email: bool


@dataclass(frozen=True)
class Quote:
    property: PropertyRecord
    rate_per_m2: Decimal
    building_cost: Decimal
    boundary_cost: Decimal
    subtotal: Decimal
    vat: Decimal
    total: Decimal
    requires_review: bool
    review_reason: str

