import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Dashboard from "src/app/pages/dashboard";
import { SessionProvider } from "next-auth/react";

const mockDashboard = {
  email: "test@example.com",
  goals: [{ id: 1, title: "Lose weight" }],
  dataEntries: [{ id: 1, type: "exercise", value: "Running", date: "2025-10-28" }],
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ user: mockDashboard }),
  })
) as jest.Mock;

describe("Dashboard", () => {
  it("renders dashboard data for authenticated user", async () => {
    render(
      <SessionProvider session={{ user: { email: "test@example.com" }, expires: "" }}>
        <Dashboard />
      </SessionProvider>
    );
    await waitFor(() => {
      expect(screen.getByText(/Welcome, test@example.com/i)).toBeInTheDocument();
      expect(screen.getByText(/Lose weight/i)).toBeInTheDocument();
      expect(screen.getByText(/Running/i)).toBeInTheDocument();
    });
  });

  it("shows sign in prompt for unauthenticated user", () => {
    render(
      <SessionProvider session={null}>
        <Dashboard />
      </SessionProvider>
    );
    expect(screen.getByText(/Sign in to access your dashboard/i)).toBeInTheDocument();
  });
});
