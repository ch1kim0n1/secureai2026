import {render, screen} from "@testing-library/react";
import {describe, expect, it, vi, beforeEach} from "vitest";

vi.mock("./mirror-api", () => ({
  mirrorApi: {
    health: vi.fn(async () => ({state: "HEALTHY", service: "ddu-mirror-intel"})),
    versionz: vi.fn(async () => ({
      service: "ddu-mirror-intel",
      service_version: "0.0.0",
      tool_version: "1.0.0",
    })),
    providers: vi.fn(async () => ({
      anthropic: "not_configured",
      openai: "not_configured",
      local: "available",
      llm: "degraded",
      elevenlabs: "not_configured",
      redis: "disabled",
    })),
    createSession: vi.fn(async () => ({
      session_id: "sess_test",
      snapshot: {
        session_id: "sess_test",
        contract_version: "1.0.0",
        persona: "scammer",
        findings: [],
        attack_paths: [],
        attribution: [],
        score: {
          score: 0,
          band: "low",
          persona: "scammer",
          contributing_findings: 0,
          suppressed_findings: 0,
          irreversible_share: 0,
          top_drivers: [],
          by_severity: {},
        },
        pending_proposals: [],
        action_log_tail: [],
      },
    })),
    plan: vi.fn(async () => ({proposals: []})),
    snapshot: vi.fn(async () => {
      throw new Error("missing");
    }),
  },
  websocketURL: () => "ws://localhost/intel/ws/x",
  SessionExpiredError: class extends Error {},
  RateLimitError: class extends Error {},
}));

import App, {buildRealReportMarkdown, realReportFindings} from "./App";
import type {Finding, SessionSnapshot} from "./mirror-types";

function finding(overrides: Partial<Finding>): Finding {
  return {
    contract_version: "1.0.0",
    id: overrides.id || "finding",
    parent_id: null,
    hop_depth: 1,
    type: "account",
    label: "Finding",
    detail: "Detail",
    verification_state: "likely",
    confidence: 0.85,
    severity_base: 0.3,
    severity: "low",
    severity_score: 30,
    reversible: true,
    remediation: {action: "Review exposure", effort: "low"},
    platform: null,
    source: "sherlock:GitHub",
    method: "sherlock",
    evidence: [],
    attack_path_ids: [],
    subject_ref: "self",
    origin: "agent",
    human_note: null,
    timestamp: "2026-08-01T00:00:00Z",
    ...overrides,
  };
}

function snapshot(findings: Finding[]): SessionSnapshot {
  return {
    session_id: "sess_report",
    contract_version: "1.0.0",
    persona: "scammer",
    findings,
    attack_paths: [],
    attribution: [],
    score: {
      score: 15,
      band: "minimal",
      persona: "scammer",
      contributing_findings: 1,
      suppressed_findings: 0,
      irreversible_share: 0,
      top_drivers: [],
      by_severity: {info: 0, low: 1, medium: 0, high: 0, critical: 0},
    },
    pending_proposals: [],
    action_log_tail: [
      {
        seq: 1,
        session_id: "sess_report",
        at: "2026-08-01T00:00:00Z",
        actor: "agent",
        action: "agent.executed",
        subject: "discovery.accounts",
        detail: "Found 1 username result.",
        metadata: {step: "discovery.accounts"},
      },
    ],
  };
}

describe("App", () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it("boots mock mode and shows the shell or boot screen", async () => {
    render(<App />);
    expect(
      screen.getByText(/Establishing an ephemeral Mirror session|The experience is built|DDU \/ MIRROR/i),
    ).toBeInTheDocument();
  });

  it("builds a real report from personal real-provider findings only", () => {
    const reportSnapshot = snapshot([
      finding({id: "seed", type: "seed_identity", label: "Seed identity", source: "operator"}),
      finding({id: "real", label: "GitHub account under supplied handle"}),
      finding({
        id: "records",
        type: "record_class",
        label: "Court records and dockets are public in Texas",
        source: "public-records-advisor",
      }),
      finding({
        id: "mock",
        label: "Office badge selfie",
        source: "demo-photo-cache",
        method: "mock",
      }),
    ]);

    const findings = realReportFindings(reportSnapshot, new Set(["discovery.accounts"]));
    const markdown = buildRealReportMarkdown(reportSnapshot, new Set(["discovery.accounts"]), {
      sherlock: "available",
      hibp: "not_configured",
      llm: "available",
      elevenlabs: "available",
    });

    expect(findings.map((item) => item.id)).toEqual(["real"]);
    expect(markdown).toContain("GitHub account under supplied handle");
    expect(markdown).not.toContain("Court records and dockets");
    expect(markdown).not.toContain("Office badge selfie");
    expect(markdown).toContain("OpenAI LLM: available for advice/narration, not search");
  });
});
