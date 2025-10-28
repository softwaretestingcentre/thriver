import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import NotificationList from "src/app/components/Notifications/NotificationList";

describe("Error handling in NotificationList", () => {
  it("renders fallback when notifications prop is missing", () => {
    // @ts-expect-error: testing missing prop
    render(<NotificationList />);
    expect(screen.getByText(/No notifications/i)).toBeInTheDocument();
  });

  it("renders fallback when notifications is empty", () => {
  render(<NotificationList notifications={[]} />);
    expect(screen.getByText(/No notifications/i)).toBeInTheDocument();
  });
});
