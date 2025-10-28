"use client";
import { useSession } from "next-auth/react";
import AuthForm from "../components/Auth/AuthForm";
import React, { useEffect, useState } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (session) {
      fetch("/api/dashboard")
        .then(res => res.json())
        .then(data => {
          if (data.error) setError(data.error);
          else setDashboard(data.user);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load dashboard data");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [session]);

  if (status === "loading" || loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div>
        <h2>Sign in to access your dashboard</h2>
        <AuthForm />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1>Welcome, {dashboard?.email}</h1>
      <p>This is your personal dashboard.</p>
      <h2>Your Goals</h2>
      <ul>
        {dashboard?.goals?.length ? (
          dashboard.goals.map((goal: any) => (
            <li key={goal.id}>{goal.title}</li>
          ))
        ) : (
          <li>No goals yet.</li>
        )}
      </ul>
      <h2>Your Data Entries</h2>
      <ul>
        {dashboard?.dataEntries?.length ? (
          dashboard.dataEntries.map((entry: any) => (
            <li key={entry.id}>{entry.type}: {entry.value} ({entry.date})</li>
          ))
        ) : (
          <li>No data entries yet.</li>
        )}
      </ul>
    </div>
  );
}
