'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LifestyleEntryForm() {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('sleep');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      category: formData.get('category'),
      value: Number(formData.get('value')),
      unit: formData.get('unit'),
      notes: formData.get('notes'),
    };

    try {
      const response = await fetch('/api/lifestyle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        e.currentTarget.reset();
        router.refresh();
      }
    } catch (error) {
      console.error('Error creating lifestyle entry:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUnitPlaceholder = () => {
    switch (category) {
      case 'sleep': return 'hours';
      case 'water': return 'liters';
      case 'mood': return '1-10';
      case 'stress': return '1-10';
      case 'weight': return 'kg';
      default: return '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Log Lifestyle</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            name="category"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="sleep">Sleep</option>
            <option value="water">Water Intake</option>
            <option value="mood">Mood</option>
            <option value="stress">Stress Level</option>
            <option value="weight">Weight</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Value *
          </label>
          <input
            type="number"
            name="value"
            step="0.1"
            required
            placeholder={getUnitPlaceholder()}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Unit
          </label>
          <input
            type="text"
            name="unit"
            defaultValue={getUnitPlaceholder()}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            name="notes"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Log Entry'}
        </button>
      </form>
    </div>
  );
}
