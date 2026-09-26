// src/mobile/station/StationApp.jsx
import { useState } from 'react';
import MobileTabs from '../MobileTabs';
import StationHome    from './StationHome';
import StationScan    from './StationScan';
import StationPeople  from './StationPeople';
import StationSync    from './StationSync';
import StationProfile from './StationProfile';

const TABS = [
  { id: 'home',    icon: '🏠', label: 'Home' },
  { id: 'scan',    icon: '📷', label: 'Scan' },
  { id: 'people',  icon: '👥', label: 'People' },
  { id: 'sync',    icon: '🔄', label: 'Sync', badge: 5 },
  { id: 'profile', icon: '👤', label: 'Profile' },
];

export default function StationApp() {
  const [screen, setScreen] = useState('home');

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {screen === 'home'    && <StationHome onNavigate={setScreen} />}
        {screen === 'scan'    && <StationScan />}
        {screen === 'people'  && <StationPeople />}
        {screen === 'sync'    && <StationSync />}
        {screen === 'profile' && <StationProfile />}
      </div>
      <MobileTabs tabs={TABS} current={screen} onChange={setScreen} />
    </div>
  );
}