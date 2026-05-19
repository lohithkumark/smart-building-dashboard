import { useFetch } from "../hooks/useFetch";
import {
Building2, Layers, DoorOpen, Users, Package,
ClipboardList, Bell, Wifi, Zap, Radio, HeartPulse, Ruler
} from "lucide-react";

const CARDS = [
{ key: "buildings", label: "Buildings", icon: Building2, color: "#3b82f6" },
{ key: "floors", label: "Floors", icon: Layers, color: "#8b5cf6" },
{ key: "rooms", label: "Rooms", icon: DoorOpen, color: "#06b6d4" },
{ key: "users", label: "Users", icon: Users, color: "#10b981" },
{ key: "assets", label: "Assets", icon: Package, color: "#f59e0b" },
{ key: "workOrders", label: "Work Orders", icon: ClipboardList,color: "#6366f1" },
{ key: "alarms", label: "Alarms", icon: Bell, color: "#ef4444" },
{ key: "gateways", label: "Gateways", icon: Wifi, color: "#14b8a6" },
{ key: "wiredDevices", label: "Wired Devices", icon: Zap, color: "#f97316" },
{ key: "wirelessDevices",label: "Wireless Devices", icon: Radio, color: "#a855f7" },
{ key: "areaSqFt", label: "Area (sq ft)", icon: Ruler, color: "#0ea5e9" },
];

function SkeletonCard() {
return (
<div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 20 }}>
<div className="skeleton" style={{ width: 32, height: 32, borderRadius: 8, marginBottom: 14 }} />
<div className="skeleton" style={{ width: "60%", height: 12, marginBottom: 8 }} />
<div className="skeleton" style={{ width: "40%", height: 24 }} />
</div>
);
}

export default function OverviewWidget() {
const { data, loading, error } = useFetch("/data/overview.json");

return (
<div>
<PageHeader title="Organization Overview" subtitle="Campus · Buildings · Devices · Health" />

{/* Health Score Banner */}
{!loading && !error && data && (
<div style={{
background: "linear-gradient(135deg, rgba(0,212,170,0.1), rgba(59,130,246,0.1))",
border: "1px solid rgba(0,212,170,0.2)", borderRadius: 12,
padding: "20px 28px", marginBottom: 24,
display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16
}}>
<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
<HeartPulse size={24} color="var(--accent)" />
<div>
<div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 2 }}>OVERALL HEALTH SCORE</div>
<div style={{ fontFamily: "var(--font-mono)", fontSize: 28, color: "var(--accent)", fontWeight: 700 }}>
{data.healthScore}<span style={{ fontSize: 14, opacity: 0.6 }}>%</span>
</div>
</div>
</div>
<div style={{ display: "flex", gap: 24 }}>
{[
{ label: "Campus", value: data.campuses },
{ label: "Work Requests", value: data.workRequests },
].map(({ label, value }) => (
<div key={label} style={{ textAlign: "center" }}>
<div style={{ fontFamily: "var(--font-mono)", fontSize: 20, fontWeight: 700, color: "var(--text)" }}>{value}</div>
<div style={{ fontSize: 11, color: "var(--muted)" }}>{label}</div>
</div>
))}
</div>
</div>
)}

<div style={{
display: "grid",
gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
gap: 16
}}>
{loading
? Array(11).fill(0).map((_, i) => <SkeletonCard key={i} />)
: error
? <ErrorState message={error} />
: CARDS.map(({ key, label, icon: Icon, color }) => (
<div key={key} style={{
background: "var(--surface)", border: "1px solid var(--border)",
borderRadius: 12, padding: 20,
transition: "border-color 0.2s, transform 0.2s",
cursor: "default",
}}
onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = "translateY(-2px)"; }}
onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
>
<div style={{
width: 36, height: 36, borderRadius: 8, marginBottom: 14,
background: `${color}22`, display: "flex", alignItems: "center", justifyContent: "center"
}}>
<Icon size={17} color={color} />
</div>
<div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
<div style={{ fontFamily: "var(--font-mono)", fontSize: 22, fontWeight: 700, color: "var(--text)" }}>
{typeof data[key] === "number" && data[key] > 999
? data[key].toLocaleString()
: data[key]}
</div>
</div>
))
}
</div>
</div>
);
}

function PageHeader({ title, subtitle }) {
return (
<div style={{ marginBottom: 28 }}>
<h1 style={{ fontFamily: "var(--font-mono)", fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{title}</h1>
<p style={{ fontSize: 12, color: "var(--muted)", letterSpacing: 1 }}>{subtitle}</p>
</div>
);
}

function ErrorState({ message }) {
return (
<div className="error-state" style={{ gridColumn: "1/-1" }}>
<Bell size={32} />
<div style={{ fontWeight: 600 }}>Failed to load data</div>
<div style={{ fontSize: 12, opacity: 0.7 }}>{message}</div>
</div>
);
}
