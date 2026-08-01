# Real Data End-to-End Report

Generated: 2026-08-01 11:03 AM America/Chicago

## Scope

This run used the real-data path with the supplied email and handle. The phone number was not searched because the current product contract has no phone field or phone lookup worker.

Excluded from the real-findings report:

- Public records advisor, because it is generic state/county statute guidance and performs no person-specific lookup.
- Photo intelligence, because no real image upload was provided for this run.
- Mock/demo findings.

## Provider Status

- Username lookup: live via Sherlock.
- Email breach lookup: not live; `HIBP_API_KEY` is not configured.
- OpenAI LLM: available for narration/advice paths, not used as a search provider.
- ElevenLabs: available for voice STT/TTS, not used as a search provider.

## Run Summary

- Session: `real-e2e-4b17e6dd718b4d1fb02cf61c3d9db21e`
- Exposure score: 15/100
- Band: minimal
- Contributing findings: 3, including seed identity
- Irreversible share: 0%
- Attack paths found: none

## Approved Steps

| Step | Result |
|---|---|
| Search for accounts using handle | 2 findings |
| Check verified email against breach corpora | 0 findings |
| Test linkability between discovered accounts | 0 findings |
| Public records advisor | Rejected as generic/non-person-specific |

## Findings

| Finding | Type | Confidence | Verification | Source | Notes |
|---|---:|---:|---|---|---|
| Verified seed identity | seed identity | 100% | confirmed | identity gate | Baseline session identity, not an OSINT discovery. |
| GitHub account under the supplied handle | account | 85% | likely | Sherlock GitHub check | Username match. Not proof of identity by itself. |
| Reddit account under the supplied handle | account | 55% | hypothesis | Sherlock Reddit check | Username match. Collision risk is higher on Reddit. |

## Non-Findings

- Breaches: 0 results. This is not a reliable “no breaches exist” answer because HIBP live lookup is not configured.
- Phone: not searched. The application currently does not accept phone as scan input.
- Linkability: 0 results. The app examined the discovered accounts and found no local cross-account link above threshold.

## Conclusion

The real-data pipeline is now actually running live username discovery. The only person-specific discoveries from this run are the GitHub and Reddit handle matches. The previous Texas records and visual geolocation items were not real personal search results; they came from generic records advice or the photo pipeline.
