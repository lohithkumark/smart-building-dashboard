import { Building2, RefreshCw, Activity, Map, BarChart3, Cpu } from "lucide-react";

const ICONS = {
  overview: Building2,
  updates: RefreshCw,
  assets: Activity,
  map: Map,
  analytics: BarChart3,
};

export default function Sidebar({ nav, active, onNav }) {
  return (
    <aside style={{
      width: 220, background: "var(--surface)", borderRight: "1px solid var(--border)",
      display: "flex", flexDirection: "column", padding: "24px 0", flexShrink: 0
    }}>
      {/* Logo */}

      <div style={{ padding: "0 20px 28px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, var(--accent), var(--accent2))",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <Cpu size={16} color="#fff" />
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", letterSpacing: 2 }}>SMART</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)", lineHeight: 1 }}>BUILDING OS</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: "16px 12px", flex: 1 }}>
        {nav.map(item => {
          const Icon = ICONS[item.id] || Activity;
          const isActive = active === item.id;
          return (
            <button key={item.id} onClick={() => onNav(item.id)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 8, border: "none",
                background: isActive ? "rgba(0,212,170,0.1)" : "transparent",
                color: isActive ? "var(--accent)" : "var(--muted)",
                cursor: "pointer", fontFamily: "var(--font-body)", fontSize: 13,
                fontWeight: isActive ? 600 : 400, transition: "all 0.15s",
                marginBottom: 2, textAlign: "left",
                borderLeft: isActive ? "2px solid var(--accent)" : "2px solid transparent"
              }}
            >
              <Icon size={15} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border)" }}>
        <div style={{ fontSize: 11, color: "var(--muted)", fontFamily: "var(--font-mono)" }}>v3.4.0 — LIVE</div>
      </div>
    </aside>
  );
}