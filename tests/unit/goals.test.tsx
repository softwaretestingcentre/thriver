import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import GoalList from "src/app/components/Goals/GoalList";
import GoalForm from "src/app/components/Goals/GoalForm";

global.fetch = jest.fn((url, options) => {
  if (options && options.method === "POST") {
    return Promise.resolve({
      json: () => Promise.resolve({ goal: { id: 2, title: "New Goal", description: "Test" } }),
    });
  }
  return Promise.resolve({
    json: () => Promise.resolve({ goals: [{ id: 1, title: "Goal 1", description: "Desc" }] }),
  });
}) as jest.Mock;

describe("GoalList", () => {
  it("renders goals from API", async () => {
    render(<GoalList />);
    await waitFor(() => {
      expect(screen.getByText(/Goal 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Desc/i)).toBeInTheDocument();
    });
  });
});

describe("GoalForm", () => {
  it("submits new goal to API", async () => {
    render(<GoalForm />);
    fireEvent.change(screen.getByPlaceholderText(/Goal Title/i), { target: { value: "New Goal" } });
    fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: "Test" } });
    fireEvent.click(screen.getByRole("button", { name: /Add Goal/i }));
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Goal Title/i)).toHaveValue("");
      expect(screen.getByPlaceholderText(/Description/i)).toHaveValue("");
    });
  });
});
