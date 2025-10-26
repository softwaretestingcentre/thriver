import React from "react";
import { render, screen } from "@testing-library/react";
import AuthForm from "src/app/components/Auth/AuthForm";
import { SessionProvider } from "next-auth/react";

describe("AuthForm", () => {
  it("renders sign in form when not authenticated", () => {
    render(
      <SessionProvider session={null}>
        <AuthForm />
      </SessionProvider>
    );
  expect(screen.getByRole("heading", { name: /Sign In/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Sign in with Google/i })).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });
});
