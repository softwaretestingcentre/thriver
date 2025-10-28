import React, { useEffect, useState } from "react";

export default function DataEntryList() {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/data")
      .then(res => res.json())
      .then(data => {
        if (data.error) setError(data.error);
        else setEntries(data.dataEntries);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load data entries");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading data entries...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2>Your Data Entries</h2>
      <ul>
        {entries.length ? (
          entries.map(entry => (
            <li key={entry.id}>{entry.type}: {entry.value} ({entry.date})</li>
          ))
        ) : (
          <li>No data entries yet.</li>
        )}
      </ul>
    </div>
  );
}
