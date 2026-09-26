// src/mobile/station/StationHome.jsx
import { stationUser, stationToday, openedItems } from '../../data/mobileData';

export default function StationHome({ onNavigate }) {
  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 text-white p-5 rounded-b-2xl">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-[10px] opacity-80 tracking-wider">IPELAMS</div>
            <div className="text-lg font-bold mt-0.5">{stationUser.name}</div>
            <div className="text-[11px] opacity-90 mt-0.5">
              {stationUser.id} · {stationUser.role}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] opacity-80">Shift</div>
            <div className="text-[11px] font-semibold">{stationUser.shift}</div>
          </div>
        </div>
      </div>

      {/* Offline banner */}
      <div className="mx-4 mt-4 bg-amber-50 border border-amber-300 rounded-lg p-3 flex items-center gap-3">
        <span className="text-lg">📡</span>
        <div className="flex-1 text-[11px] text-amber-800 leading-snug">
          <b>OFFLINE · 3 days since sync</b>
          <br />
          247 records pending
        </div>
        <button
          onClick={() => onNavigate('sync')}
          className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-1 rounded"
        >
          Queue →
        </button>
      </div>

      {/* Today snapshot */}
      <div className="px-4 mt-4">
        <p className="text-[10px] font-bold text-slate-400 tracking-wider mb-2">
          TODAY · LIVE
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          <StatBox value={stationToday.insideStation} label="Inside"       icon="🏠" accent="green" onClick={() => onNavigate('people')} />
          <StatBox value={stationToday.outside}       label="Outside"      icon="🚶" accent="blue"  onClick={() => onNavigate('people')} />
          <StatBox value={stationToday.containers}    label="Containers"   icon="🗃️" accent="purple" />
          <StatBox value={stationToday.openedToday}   label="Opened today" icon="📂" accent="amber"  />
        </div>
      </div>

      {/* Opened items — expiring */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-bold text-slate-400 tracking-wider">
            OPENED ITEMS · EXPIRY TRACKING
          </p>
          <span className="text-[10px] font-bold text-amber-700">FEFO</span>
        </div>
        <div className="space-y-2">
          {openedItems.map((it) => {
            const cls =
              it.status === 'critical' ? 'border-red-300 bg-red-50' :
              it.status === 'warning'  ? 'border-amber-300 bg-amber-50' :
              'border-slate-200 bg-white';
            const txtCls =
              it.status === 'critical' ? 'text-red-700' :
              it.status === 'warning'  ? 'text-amber-700' :
              'text-slate-600';
            return (
              <div key={it.id} className={`border rounded-lg p-3 ${cls}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-semibold text-slate-800">{it.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      Opened {it.openedAt} · by {it.by}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 font-mono">{it.id}</div>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <div className={`text-lg font-bold ${txtCls}`}>
                      {it.daysLeft < 0 ? 'Expired' : `${it.daysLeft}d`}
                    </div>
                    <div className="text-[9px] text-slate-400 uppercase">
                      {it.daysLeft < 0 ? '' : 'left'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-4 mt-5">
        <p className="text-[10px] font-bold text-slate-400 tracking-wider mb-2">
          QUICK ACTIONS
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          <QuickBtn icon="📷" label="Scan Item"    onClick={() => onNavigate('scan')} />
          <QuickBtn icon="👥" label="Personnel"    onClick={() => onNavigate('people')} />
          <QuickBtn icon="🗃️" label="Containers"   onClick={() => onNavigate('scan')} />
          <QuickBtn icon="🔄" label="Sync Status"  onClick={() => onNavigate('sync')} />
        </div>
      </div>
    </div>
  );
}

function StatBox({ value, label, icon, accent, onClick }) {
  const cls = {
    green:  'border-green-200 bg-green-50',
    blue:   'border-blue-200 bg-blue-50',
    purple: 'border-purple-200 bg-purple-50',
    amber:  'border-amber-200 bg-amber-50',
  }[accent];
  const txtCls = {
    green:  'text-green-700',
    blue:   'text-blue-700',
    purple: 'text-purple-700',
    amber:  'text-amber-700',
  }[accent];

  return (
    <button
      onClick={onClick}
      className={`rounded-xl p-3 border text-left transition ${cls} active:scale-98`}
    >
      <div className="text-lg">{icon}</div>
      <div className={`text-xl font-bold mt-1 ${txtCls}`}>{value}</div>
      <div className="text-[10px] text-slate-600 uppercase tracking-wide mt-0.5">{label}</div>
    </button>
  );
}

function QuickBtn({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="border border-slate-200 rounded-xl p-3 text-left hover:border-emerald-400 hover:bg-emerald-50/40 transition bg-white"
    >
      <div className="text-xl">{icon}</div>
      <div className="text-[11px] font-semibold text-slate-700 mt-1.5">{label}</div>
    </button>
  );
}