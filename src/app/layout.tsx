import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thriver - Wellness Tracking",
  description: "Multi-user lifestyle, diet, and exercise tracking application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.4.17/dist/tailwind.min.css" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
