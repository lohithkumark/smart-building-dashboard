import { useState } from "react";
import Sidebar from "./components/Sidebar";
import OverviewWidget from "./components/OverviewWidget";
import ProductUpdates from "./components/ProductUpdates";
import AssetHealth from "./components/AssetHealth";
import BuildingMap from "./components/BuildingMap";
import DeviceAnalytics from "./components/DeviceAnalytics";
import "./index.css";

const NAV = [
  { id: "overview", label: "Overview" },
  { id: "updates", label: "Product Updates" },
  { id: "assets", label: "Asset Health" },
  { id: "map", label: "Building Map" },
  { id: "analytics", label: "Device Analytics" },
];

export default function App() {
  const [active, setActive] = useState("overview");

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar nav={NAV} active={active} onNav={setActive} />
      <main style={{
        flex: 1, overflowY: "auto", padding: "32px",
        background: "var(--bg)"
      }}>
        {active === "overview"   && <OverviewWidget />}
        {active === "updates"    && <ProductUpdates />}
        {active === "assets"     && <AssetHealth />}
        {active === "map"        && <BuildingMap />}
        {active === "analytics"  && <DeviceAnalytics />}
      </main>
    </div>
  );
}