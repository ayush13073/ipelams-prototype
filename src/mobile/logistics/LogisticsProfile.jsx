// src/mobile/logistics/LogisticsProfile.jsx
import { useState } from 'react';
import { logisticsUser } from '../../data/mobileData';

export default function LogisticsProfile() {
  const [open, setOpen] = useState(null);

  const items = [
    { id: 'history',   icon: '🕐', label: 'Scan History',     count: 24 },
    { id: 'shift',     icon: '📅', label: 'Shift Records',    count: null },
    { id: 'settings',  icon: '⚙️', label: 'App Settings',     count: null },
    { id: 'help',      icon: '❓', label: 'Help & Workflows', count: null },
  ];

  return (
    <div className="pb-4">
      {/* Profile header */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-b-2xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
            {logisticsUser.avatar}
          </div>
          <div className="flex-1">
            <div className="text-lg font-bold">{logisticsUser.name}</div>
            <div className="text-[12px] opacity-90 mt-0.5">{logisticsUser.role}</div>
            <div className="text-[10px] opacity-80 font-mono mt-0.5">{logisticsUser.id}</div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-2 gap-3 text-[11px]">
          <div>
            <div className="opacity-70 text-[10px] uppercase tracking-wide">Location</div>
            <div className="font-semibold">{logisticsUser.location}</div>
          </div>
          <div>
            <div className="opacity-70 text-[10px] uppercase tracking-wide">Shift</div>
            <div className="font-semibold">{logisticsUser.shift}</div>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-2 px-4 mt-4">
        <MiniStat value="142" label="Total Scans" />
        <MiniStat value="38"  label="Containers"  />
        <MiniStat value="4"   label="Days Active" />
      </div>

      {/* Menu */}
      <div className="px-4 mt-5">
        <p className="text-[10px] font-bold text-slate-400 tracking-wider mb-2">
          ACCOUNT
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
                {it.count !== null && (
                  <span className="text-[10px] font-bold text-slate-400">{it.count}</span>
                )}
                <span className="text-slate-300 text-[12px]">
                  {open === it.id ? '▾' : '›'}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Expanded content */}
      {open === 'history' && (
        <div className="mx-4 mt-3 bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Last 3 scans
          </div>
          <div className="text-[11px] text-slate-700">SHP-2024-001 · 10:45 AM</div>
          <div className="text-[11px] text-slate-700">SHP-2024-002 · 10:42 AM</div>
          <div className="text-[11px] text-slate-700">SHP-2024-003 · 10:38 AM</div>
        </div>
      )}

      {open === 'help' && (
        <div className="mx-4 mt-3 bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Your workflow
          </div>
          <ol className="text-[11px] text-slate-700 space-y-1 list-decimal list-inside">
            <li>Scan cargo QR at warehouse</li>
            <li>Confirm weight & dimensions</li>
            <li>Load into container</li>
            <li>Confirm load → saved locally</li>
            <li>Syncs when link is available</li>
          </ol>
        </div>
      )}

      {/* Logout */}
      <div className="px-4 mt-5">
        <button className="w-full py-3 rounded-xl border border-red-200 text-red-600 text-[12px] font-bold hover:bg-red-50 transition">
          Log out
        </button>
      </div>
    </div>
  );
}

function MiniStat({ value, label }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-2.5 text-center">
      <div className="text-lg font-bold text-slate-800">{value}</div>
      <div className="text-[9px] text-slate-500 uppercase tracking-wide mt-0.5">{label}</div>
    </div>
  );
}