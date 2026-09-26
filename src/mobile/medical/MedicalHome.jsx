// src/mobile/medical/MedicalHome.jsx
import { medicalUser, medicalToday, medicines } from '../../data/mobileData';

export default function MedicalHome({ onNavigate }) {
  const expiring = medicines.filter((m) => m.daysLeft !== null && m.daysLeft <= 15);

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-700 text-white p-5 rounded-b-2xl">
        <div className="text-[10px] opacity-80 tracking-wider">🔒 CONFIDENTIAL</div>
        <div className="text-lg font-bold mt-0.5">{medicalUser.name}</div>
        <div className="text-[11px] opacity-90 mt-0.5">
          {medicalUser.role} · {medicalUser.location}
        </div>
      </div>

      {/* Quick stats */}
      <div className="px-4 mt-4 grid grid-cols-2 gap-2.5">
        <StatBox value={medicalToday.activePatients}  label="Active patients"  icon="🏥" accent="red" onClick={() => onNavigate('scan')} />
        <StatBox value={medicalToday.pendingConsults} label="Pending consults" icon="📞" accent="amber" />
        <StatBox value={medicalToday.medicines}       label="Medicines"        icon="💊" accent="pink" onClick={() => onNavigate('meds')} />
        <StatBox value={medicalToday.equipment}       label="Equipment"        icon="🧰" accent="blue" onClick={() => onNavigate('equipment')} />
      </div>

      {/* Expiry alerts */}
      {expiring.length > 0 && (
        <div className="px-4 mt-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider">
              ⚠ EXPIRY ALERTS
            </p>
            <button
              onClick={() => onNavigate('meds')}
              className="text-[10px] font-bold text-pink-700"
            >
              View all →
            </button>
          </div>
          <div className="space-y-2">
            {expiring.slice(0, 3).map((m) => {
              const critical = m.daysLeft <= 5;
              const expired = m.daysLeft < 0;
              return (
                <div
                  key={m.id}
                  className={`border rounded-lg p-3 ${
                    expired ? 'border-red-300 bg-red-50' :
                    critical ? 'border-red-200 bg-red-50' :
                    'border-amber-200 bg-amber-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-semibold text-slate-800 truncate">{m.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">{m.batch}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {m.opened ? `Opened ${m.opened}` : 'Sealed'}
                      </div>
                    </div>
                    <div className={`text-right shrink-0 ml-2 ${
                      expired ? 'text-red-700' :
                      critical ? 'text-red-600' :
                      'text-amber-600'
                    }`}>
                      <div className="text-lg font-bold">
                        {expired ? 'Expired' : `${m.daysLeft}d`}
                      </div>
                      <div className="text-[9px] uppercase">
                        {expired ? '' : 'open-life'}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div className="px-4 mt-5">
        <p className="text-[10px] font-bold text-slate-400 tracking-wider mb-2">
          QUICK ACTIONS
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          <QuickBtn icon="📷" label="Scan Medicine"   onClick={() => onNavigate('scan')} />
          <QuickBtn icon="💊" label="Issue Medicine"  onClick={() => onNavigate('meds')} />
          <QuickBtn icon="🧰" label="Equipment Log"   onClick={() => onNavigate('equipment')} />
          <QuickBtn icon="📞" label="Telemedicine"    onClick={() => {}} />
        </div>
      </div>

      {/* Cold chain */}
      <div className="px-4 mt-5">
        <p className="text-[10px] font-bold text-slate-400 tracking-wider mb-2">
          ❄️ COLD CHAIN · LIVE
        </p>
        <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100">
          <ChainRow icon="💉" label="Vaccine Fridge" value="4°C"   target="2–8°C" />
          <ChainRow icon="🩸" label="Blood Bank"     value="−20°C" target="−20°C" />
          <ChainRow icon="🧪" label="Sample Freezer" value="−80°C" target="−80°C" />
        </div>
      </div>
    </div>
  );
}

function StatBox({ value, label, icon, accent, onClick }) {
  const cls = {
    red:   'border-red-200 bg-red-50',
    amber: 'border-amber-200 bg-amber-50',
    pink:  'border-pink-200 bg-pink-50',
    blue:  'border-blue-200 bg-blue-50',
  }[accent];
  const txtCls = {
    red:   'text-red-700',
    amber: 'text-amber-700',
    pink:  'text-pink-700',
    blue:  'text-blue-700',
  }[accent];

  return (
    <button onClick={onClick} className={`rounded-xl p-3 border text-left ${cls} active:scale-98 transition`}>
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
      className="border border-slate-200 rounded-xl p-3 text-left hover:border-pink-400 hover:bg-pink-50/40 transition bg-white"
    >
      <div className="text-xl">{icon}</div>
      <div className="text-[11px] font-semibold text-slate-700 mt-1.5">{label}</div>
    </button>
  );
}

function ChainRow({ icon, label, value, target }) {
  return (
    <div className="flex items-center justify-between px-3 py-2.5">
      <div className="flex items-center gap-3">
        <span className="text-base">{icon}</span>
        <div>
          <div className="text-[12px] font-semibold text-slate-800">{label}</div>
          <div className="text-[10px] text-slate-400">Target {target}</div>
        </div>
      </div>
      <div className="text-[12px] font-bold text-green-700 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
        {value}
      </div>
    </div>
  );
}