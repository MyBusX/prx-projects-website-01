from __future__ import annotations

from decimal import Decimal

from .models import CompanyProfile, Quote


def _fmt_money(value: Decimal) -> str:
    return f"R{value:,.2f}"


def build_email_body(quote: Quote, company: CompanyProfile | None = None) -> str:
    profile = company or CompanyProfile()
    record = quote.property
    return f"""Dear {record.owner_name},

Thank you for your property in {record.estate}, {record.city}.

We have prepared a professional painting and preparation quotation for your residence at {record.address}. This estimate includes painting of the main building structure and boundary walls, based on supplied or authorised property measurements and industry standard rates.

Please find your detailed quotation attached.

Quotation Summary:
- Building painting & preparation: {_fmt_money(quote.building_cost)}
- Boundary wall painting: {_fmt_money(quote.boundary_cost)}
- Total (inc. 15% VAT): {_fmt_money(quote.total)}

This quotation is valid for 30 days. Should you wish to proceed or require any clarification, please reply to this email or contact us directly.

Best regards,
{profile.name}
{profile.location}
Contact: {profile.phone}
"""

