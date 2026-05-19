# 🏢 Smart Building Admin Dashboard

A responsive admin dashboard for smart building management.

## Tech Stack
- React 18 + Vite
- Recharts (data viz)
- Leaflet + react-leaflet (map)
- Lucide React (icons)

## Setup

```bash
npm install
npm run dev


Open http://localhost:5173
Features
 ∙ Widget 1 — Organization Overview (stat cards, skeleton loader)
 ∙ Widget 2 — Product Updates (timeline feed)
 ∙ Widget 3 — Asset Health (expandable accordions)
 ∙ Widget 4 — Interactive Building Map (Leaflet, health markers)
 ∙ Widget 5 — Device Analytics (Area + Bar charts)
Architecture
 ∙ Mock API via /public/data/*.json fetched with native fetch()
 ∙ Simulated latency (1.2–1.8s) via setTimeout
 ∙ useFetch custom hook with loading/error states
 ∙ simulateError flag for testing error UI

