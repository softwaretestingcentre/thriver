import React from "react";
import '@testing-library/jest-dom';
import { render, screen, waitFor } from "@testing-library/react";
import ProgressChart from "src/app/components/Charts/ProgressChart";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ chartData: { exercise: 2, meal: 1 } }),
  })
) as jest.Mock;

describe("ProgressChart", () => {
  it("renders chart with data from API", async () => {
    render(<ProgressChart />);
    await waitFor(() => {
      expect(screen.getByText(/Progress Chart/i)).toBeInTheDocument();
      // Only check for visible DOM elements, not canvas-rendered text
      // Optionally, check for the canvas element itself
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });
});
