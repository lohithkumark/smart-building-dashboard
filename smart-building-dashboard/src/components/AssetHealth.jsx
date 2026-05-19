import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { ChevronDown, CheckCircle2, AlertTriangle, XCircle, Zap } from "lucide-react";

function HealthBar({ healthy, warning, critical }) {
const total = healthy + warning + critical;
return (
<div style={{ display: "flex", borderRadius: 4, overflow: "hidden", height: 6, marginTop: 10 }}>
<div style={{ width: `${(healthy / total) * 100}%`, background: "#10b981" }} />
<div style={{ width: `${(warning / total) * 100}%`, background: "#f59e0b" }} />
<div style={{ width: `${(critical / total) * 100}%`, background: "#ef4444" }} />
</div>
);
}

function FloorRow({ floor }) {
const { assets, energy } = floor;
return (
<div style={{
background: "var(--surface2)", borderRadius: 8, padding: "14px 16px", marginBottom: 8
}}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
<span style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>{floor.name}</span>
<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
{[
{ icon: CheckCircle2, color: "#10b981", val: assets.healthy, label: "Healthy" },
{ icon: AlertTriangle, color: "#f59e0b", val: assets.warning, label: "Warning" },
{ icon: XCircle, color: "#ef4444", val: assets.critical, label: "Critical" },
].map(({ icon: Icon, color, val, label }) => (
<div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
<Icon size={13} color={color} />
<span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color }}>{val}</span>
<span style={{ fontSize: 11, color: "var(--muted)" }}>{label}</span>
</div>
))}
<div style={{ display: "flex", alignItems: "center", gap: 5, borderLeft: "1px solid var(--border)", paddingLeft: 12 }}>
<Zap size={12} color="#facc15" />
<span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#facc15" }}>
{energy.consumption} {energy.unit}
</span>
</div>
</div>
</div>
<HealthBar {...assets} />
</div>
);
}

function BuildingAccordion({ building }) {
const [open, setOpen] = useState(false);
const totalAssets = building.floors.reduce((acc, f) => ({
healthy: acc.healthy + f.assets.healthy,
warning: acc.warning + f.assets.warning,
critical: acc.critical + f.assets.critical,
}), { healthy: 0, warning: 0, critical: 0 });

return (
<div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, marginBottom: 16, overflow: "hidden" }}>
<button onClick={() => setOpen(o => !o)} style={{
width: "100%", background: "none", border: "none", padding: "18px 20px",
display: "flex", justifyContent: "space-between", alignItems: "center",
cursor: "pointer", color: "var(--text)"
}}>
<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
<span style={{ fontWeight: 600, fontSize: 15 }}>{building.building}</span>
<span style={{ fontSize: 11, color: "var(--muted)" }}>{building.floors.length} floors</span>
</div>
<div style={{ display: "flex", alignItems: "center", gap: 16 }}>
<div style={{ display: "flex", gap: 12 }}>
<span style={{ fontSize: 12, color: "#10b981" }}>✔ {totalAssets.healthy}</span>
<span style={{ fontSize: 12, color: "#f59e0b" }}>⚠ {totalAssets.warning}</span>
<span style={{ fontSize: 12, color: "#ef4444" }}>✖ {totalAssets.critical}</span>
</div>
<ChevronDown size={16} color="var(--muted)" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
</div>
</button>
<HealthBar {...totalAssets} />
{open && (
<div style={{ padding: "12px 16px 16px" }}>
{building.floors.map(f => <FloorRow key={f.name} floor={f} />)}
</div>
)}
</div>
);
}

export default function AssetHealth() {
const { data, loading, error } = useFetch("/data/assetHealth.json");

return (
<div>
<div style={{ marginBottom: 28 }}>
<h1 style={{ fontFamily: "var(--font-mono)", fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Asset Health Summary</h1>
<p style={{ fontSize: 12, color: "var(--muted)", letterSpacing: 1 }}>Building · Floor · Asset Status</p>
</div>

{loading && Array(2).fill(0).map((_, i) => (
<div key={i} className="skeleton" style={{ height: 64, borderRadius: 12, marginBottom: 16 }} />
))}
{error && <div className="error-state"><XCircle size={28} /><div>{error}</div></div>}
{!loading && !error && data && data.map(b => <BuildingAccordion key={b.building} building={b} />)}
</div>
);
}

