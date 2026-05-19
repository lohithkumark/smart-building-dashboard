import { useEffect, useRef } from "react";
import { useFetch } from "../hooks/useFetch";
import { MapPin } from "lucide-react";

export default function BuildingMap() {
  const { data, loading, error } = useFetch("/data/buildings.json");
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!data || mapInstanceRef.current) return;

    const L = window.L;
    if (!L) return;

    const map = L.map(mapRef.current, { zoomControl: true, scrollWheelZoom: true });
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors"
    }).addTo(map);

    const bounds = [];

    data.forEach(b => {
      const [lat, lng] = b.geoLocation;
      bounds.push([lat, lng]);

      const healthColor = b.healthScore >= 75 ? "#10b981" : b.healthScore >= 50 ? "#f59e0b" : "#ef4444";

      const icon = L.divIcon({
        className: "",
        html: `<div style="
          background:${healthColor};width:14px;height:14px;
          border-radius:50%;border:3px solid white;
          box-shadow:0 0 0 3px ${healthColor}44,0 2px 8px rgba(0,0,0,0.4)">
        </div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      const marker = L.marker([lat, lng], { icon }).addTo(map);
      marker.bindPopup(`
        <div style="font-family:system-ui;min-width:160px">
          <div style="font-weight:700;font-size:14px;margin-bottom:6px">${b.name}</div>
          <div style="font-size:12px;color:#64748b;margin-bottom:4px">📍 ${b.city}</div>
          <div style="font-size:12px;margin-bottom:2px">🏢 ${b.totalFloors} floor(s) · ${b.area.toLocaleString()} sq ft</div>
          <div style="font-size:12px">
            <span style="color:${healthColor};font-weight:600">● ${b.healthScore}%</span> Health Score
          </div>
        </div>
      `, { maxWidth: 220 });
    });

    if (bounds.length > 1) {
      map.fitBounds(bounds, { padding: [60, 60] });
    } else if (bounds.length === 1) {
      map.setView(bounds[0], 14);
    }

    return () => { map.remove(); mapInstanceRef.current = null; };
  }, [data]);

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "var(--font-mono)", fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Building Map</h1>
        <p style={{ fontSize: 12, color: "var(--muted)", letterSpacing: 1 }}>Interactive · Locations · Health</p>
      </div>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
        {loading && (
          <div style={{ height: 460, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, color: "var(--muted)" }}>
            <MapPin size={20} style={{ animation: "pulse 1s infinite" }} /> Loading map data…
          </div>
        )}


{error && <div className="error-state" style={{ height: 460 }}><MapPin size={28} /><div>{error}</div></div>}
        {!loading && !error && (
          <div ref={mapRef} style={{ height: 460, width: "100%" }} />
        )}
      </div>

      {/* Legend */}
      {!loading && !error && (
        <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
          {[["#10b981", "≥75% Healthy"], ["#f59e0b", "50-74% Warning"], ["#ef4444", "<50% Critical"]].map(([color, label]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--muted)" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: color }} />
              {label}
            </div>
          ))}
        </div>
      )}

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}