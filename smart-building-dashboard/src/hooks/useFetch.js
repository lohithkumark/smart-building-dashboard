import { useState, useEffect } from "react";

export function useFetch(url, simulateError = false) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);

    const timer = setTimeout(async () => {
      if (simulateError) {
        setError("Failed to load data. Please try again.");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 1200 + Math.random() * 600); // 1.2–1.8s simulated latency


return () => clearTimeout(timer);
  }, [url, simulateError]);

  return { data, loading, error };
}