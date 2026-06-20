import { useState, useEffect } from 'react';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Calendar, RefreshCw, Trash2, Cpu } from 'lucide-react';
import './App.css';

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  // 1. Fetch History (Auto-load prediction logic removed)
  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/bitcoin/history');
      if (res.data && res.data.success && Array.isArray(res.data.data)) {
        setCryptoData(res.data.data);
        // Database mein bhale hi prediction save ho, yahan refresh par hum usey state mein load nahi kar rahe
      }
    } catch (err) {
      console.error("Data load karne mein masla aaya:", err);
    }
    setLoading(false);
  };

  const syncLiveData = async () => {
    setLoading(true);
    try {
      await axios.get('http://localhost:5000/api/bitcoin/fetch-live');
      await fetchHistory();
    } catch (err) {
      console.error("Live sync mein masla aaya:", err);
    }
    setLoading(false);
  };

  // 2. Run Prediction (Value ab sirf isi click event par state mein set hogi)
  const runPrediction = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/bitcoin/predict');
      if (res.data && res.data.success && res.data.predictedPrice) {
        const price = Number(res.data.predictedPrice);
        if (!isNaN(price)) {
          setPrediction(price); // Click karne par live price screen par set ho gayi
        }
        await fetchHistory(); // Table aur backend refresh karne ke liye
      } else {
        alert("Prediction data sahi format mein nahi mila.");
      }
    } catch (err) {
      console.error("Prediction API integration error:", err);
      alert("Backend connected nahi hai ya database khali hai. Pehle 'Sync Historical Data' karein.");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/bitcoin/delete/${id}`);
      if (res.data && res.data.success) {
        setCryptoData(cryptoData.filter(item => item._id !== id));
      }
    } catch (err) {
      console.error("Delete karne mein error:", err);
    }
  };

  // 3. Initial Mount Hook (Auto-load prediction disabled on page startup)
  useEffect(() => {
    let isMounted = true;
    const loadInitialData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/bitcoin/history');
        if (res.data && res.data.success && Array.isArray(res.data.data) && isMounted) {
          setCryptoData(res.data.data);
          // Reload ya restart par state ko null hi rakha hai taake default text show ho
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadInitialData();
    return () => { isMounted = false; };
  }, []);

  const formatChartDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const latestPrice = cryptoData.length > 0 && cryptoData[cryptoData.length - 1]?.close 
    ? cryptoData[cryptoData.length - 1].close 
    : 0;

  return (
    <div className="app-container">
      <header className="app-header">
        <div>
          <h1 className="main-title">🪙 Bitcoin MERN Analytics</h1>
          <p className="sub-title">Advanced Full-Stack Financial Operations & Prediction Panel</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={syncLiveData} disabled={loading} className="sync-btn" style={{ backgroundColor: '#64748b', color: '#fff' }}>
            <RefreshCw size={18} className={loading ? 'spin-animation' : ''} />
            Sync Historical Data
          </button>
          <button onClick={runPrediction} disabled={loading} className="sync-btn">
            <Cpu size={18} />
            {loading ? 'Computing...' : 'Run Next-Day Prediction'}
          </button>
        </div>
      </header>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="card-header-flex">
            <span>Current Closing Price (USD)</span>
            <DollarSign color="#38bdf8" size={20} />
          </div>
          <h2 className="card-value">
            {latestPrice > 0 ? `$${latestPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '$0.00'}
          </h2>
        </div>

        <div className="metric-card" style={{ border: '1px solid rgba(245, 158, 11, 0.3)', background: 'rgba(245, 158, 11, 0.05)' }}>
          <div className="card-header-flex">
            <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>🔮 Predicted Next-Day Close</span>
            <Cpu color="#f59e0b" size={20} />
          </div>
          <h2 className="card-value" style={{ color: '#f59e0b' }}>
            {prediction && !isNaN(prediction) ? `$${prediction.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : 'Click Run Prediction'}
          </h2>
        </div>

        <div className="metric-card">
          <div className="card-header-flex">
            <span>Database Status</span>
            <Calendar color="#38bdf8" size={20} />
          </div>
          <h2 className="card-value">{cryptoData.length} Days Seeded</h2>
        </div>
      </div>

      <div className="dashboard-section">
        <h3 className="section-heading"><TrendingUp size={18} style={{ marginRight: 8 }} /> Valuation Spectrum Horizon</h3>
        <div style={{ width: '100%', height: 350 }}>
          <ResponsiveContainer>
            <AreaChart data={cryptoData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tickFormatter={formatChartDate} stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <YAxis domain={['auto', 'auto']} stroke="#94a3b8" tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v}`} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }} />
              <Area type="monotone" dataKey="close" name="Closing Price" stroke="#38bdf8" strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="dashboard-section">
        <h3 className="section-heading">📁 Database Management Engine (CRUD Terminal)</h3>
        <div className="table-responsive">
          <table className="crud-table">
            <thead>
              <tr className="th-row">
                <th className="th-cell">System ID</th>
                <th className="th-cell">Timeline Matrix</th>
                <th className="th-cell">Closing Price (USD)</th>
                <th className="th-cell">Model Forecasted State</th>
                <th className="th-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cryptoData.map((item) => (
                <tr key={item._id} className="tr-row">
                  <td className="td-cell-id">{item._id}</td>
                  <td className="td-cell">{item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}</td>
                  <td className="td-cell-close">${item.close ? item.close.toFixed(2) : '0.00'}</td>
                  <td className="td-cell" style={{ color: '#f59e0b' }}>
                    {item.predictedClose ? `$${Number(item.predictedClose).toFixed(2)}` : 'No Prediction Generated'}
                  </td>
                  <td className="td-cell">
                    <button onClick={() => handleDelete(item._id)} className="delete-action-btn">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;