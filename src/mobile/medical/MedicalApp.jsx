// src/mobile/medical/MedicalApp.jsx
import { useState } from 'react';
import MobileTabs from '../MobileTabs';
import MedicalHome      from './MedicalHome';
import MedicalScan      from './MedicalScan';
import MedicalMeds      from './MedicalMeds';
import MedicalEquipment from './MedicalEquipment';
import MedicalSync      from './MedicalSync';
import MedicalProfile   from './MedicalProfile';

const TABS = [
  { id: 'home',      icon: '🏠', label: 'Home' },
  { id: 'scan',      icon: '📷', label: 'Scan' },
  { id: 'meds',      icon: '💊', label: 'Meds' },
  { id: 'equipment', icon: '🧰', label: 'Equip' },
  { id: 'sync',      icon: '🔄', label: 'Sync' },
];

export default function MedicalApp() {
  const [screen, setScreen] = useState('home');

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {screen === 'home'      && <MedicalHome onNavigate={setScreen} />}
        {screen === 'scan'      && <MedicalScan />}
        {screen === 'meds'      && <MedicalMeds />}
        {screen === 'equipment' && <MedicalEquipment />}
        {screen === 'sync'      && <MedicalSync />}
      </div>
      <MobileTabs tabs={TABS} current={screen} onChange={setScreen} />
    </div>
  );
}