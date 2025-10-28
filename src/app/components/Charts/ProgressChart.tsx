import React, { useEffect, useState } from "react";
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ProgressChart() {
  const [chartData, setChartData] = useState<any>({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/charts")
      .then(res => res.json())
      .then(data => {
        if (data.error) setError(data.error);
        else {
          setChartData({
            labels: Object.keys(data.chartData),
            datasets: [
              {
                label: "Entries",
                data: Object.values(data.chartData),
                backgroundColor: "#60a5fa",
              },
            ],
          });
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load chart data");
        setLoading(false);
      });
  }, []);

  if (loading) return <div role="status">{t('Loading chart...')}</div>;
  if (error) return <div className="text-red-500" role="alert">{error}</div>;

  return (
    <div>
      <h2>{t('Progress Chart')}</h2>
      <Bar data={chartData} />
    </div>
  );
}

function t(str: string) {
  return str;
}
}
