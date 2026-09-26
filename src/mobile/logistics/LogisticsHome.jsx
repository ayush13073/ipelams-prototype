// src/mobile/logistics/LogisticsHome.jsx
import { logisticsUser, logisticsToday, logisticsRecentScans } from '../../data/mobileData';

export default function LogisticsHome({ onNavigate }) {
  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-5 rounded-b-2xl">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-[10px] opacity-80 tracking-wider">IPELAMS</div>
            <div className="text-lg font-bold mt-0.5">{logisticsUser.name}</div>
            <div className="text-[11px] opacity-90 mt-0.5">
              {logisticsUser.role} · {logisticsUser.location}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] opacity-80">Shift</div>
            <div className="text-[11px] font-semibold">{logisticsUser.shift}</div>
          </div>
        </div>
      </div>

      {/* Pending sync banner */}
      <div className="mx-4 mt-4 bg-amber-50 border border-amber-300 rounded-lg p-3 flex items-center gap-3">
        <span className="text-lg">⏳</span>
        <div className="flex-1 text-[11px] text-amber-800 leading-snug">
          <b>3 records pending sync</b>
          <br />
          Uploading when link is available
        </div>
        <button
          onClick={() => onNavigate('sync')}
          className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-1 rounded"
        >
          View →
        </button>
      </div>

      {/* Big scan button */}
      <div className="px-4 mt-4">
        <button
          onClick={() => onNavigate('scan')}
          className="w-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white rounded-2xl p-6 shadow-lg active:scale-98 transition-transform"
        >
          <div className="text-4xl mb-2">📷</div>
          <div className="text-lg font-bold">Scan Cargo</div>
          <div className="text-[11px] opacity-90 mt-1">
            Scan QR · Barcode · NFC
          </div>
        </button>
      </div>

      {/* Today's activity */}
      <div className="px-4 mt-5">
        <p className="text-[10px] font-bold text-slate-400 tracking-wider mb-2">
          TODAY'S ACTIVITY
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          <StatBox value={logisticsToday.itemsScanned} label="Items"     icon="📦" />
          <StatBox value={logisticsToday.containers}   label="Containers" icon="🗃️" />
          <StatBox value={logisticsToday.transfers}    label="Transfers"  icon="🔄" />
          <StatBox value={logisticsToday.pending}      label="Pending"    icon="⏳" highlight />
        </div>
      </div>

      {/* Recent scans */}
      <div className="px-4 mt-5">
        <p className="text-[10px] font-bold text-slate-400 tracking-wider mb-2">
          RECENT SCANS
        </p>
        <div className="space-y-2">
          {logisticsRecentScans.map((s) => (
            <div
              key={s.id}
              className="bg-white border border-slate-200 rounded-lg p-3 flex items-center justify-between"
            >
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-bold text-slate-800 font-mono">{s.id}</div>
                <div className="text-[11px] text-slate-600 truncate">{s.name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {s.when} · → {s.dest}
                </div>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0 ${
                  s.status === 'synced'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                {s.status === 'synced' ? '✅' : '⏳'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatBox({ value, label, icon, highlight }) {
  return (
    <div className={`rounded-xl p-3 border ${
      highlight ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'
    }`}>
      <div className="text-lg">{icon}</div>
      <div className={`text-xl font-bold mt-1 ${highlight ? 'text-amber-700' : 'text-slate-800'}`}>
        {value}
      </div>
      <div className="text-[10px] text-slate-500 uppercase tracking-wide mt-0.5">{label}</div>
    </div>
  );
}