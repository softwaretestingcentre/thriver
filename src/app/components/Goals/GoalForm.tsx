import React, { useState } from "react";

export default function GoalForm({ onGoalCreated }: { onGoalCreated?: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    const data = await res.json();
    if (data.error) setError(data.error);
    else {
      setTitle("");
      setDescription("");
      if (onGoalCreated) onGoalCreated();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h3>Add a New Goal</h3>
      <input
        type="text"
        placeholder="Goal Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="input mb-2"
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="input mb-2"
        required
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button className="btn" type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Goal"}
      </button>
    </form>
  );
}
