# DDU Mirror Simulated Self Demo Report

> SIMULATED DEMO DATA — not real discovery, not verified evidence.

This local report is a stage-ready mock built from the operator-provided seed identifiers. It is intended to demonstrate the product flow when live data sources are unavailable or incomplete.

## Seed Inputs Used For The Simulation

- Handle: `@ch1kim0n1`
- Email: `ch***@gmail.com`
- Phone: `737***6910`

## Simulated Provider Story

- Username discovery: simulated Sherlock-style account enumeration.
- Breach lookup: simulated credential exposure because HIBP is not configured locally.
- Phone lookup: staged only; the app does not yet implement a phone OSINT worker.
- OpenAI: narration/advice only, not a search provider.
- ElevenLabs: voice only, not a search provider.

## Simulated Findings

1. Simulated GitHub account under `@ch1kim0n1`
   - Confidence: 88%
   - Verification state: likely
   - Demo meaning: public developer metadata can expose work patterns, email habits, and project interests.

2. Simulated Reddit account under `@ch1kim0n1`
   - Confidence: 55%
   - Verification state: hypothesis
   - Demo meaning: handle reuse can connect casual posts back to a primary identity, but username collisions are common.

3. Simulated forum breach involving the supplied email
   - Confidence: 95%
   - Verification state: confirmed in the mock scenario
   - Demo meaning: breached credentials are irreversible; the remediation story becomes password rotation, MFA, and monitoring.

4. Simulated credential-reuse risk
   - Confidence: 60%
   - Verification state: hypothesis
   - Demo meaning: one exposed credential pattern can become an account-takeover path.

5. Simulated employer clue from public developer metadata
   - Confidence: 85%
   - Verification state: likely
   - Demo meaning: commit metadata or profile bio fragments can reveal workplace context.

6. Simulated phone-linkability risk
   - Confidence: 50%
   - Verification state: hypothesis
   - Demo meaning: phone numbers are often reused across signups, broker records, and recovery flows; this is staged because the app does not yet search phone sources.

## Simulated Risk Score

- Demo score: 63/100
- Demo band: elevated
- Highest-risk chain: breach exposure → credential reuse → account takeover.
- Permanent exposure share: medium, because staged breach data cannot be deleted once distributed.

## Demo Remediation Checklist

- Rotate reused passwords and move every important account to a password manager.
- Enable phishing-resistant MFA for email, GitHub, banking, and cloud accounts.
- Remove public recovery phone exposure where platforms allow it.
- Review public profile bios for workplace/location clues.
- Separate pseudonymous handles from professional identifiers.

## Presenter Note

Use this report as a simulated walkthrough. Do not present it as real OSINT evidence or as a successful live discovery result.
