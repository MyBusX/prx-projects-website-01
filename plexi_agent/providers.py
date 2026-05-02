from __future__ import annotations

from dataclasses import dataclass

from .models import PropertyRecord


@dataclass(frozen=True)
class DeliveryDecision:
    can_send: bool
    reason: str


class ContactProvider:
    """Interface for contracted deeds/contact providers.

    Implementations must record source, lawful basis, purpose, and timestamp.
    """

    def lookup(self, address: str) -> dict[str, str]:
        raise NotImplementedError("Connect a contracted provider before using contact lookup")


class ImageryMeasurementProvider:
    """Interface for authorised imagery and measurement services."""

    def measure(self, address: str) -> dict[str, float]:
        raise NotImplementedError("Connect an authorised imagery provider before using measurement lookup")


def assess_delivery(record: PropertyRecord) -> DeliveryDecision:
    if not record.owner_email:
        return DeliveryDecision(False, "No owner email available")

    if not record.contact_source:
        return DeliveryDecision(False, "Missing contact data source")

    if not record.consent_to_email:
        return DeliveryDecision(False, "No recorded consent or approved lawful basis for email delivery")

    return DeliveryDecision(True, "Ready for delivery")

