import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function App() {
  const [data, setData] = useState([]);
  const [sector, setSector] = useState('All');
  const [insight, setInsight] = useState('');
  const [loading, setLoading] = useState(false);

  // 1. Fetch ESG data from your Python FastAPI backend
  useEffect(() => {
    fetch(`http://localhost:8000/api/data?sector=${sector}`)
      .then(res => res.json())
      .then(data => setData(data));
  }, [sector]);

  // 2. Request the Llama 3 insight from the backend
  const handleGenerateInsight = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sector })
      });
      const result = await response.json();
      setInsight(result.insight);
    } catch (error) {
      setInsight("Error connecting to backend API.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ borderBottom: '2px solid #eee', paddingBottom: '1rem', marginBottom: '2rem' }}>
        <h1 style={{ color: '#2c3e50', margin: 0 }}>🌍 AI-Enhanced ESG Intelligence</h1>
        <p style={{ color: '#7f8c8d', margin: '5px 0 0 0' }}>Real-time sustainability metrics & local AI insights</p>
      </header>
      
      <div style={{ display: 'flex', gap: '2rem' }}>
        {/* SIDEBAR */}
        <div style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px' }}>
            <h3 style={{ marginTop: 0, fontSize: '1rem' }}>Data Filters</h3>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>
              Industry Sector
            </label>
            <select 
              value={sector} 
              onChange={(e) => { setSector(e.target.value); setInsight(''); }}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="All">All Sectors</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Retail">Retail</option>
              <option value="Transportation">Transportation</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Energy">Energy</option>
            </select>
          </div>

          {/* AI INSIGHT PANEL */}
          <div style={{ background: '#ebf5fb', padding: '1.5rem', borderRadius: '8px', border: '1px solid #d6eaf8' }}>
            <h3 style={{ marginTop: 0, fontSize: '1rem', color: '#2874a6' }}>🧠 Llama 3 Analysis</h3>
            <button 
              onClick={handleGenerateInsight} 
              disabled={loading}
              style={{ 
                width: '100%', padding: '0.75rem', background: '#2980b9', 
                color: 'white', border: 'none', borderRadius: '4px', 
                cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold' 
              }}
            >
              {loading ? 'Analyzing locally...' : 'Generate Insight'}
            </button>
            {insight && (
              <div style={{ marginTop: '1rem', fontSize: '0.9rem', lineHeight: '1.5', color: '#1a5276', fontStyle: 'italic' }}>
                "{insight}"
              </div>
            )}
          </div>
        </div>

        {/* MAIN CHART AREA */}
        <div style={{ flex: 1, background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ marginTop: 0, fontSize: '1.25rem', color: '#34495e' }}>Scope 1 Emissions vs. ESG Score</h2>
          <div style={{ height: '400px', width: '100%', marginTop: '2rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="id" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                <Tooltip cursor={{fill: '#f5f5f5'}} />
                <Bar yAxisId="left" dataKey="Emissions" fill="#8884d8" name="Emissions (MtCO2e)" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="ESG_Score" fill="#82ca9d" name="ESG Score" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;