# Architecture

## Boundary

This scaffold supports compliant quotation generation from authorised inputs. It does not implement blind scraping, bulk owner tracing, or automatic unsolicited delivery.

## Flow

1. Import a CSV batch with property addresses, measurement values, contact source, and consent status.
2. Validate measurement confidence and area thresholds.
3. Calculate painting and preparation cost at R95/m2.
4. Add 15% VAT.
5. Generate a branded quotation PDF.
6. Store an audit record in SQLite.
7. Create an email draft only when:
   - measurement validation passes,
   - the email format is valid,
   - the contact source is recorded,
   - consent or an approved lawful basis is recorded.

## Provider Interfaces

`plexi_agent/providers.py` contains the integration points:

- `ImageryMeasurementProvider` for authorised imagery and measurement services.
- `ContactProvider` for contracted Deeds Office/contact data providers.
- `assess_delivery` for delivery gating.

Production adapters should capture:

- provider name,
- query timestamp,
- source record identifier,
- purpose,
- lawful basis,
- operator or job id,
- raw confidence score,
- retention/deletion policy.

## Why Delivery Is Gated

Automatically obtaining personal contact details and sending quotations can create privacy, consent, direct-marketing, and reputational risk. POPIA compliance depends on the exact source, purpose, lawful basis, notice, opt-out mechanism, retention policy, and contractual terms with the data provider.

The current implementation therefore produces PDFs and email drafts but does not send. A production sender should only be enabled after legal review and should include suppression lists, unsubscribe handling, delivery logs, and a clear opt-out process.

## Suggested Next Build Steps

1. Add a small web dashboard for reviewing batches and approving sendable quotes.
2. Add a real PDF template with the Plexi Renovations logo.
3. Add a legitimate imagery measurement adapter.
4. Add a contracted contact lookup adapter after legal approval.
5. Add a transactional email adapter with unsubscribe and suppression list support.

