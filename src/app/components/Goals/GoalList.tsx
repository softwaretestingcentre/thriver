import React, { useEffect, useState } from "react";

export default function GoalList() {
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/goals")
      .then(res => res.json())
      .then(data => {
        if (data.error) setError(data.error);
        else setGoals(data.goals);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load goals");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading goals...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2>Your Goals</h2>
      <ul>
        {goals.length ? (
          goals.map(goal => (
            <li key={goal.id}>{goal.title} - {goal.description}</li>
          ))
        ) : (
          <li>No goals yet.</li>
        )}
      </ul>
    </div>
  );
}
