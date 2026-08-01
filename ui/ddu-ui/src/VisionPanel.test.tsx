import {render, screen, waitFor} from "@testing-library/react";
import {beforeEach, describe, expect, it, vi} from "vitest";

const mocks = vi.hoisted(() => ({
  visionDemos: vi.fn(async () => ({
    count: 1,
    assets: [
      {
        slug: "driveway",
        label: "Vacation driveway photo",
        description: "Residential GPS + visible license plate.",
      },
    ],
  })),
}));

vi.mock("./mirror-api", () => ({
  mirrorApi: {
    health: vi.fn(async () => ({
      state: "HEALTHY",
      service: "ddu-mirror-intel",
      dependencies: {},
    })),
    visionDemos: mocks.visionDemos,
  },
}));

vi.mock("./LivenessChallenge", () => ({
  LivenessChallenge: () => <div>Liveness challenge</div>,
}));

import {VisionPanel} from "./VisionPanel";

function renderPanel(dataMode: "mock" | "real") {
  return render(
    <VisionPanel
      busy={false}
      dataMode={dataMode}
      onSnapshot={vi.fn()}
      sessionId="sess_test"
      setBusy={vi.fn()}
      setError={vi.fn()}
    />,
  );
}

describe("VisionPanel", () => {
  beforeEach(() => {
    mocks.visionDemos.mockClear();
  });

  it("does not expose demo photos in real mode", async () => {
    renderPanel("real");

    expect(screen.getByText(/Real mode analyzes images you upload/i)).toBeInTheDocument();
    expect(screen.getByText(/Upload an image to analyze/i)).toBeInTheDocument();
    expect(screen.queryByText("Vacation driveway photo")).not.toBeInTheDocument();
    await waitFor(() => expect(mocks.visionDemos).not.toHaveBeenCalled());
  });

  it("shows demo photos only in mock mode", async () => {
    renderPanel("mock");

    await screen.findByText("Vacation driveway photo");
    expect(mocks.visionDemos).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/Demo photos are pre-indexed/i)).toBeInTheDocument();
  });
});
