// src/mobile/logistics/LogisticsApp.jsx
import { useState } from 'react';
import MobileTabs from '../MobileTabs';
import LogisticsHome    from './LogisticsHome';
import LogisticsScan    from './LogisticsScan';
import LogisticsSync    from './LogisticsSync';
import LogisticsProfile from './LogisticsProfile';

const TABS = [
  { id: 'home',    icon: '🏠', label: 'Home' },
  { id: 'scan',    icon: '📷', label: 'Scan' },
  { id: 'sync',    icon: '🔄', label: 'Sync', badge: 3 },
  { id: 'profile', icon: '👤', label: 'Profile' },
];

export default function LogisticsApp() {
  const [screen, setScreen] = useState('home');

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {screen === 'home'    && <LogisticsHome    onNavigate={setScreen} />}
        {screen === 'scan'    && <LogisticsScan />}
        {screen === 'sync'    && <LogisticsSync />}
        {screen === 'profile' && <LogisticsProfile />}
      </div>
      <MobileTabs tabs={TABS} current={screen} onChange={setScreen} />
    </div>
  );
}