// src/mobile/medical/MedicalMeds.jsx
import { useState } from 'react';
import { medicines } from '../../data/mobileData';

const STATUS_STYLE = {
  sealed:     { cls: 'bg-green-100 text-green-700',   label: 'Sealed' },
  opened:     { cls: 'bg-blue-100 text-blue-700',     label: 'Opened' },
  controlled: { cls: 'bg-purple-100 text-purple-700', label: '🔒 Controlled' },
  expired:    { cls: 'bg-red-100 text-red-700',       label: 'Expired' },
};

export default function MedicalMeds() {
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(null);

  const filtered = medicines.filter((m) => {
    if (filter === 'all') return true;
    if (filter === 'opened') return m.status === 'opened';
    if (filter === 'expiring') return m.daysLeft !== null && m.daysLeft <= 30;
    if (filter === 'controlled') return m.status === 'controlled';
    return true;
  });

  const selected = medicines.find((m) => m.id === selectedId);

  return (
    <div className="p-4">
      <h2 className="text-base font-bold text-slate-800 mb-3">Medicines</h2>

      {/* Filters */}
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1 mb-4 overflow-x-auto">
        {[
          { id: 'all',        label: 'All' },
          { id: 'opened',     label: 'Opened' },
          { id: 'expiring',   label: 'Expiring' },
          { id: 'controlled', label: 'Controlled' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id)}
            className={`text-[10px] font-semibold px-2.5 py-1.5 rounded-md whitespace-nowrap transition ${
              filter === t.id ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((m) => {
          const st = STATUS_STYLE[m.status];
          const critical = m.daysLeft !== null && m.daysLeft <= 5;
          return (
            <button
              key={m.id}
              onClick={() => setSelectedId(m.id)}
              className={`w-full text-left border rounded-xl p-3 transition ${
                m.status === 'expired' ? 'bg-red-50/40 border-red-200' :
                critical ? 'bg-amber-50/40 border-amber-200' :
                'bg-white border-slate-200 hover:border-pink-400'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-bold text-slate-800 truncate">{m.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">{m.batch}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{m.location}</div>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${st.cls}`}>
                    {st.label}
                  </span>
                  {m.daysLeft !== null && (
                    <div className={`text-[11px] font-bold mt-1.5 ${
                      m.daysLeft < 0 ? 'text-red-700' :
                      critical ? 'text-red-600' : 'text-slate-600'
                    }`}>
                      {m.daysLeft < 0 ? 'Expired' : `${m.daysLeft}d`}
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selected && <MedSheet med={selected} onClose={() => setSelectedId(null)} />}
    </div>
  );
}

function MedSheet({ med: m, onClose }) {
  const st = STATUS_STYLE[m.status];

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div
        className="bg-white rounded-t-3xl w-full max-w-[340px] max-h-[85%] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pt-3 pb-1 flex justify-center">
          <div className="w-10 h-1 rounded-full bg-slate-300" />
        </div>

        <div className="px-5 py-3 flex items-start justify-between">
          <div>
            <div className="text-[10px] font-bold text-pink-600 uppercase tracking-wider">
              💊 Medicine
            </div>
            <div className="text-[14px] font-bold text-slate-800 mt-1">{m.name}</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">{m.batch}</div>
          </div>
          <button onClick={onClose} className="text-slate-400 text-xl leading-none">×</button>
        </div>

        <div className="px-5">
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${st.cls}`}>
            {st.label}
          </span>
        </div>

        <div className="px-5 mt-4 grid grid-cols-2 gap-3 text-[11px]">
          <InfoBox label="Quantity"  value={`${m.quantity} ${m.unit}`} />
          <InfoBox label="Location"  value={m.location} />
          <InfoBox label="Expiry"    value={m.expiry} />
          <InfoBox label="Opened"    value={m.opened || 'Not opened'} />
          {m.opened && (
            <>
              <InfoBox label="Open-life"  value={`${m.openLifeDays} days`} />
              <InfoBox label="Opened by"  value={m.openedBy} />
            </>
          )}
        </div>

        {m.daysLeft !== null && m.daysLeft >= 0 && (
          <div className={`mx-5 mt-4 border rounded-lg p-3 ${
            m.daysLeft <= 5 ? 'bg-red-50 border-red-200' :
            m.daysLeft <= 15 ? 'bg-amber-50 border-amber-200' :
            'bg-green-50 border-green-200'
          }`}>
            <div className={`text-[11px] font-bold ${
              m.daysLeft <= 5 ? 'text-red-700' :
              m.daysLeft <= 15 ? 'text-amber-700' :
              'text-green-700'
            }`}>
              ⚡ {m.daysLeft} days remaining on open-life
            </div>
          </div>
        )}

        {m.daysLeft !== null && m.daysLeft < 0 && (
          <div className="mx-5 mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="text-[11px] font-bold text-red-700">
              🚨 Open-life has expired · do not use
            </div>
          </div>
        )}

        <div className="px-5 py-4 flex gap-2 border-t border-slate-100 mt-4">
          <button className="flex-1 py-2.5 rounded-lg bg-pink-600 hover:bg-pink-700 text-white text-[11px] font-bold transition">
            Issue
          </button>
          <button className="flex-1 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-[11px] font-semibold hover:bg-slate-50 transition">
            View History
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div>
      <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{label}</div>
      <div className="text-[12px] font-semibold text-slate-800 mt-0.5">{value}</div>
    </div>
  );
}