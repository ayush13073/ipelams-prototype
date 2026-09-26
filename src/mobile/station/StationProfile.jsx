// src/mobile/station/StationProfile.jsx
import { useState } from 'react';
import { stationUser } from '../../data/mobileData';

export default function StationProfile() {
  const [open, setOpen] = useState(null);

  const items = [
    { id: 'current',   icon: '📍', label: 'Current Location', value: 'Warehouse B' },
    { id: 'entry',     icon: '🚪', label: 'Entry Record',     value: '09:42 · Gate A' },
    { id: 'movement',  icon: '🧭', label: 'Today\'s Movement', value: '5 moves' },
    { id: 'activity',  icon: '⚡', label: 'Activity Log',     value: '3 actions' },
    { id: 'settings',  icon: '⚙️', label: 'App Settings',     value: null },
    { id: 'help',      icon: '❓', label: 'Help',             value: null },
  ];

  return (
    <div className="pb-4">
      {/* Profile header */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white p-6 rounded-b-2xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
            {stationUser.avatar}
          </div>
          <div className="flex-1">
            <div className="text-lg font-bold">{stationUser.name}</div>
            <div className="text-[12px] opacity-90 mt-0.5">{stationUser.role}</div>
            <div className="text-[10px] opacity-80 font-mono mt-0.5">{stationUser.id}</div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/20 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
          <div className="text-[11px] opacity-95">
            Currently inside · Warehouse B
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="px-4 mt-5">
        <p className="text-[10px] font-bold text-slate-400 tracking-wider mb-2">
          MY INFO
        </p>
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
          {items.map((it) => (
            <button
              key={it.id}
              onClick={() => setOpen(open === it.id ? null : it.id)}
              className="w-full flex items-center justify-between p-3.5 hover:bg-slate-50 transition text-left"
            >
              <span className="flex items-center gap-3">
                <span className="text-base">{it.icon}</span>
                <span className="text-[12px] font-semibold text-slate-700">{it.label}</span>
              </span>
              <span className="flex items-center gap-2">
                {it.value && (
                  <span className="text-[11px] text-slate-500">{it.value}</span>
                )}
                <span className="text-slate-300 text-[12px]">
                  {open === it.id ? '▾' : '›'}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {open === 'movement' && (
        <div className="mx-4 mt-3 bg-slate-50 border border-slate-200 rounded-xl p-3">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Movement timeline
          </div>
          <div className="text-[11px] text-slate-700 space-y-1">
            <div>09:42 · Gate A → Station</div>
            <div>10:03 · Station → Warehouse A</div>
            <div>10:28 · Warehouse A → Warehouse B</div>
            <div>11:14 · Warehouse B → Gate C</div>
            <div>11:38 · Gate C → Warehouse B</div>
          </div>
        </div>
      )}

      {open === 'activity' && (
        <div className="mx-4 mt-3 bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Recent activity
          </div>
          <div className="text-[11px] text-slate-700">📦 Loaded container CNT-2048 · 10:45</div>
          <div className="text-[11px] text-slate-700">📦 Opened container CNT-2051 · 11:20</div>
          <div className="text-[11px] text-slate-700">💊 Medical kit MK-102 issued · 12:05</div>
        </div>
      )}

      <div className="px-4 mt-5">
        <button className="w-full py-3 rounded-xl border border-red-200 text-red-600 text-[12px] font-bold hover:bg-red-50 transition">
          Log out
        </button>
      </div>
    </div>
  );
}