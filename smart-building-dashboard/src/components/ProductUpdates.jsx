import { useFetch } from "../hooks/useFetch";
import { Tag, Calendar, CheckCircle2, AlertCircle } from "lucide-react";

function SkeletonItem() {
return (
<div style={{ display: "flex", gap: 16, padding: "20px 0", borderBottom: "1px solid var(--border)" }}>
<div className="skeleton" style={{ width: 10, height: 10, borderRadius: "50%", marginTop: 4, flexShrink: 0 }} />
<div style={{ flex: 1 }}>
<div className="skeleton" style={{ width: "70%", height: 14, marginBottom: 10 }} />
<div className="skeleton" style={{ width: "40%", height: 11 }} />
</div>
</div>
);
}

export default function ProductUpdates() {
const { data, loading, error } = useFetch("/data/updates.json");

return (
<div>
<div style={{ marginBottom: 28 }}>
<h1 style={{ fontFamily: "var(--font-mono)", fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Product Updates</h1>
<p style={{ fontSize: 12, color: "var(--muted)", letterSpacing: 1 }}>Release Notes · Changelog</p>
</div>

<div style={{
background: "var(--surface)", border: "1px solid var(--border)",
borderRadius: 12, padding: "8px 28px", maxWidth: 640
}}>
{loading && Array(4).fill(0).map((_, i) => <SkeletonItem key={i} />)}

{error && (
<div className="error-state">
<AlertCircle size={28} />
<div style={{ fontWeight: 600 }}>Could not load updates</div>
<div style={{ fontSize: 12 }}>{error}</div>
</div>
)}

{!loading && !error && data && (
<>
{/* Version badge */}
<div style={{
display: "inline-flex", alignItems: "center", gap: 6,
background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.25)",
borderRadius: 20, padding: "4px 12px", margin: "20px 0 4px",
fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)"
}}>
<Tag size={10} /> v{data[0].version}
</div>
<div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 20 }}>
<Calendar size={11} style={{ marginRight: 4, verticalAlign: "middle" }} />
{new Date(data[0].releaseDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
</div>

{/* Timeline */}
<div style={{ position: "relative", paddingLeft: 20 }}>
<div style={{
position: "absolute", left: 4, top: 0, bottom: 0,
width: 1, background: "var(--border)"
}} />
{data.map((item, i) => (
<div key={item.id} style={{
position: "relative", paddingBottom: i < data.length - 1 ? 28 : 20,
animation: `fadeIn 0.3s ease ${i * 0.1}s both`
}}>
<div style={{
position: "absolute", left: -20, top: 2,
width: 10, height: 10, borderRadius: "50%",
background: "var(--accent)", border: "2px solid var(--bg)",
boxShadow: "0 0 0 3px rgba(0,212,170,0.2)"
}} />
<div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
<CheckCircle2 size={14} color="var(--accent)" style={{ marginTop: 1, flexShrink: 0 }} />
<span style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.5 }}>{item.title}</span>
</div>
</div>
))}
</div>
</>
)}
</div>

<style>{`@keyframes fadeIn { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }`}</style>
</div>
);
}

