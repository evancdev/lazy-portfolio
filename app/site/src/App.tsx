import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const API_URL = 'http://localhost:3000';
    fetch(`${API_URL}/api/portfolio`)
      .then((res) => res.json())
      .then((data) => {
        console.log('API Response:', data);
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('API Error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Portfolio Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default App;
