// src/mobile/MobileHome.jsx
export default function MobileHome({ role, onNavigate }) {
  // Header color depends on role
  const headerColor =
    role === 'medical'
      ? 'from-red-500 to-red-700'
      : role === 'station'
      ? 'from-emerald-500 to-emerald-700'
      : 'from-blue-500 to-blue-700';

  return (
    <div className="pb-4">

      {/* App header */}
      <div className={`bg-gradient-to-r ${headerColor} text-white p-5 rounded-b-2xl`}>
        <div className="text-[10px] opacity-80 tracking-wider">IPELAMS</div>
        <div className="text-lg font-bold capitalize mt-0.5">{role} Officer</div>
        <div className="text-[11px] mt-1 opacity-90">Goa Warehouse · Online</div>
      </div>

      {/* Pending sync banner */}
      <div className="mx-4 mt-4 bg-yellow-50 border border-yellow-300 rounded-lg p-3 flex items-center gap-3">
        <span className="text-lg">⏳</span>
        <div className="text-[11px] text-yellow-800 leading-snug">
          <b>3 records pending sync</b>
          <br />
          Will upload when online
        </div>
      </div>

      {/* Quick actions */}
      <div className="p-4">
        <p className="text-[10px] font-bold text-slate-400 tracking-wider mb-2">
          QUICK ACTIONS
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          <ActionButton icon="📷" label="Scan Cargo"    onClick={() => onNavigate('scan')} />
          <ActionButton icon="📦" label="Load Container" />
          <ActionButton icon="🔄" label="Sync Status"   onClick={() => onNavigate('sync')} />
          <ActionButton icon="📋" label="Manifest" />
        </div>
      </div>

      {/* Recent scans */}
      <div className="px-4">
        <p className="text-[10px] font-bold text-slate-400 tracking-wider mb-2">
          RECENT SCANS
        </p>
        <div className="space-y-2">
          <RecentRow id="SHP-2024-001" name="Ice Core Drill" status="pending" />
          <RecentRow id="SHP-2024-002" name="Frozen Food"    status="synced"  />
          <RecentRow id="SHP-2024-003" name="Batteries"      status="synced"  />
        </div>
      </div>
    </div>
  );
}

/* --- small local components --- */

function ActionButton({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white border border-slate-200 rounded-xl p-3 text-left hover:border-blue-400 hover:shadow-sm transition"
    >
      <div className="text-xl">{icon}</div>
      <div className="text-[11px] font-semibold text-slate-700 mt-1.5">{label}</div>
    </button>
  );
}

function RecentRow({ id, name, status }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3 flex justify-between items-center">
      <div>
        <div className="text-[11px] font-bold text-slate-700">{id}</div>
        <div className="text-[11px] text-slate-500">{name}</div>
      </div>
      <span
        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
          status === 'synced'
            ? 'bg-green-100 text-green-700'
            : 'bg-yellow-100 text-yellow-700'
        }`}
      >
        {status === 'synced' ? '✅ Synced' : '⏳ Pending'}
      </span>
    </div>
  );
}