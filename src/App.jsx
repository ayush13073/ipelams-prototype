// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import GoaPortal from './pages/GoaPortal';
import StationPortal from './pages/StationPortal';
import MobilePreview from './pages/MobilePreview';

// Goa sub-pages
import CommandCenter        from './pages/goa/CommandCenter';
import CargoManagement      from './pages/goa/CargoManagement';
import InventoryManagement  from './pages/goa/InventoryManagement';
import PredictiveAnalytics  from './pages/goa/PredictiveAnalytics';
import SystemHealth         from './pages/goa/SystemHealth';

// Station sub-pages
import StationDashboard     from './pages/station/StationDashboard';
import StationInventory     from './pages/station/StationInventory';
import StationCargo         from './pages/station/StationCargo';
import StationWaste         from './pages/station/StationWaste';
import StationPersonnel     from './pages/station/StationPersonnel';
import StationEmergency     from './pages/station/StationEmergency';
import StationSync          from './pages/station/StationSync';
import StationMedical       from './pages/station/StationMedical';   // 👈 NEW

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/mobile" element={<MobilePreview />} />

      {/* Goa Portal */}
      <Route path="/goa" element={<GoaPortal />}>
        <Route index element={<CommandCenter />} />
        <Route path="cargo"      element={<CargoManagement />} />
        <Route path="inventory"  element={<InventoryManagement />} />
        <Route path="predictive" element={<PredictiveAnalytics />} />
        <Route path="system"     element={<SystemHealth />} />
      </Route>

      {/* Station Portal */}
      <Route path="/station" element={<StationPortal />}>
        <Route index element={<StationDashboard />} />
        <Route path="inventory" element={<StationInventory />} />
        <Route path="cargo"     element={<StationCargo />} />
        <Route path="waste"     element={<StationWaste />} />
        <Route path="personnel" element={<StationPersonnel />} />
        <Route path="emergency" element={<StationEmergency />} />
        <Route path="sync"      element={<StationSync />} />
        <Route path="medical"   element={<StationMedical />} />   {/* 👈 NEW */}
      </Route>
    </Routes>
  );
}