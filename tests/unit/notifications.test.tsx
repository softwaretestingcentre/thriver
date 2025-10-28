import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import NotificationList, { Notification } from "src/app/components/Notifications/NotificationList";
import NotificationForm from "src/app/components/Notifications/NotificationForm";

describe("NotificationList", () => {
  const notifications: Notification[] = [
    { id: "1", message: "Welcome!", type: "info", createdAt: "2025-10-28" },
    { id: "2", message: "Goal achieved!", type: "success", createdAt: "2025-10-28" },
  ];

  it("renders notifications and handles delete", () => {
    const handleDelete = jest.fn();
    render(<NotificationList notifications={notifications} onDelete={handleDelete} />);
    expect(screen.getByText(/Welcome!/i)).toBeInTheDocument();
    expect(screen.getByText(/Goal achieved!/i)).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("Delete notification 1"));
    expect(handleDelete).toHaveBeenCalledWith("1");
  });
});

describe("NotificationForm", () => {
  it("submits new notification", () => {
    const handleCreate = jest.fn();
    render(<NotificationForm onCreate={handleCreate} />);
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: "Test notification" } });
    fireEvent.change(screen.getByLabelText(/Type/i), { target: { value: "success" } });
    fireEvent.click(screen.getByText(/Create Notification/i));
    expect(handleCreate).toHaveBeenCalledWith("Test notification", "success");
  });
});
