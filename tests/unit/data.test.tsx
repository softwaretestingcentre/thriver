import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DataEntryList from "src/app/components/DataTracking/DataEntryList";
import DataEntryForm from "src/app/components/DataTracking/DataEntryForm";

global.fetch = jest.fn((url, options) => {
  if (options && options.method === "POST") {
    return Promise.resolve({
      json: () => Promise.resolve({ entry: { id: 2, type: "exercise", value: "Running", date: "2025-10-28" } }),
    });
  }
  return Promise.resolve({
    json: () => Promise.resolve({ dataEntries: [{ id: 1, type: "meal", value: "Salad", date: "2025-10-28" }] }),
  });
}) as jest.Mock;

describe("DataEntryList", () => {
  it("renders data entries from API", async () => {
    render(<DataEntryList />);
    await waitFor(() => {
      expect(screen.getByText(/meal/i)).toBeInTheDocument();
      expect(screen.getByText(/Salad/i)).toBeInTheDocument();
    });
  });
});

describe("DataEntryForm", () => {
  it("submits new data entry to API", async () => {
    render(<DataEntryForm />);
    fireEvent.change(screen.getByPlaceholderText(/Type/i), { target: { value: "exercise" } });
    fireEvent.change(screen.getByPlaceholderText(/Value/i), { target: { value: "Running" } });
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: "2025-10-28" } });
    fireEvent.click(screen.getByRole("button", { name: /Add Entry/i }));
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Type/i)).toHaveValue("");
      expect(screen.getByPlaceholderText(/Value/i)).toHaveValue("");
      expect(screen.getByLabelText(/date/i)).toHaveValue("");
    });
  });
});
