import { useFetch } from "../hooks/useFetch";
import { AlertCircle } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "var(--surface2)", border: "1px solid var(--border)",
      borderRadius: 8, padding: "10px 14px", fontSize: 12
    }}>
      <div style={{ fontFamily: "var(--font-mono)", marginBottom: 6, color: "var(--muted)" }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: <strong>{p.value}</strong>
        </div>
      ))}
    </div>
  );
};

export default function DeviceAnalytics() {
  // Simulate error for bonus error state demo
  const { data, loading, error } = useFetch("/data/deviceHealth.json", false);

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "var(--font-mono)", fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Device Health Analytics</h1>
        <p style={{ fontSize: 12, color: "var(--muted)", letterSpacing: 1 }}>Monthly Trends · Healthy · Warning · Critical</p>
      </div>

      {loading && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {[1, 2].map(i => <div key={i} className="skeleton" style={{ height: 300, borderRadius: 12 }} />)}
        </div>
      )}

      {error && (
        <div className="error-state">
          <AlertCircle size={32} />
          <div style={{ fontWeight: 600 }}>Chart data unavailable</div>
          <div style={{ fontSize: 12 }}>{error}</div>
          <button className="retry-btn" onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}

      {!loading && !error && data && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 20 }}>
          {/* Area Chart */}
          <ChartCard title="Trend Over Time (Area)">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={data}>
                <defs>
                  {[["healthy","#10b981"],["warning","#f59e0b"],["critical","#ef4444"]].map(([key, color]) => (
                    <linearGradient key={key} id={`grad_${key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted)" fontSize={12} />


<YAxis stroke="var(--muted)" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="healthy" stroke="#10b981" fill="url(#grad_healthy)" name="Healthy" />
                <Area type="monotone" dataKey="warning" stroke="#f59e0b" fill="url(#grad_warning)" name="Warning" />
                <Area type="monotone" dataKey="critical" stroke="#ef4444" fill="url(#grad_critical)" name="Critical" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Grouped Bar Chart */}
          <ChartCard title="Monthly Comparison (Bar)">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={data} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted)" fontSize={12} />
                <YAxis stroke="var(--muted)" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="healthy" fill="#10b981" name="Healthy" radius={[3,3,0,0]} />
                <Bar dataKey="warning" fill="#f59e0b" name="Warning" radius={[3,3,0,0]} />
                <Bar dataKey="critical" fill="#ef4444" name="Critical" radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 20 }}>
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 20, color: "var(--text)" }}>{title}</div>
      {children}
    </div>
  );
}

