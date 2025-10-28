import React, { useState } from "react";

export default function DataEntryForm({ onEntryCreated }: { onEntryCreated?: () => void }) {
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, value, date }),
    });
    const data = await res.json();
    if (data.error) setError(data.error);
    else {
      setType("");
      setValue("");
      setDate("");
      if (onEntryCreated) onEntryCreated();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4" aria-label={t('Add a New Data Entry')}>
      <h3>{t('Add a New Data Entry')}</h3>
      <input
        type="text"
        placeholder={t('Type (e.g. exercise, meal)')}
        value={type}
        onChange={e => setType(e.target.value)}
        className="input mb-2"
        required
      />
      <input
        type="text"
        placeholder={t('Value (e.g. Running, Salad)')}
        value={value}
        onChange={e => setValue(e.target.value)}
        className="input mb-2"
        required
      />
      <label htmlFor="date-input">{t('Date')}</label>
      <input
        id="date-input"
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        className="input mb-2"
        required
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button className="btn" type="submit" disabled={loading}>
        {loading ? t('Adding...') : t('Add Entry')}
      </button>
    </form>
  );
}

function t(str: string) {
  return str;
}
