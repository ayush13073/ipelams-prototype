// src/mobile/MobileApp.jsx
import LogisticsApp from './logistics/LogisticsApp';
import StationApp   from './station/StationApp';
import MedicalApp   from './medical/MedicalApp';

export default function MobileApp({ role }) {
  if (role === 'station' || role === 'station-staff') return <StationApp />;
  if (role === 'medical') return <MedicalApp />;
  return <LogisticsApp />;
}