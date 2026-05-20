Smart Building Dashboard

A modern and responsive Smart Building Dashboard built using React.js, Vite, and Recharts.
The application visualizes building and device health analytics through interactive charts, widgets, and monitoring components.

Live Demo

Live Project : https://smart-building-dashboard.vercel.app?utm_source=chatgpt.com

Features
Interactive dashboard UI
Device health analytics visualization
Area Charts and Bar Charts using Recharts
Responsive design
Sidebar navigation system
Loading and error handling states
Custom reusable React components
Custom useFetch hook for data fetching
Modern dark theme dashboard
Static JSON-based data simulation
Technologies Used
Frontend
React.js
Vite
JavaScript (ES6+)
JSX
CSS3
Libraries
Recharts
Lucide React
React Leaflet
Leaflet
Tools & Deployment
Git & GitHub
Vercel
Project Structure
smart-building-dashboard/
│
├── public/
│   └── data/
│       ├── overview.json
│       ├── updates.json
│       ├── assetHealth.json
│       ├── buildings.json
│       └── deviceHealth.json
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── OverviewWidget.jsx
│   │   ├── ProductUpdates.jsx
│   │   ├── AssetHealth.jsx
│   │   ├── BuildingMap.jsx
│   │   └── DeviceAnalytics.jsx
│   │
│   ├── hooks/
│   │   └── useFetch.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md

Application Workflow
React application initializes through main.jsx
App.jsx controls navigation and component rendering
Sidebar updates active state dynamically
Components fetch JSON data using the custom useFetch hook
Data is visualized using Recharts
React rerenders components whenever state changes
Key Technical Concepts
Component-Based Architecture
React Hooks (useState, useEffect)
Custom Hooks
Conditional Rendering
State Management
Asynchronous Data Fetching
Responsive Chart Visualization
Single Page Application (SPA) Architecture
Reusable UI Components
Installation & Setup
Clone Repository
git clone https://github.com/lohithkumark/smart-building-dashboard.git
Navigate Into Project
cd smart-building-dashboard
Install Dependencies
npm install
Start Development Server
npm run dev
Build for Production
npm run build
Deployment

The project is deployed using Vercel.

Deployment workflow:

GitHub Repository
        ↓
Vercel CI/CD Pipeline
        ↓
npm install
        ↓
vite build
        ↓
dist/ generation
        ↓
Production Deployment
Future Improvements
Backend Integration using Node.js & Express.js
MongoDB Database Integration
Real-Time Monitoring with Socket.io
Authentication & Authorization
Dynamic API-based data
Notification System
Advanced Analytics Dashboard
Role-Based Access Control
Author

Lohith Kumar K

GitHub: https://github.com/lohithkumark
LinkedIn: https://www.linkedin.com/in/lohithkumar12/
License

This project is developed for learning and portfolio purposes.
