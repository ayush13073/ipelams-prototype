// src/mobile/medical/MedicalEquipment.jsx
import { useState } from 'react';
import { medicalEquipment } from '../../data/mobileData';

const STATUS_STYLE = {
  available:   { cls: 'bg-green-100 text-green-700',  label: '🟢 Available' },
  'in-use':    { cls: 'bg-blue-100 text-blue-700',    label: '🔵 In Use' },
  maintenance: { cls: 'bg-amber-100 text-amber-700',  label: '🟡 Maintenance' },
};

export default function MedicalEquipment() {
  const [selectedId, setSelectedId] = useState(null);
  const selected = medicalEquipment.find((e) => e.id === selectedId);

  return (
    <div className="p-4">
      <h2 className="text-base font-bold text-slate-800 mb-3">Medical Equipment</h2>

      <div className="space-y-2">
        {medicalEquipment.map((e) => {
          const st = STATUS_STYLE[e.status];
          return (
            <button
              key={e.id}
              onClick={() => setSelectedId(e.id)}
              className={`w-full text-left border rounded-xl p-3 transition ${
                e.status === 'maintenance' ? 'bg-amber-50/40 border-amber-200' :
                'bg-white border-slate-200 hover:border-pink-400'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-bold text-slate-800 truncate">{e.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">{e.id}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">📍 {e.location}</div>
                </div>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold shrink-0 ml-2 ${st.cls}`}>
                  {st.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {selected && <EquipSheet eq={selected} onClose={() => setSelectedId(null)} />}
    </div>
  );
}

function EquipSheet({ eq: e, onClose }) {
  const st = STATUS_STYLE[e.status];

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div
        className="bg-white rounded-t-3xl w-full max-w-[340px] max-h-[85%] overflow-y-auto"
        onClick={(ev) => ev.stopPropagation()}
      >
        <div className="pt-3 pb-1 flex justify-center">
          <div className="w-10 h-1 rounded-full bg-slate-300" />
        </div>

        <div className="px-5 py-3 flex items-start justify-between">
          <div>
            <div className="text-[10px] font-bold text-pink-600 uppercase tracking-wider">
              🧰 Equipment
            </div>
            <div className="text-[14px] font-bold text-slate-800 mt-1">{e.name}</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">{e.id}</div>
          </div>
          <button onClick={onClose} className="text-slate-400 text-xl leading-none">×</button>
        </div>

        <div className="px-5">
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${st.cls}`}>
            {st.label}
          </span>
        </div>

        <div className="px-5 mt-4 grid grid-cols-2 gap-3 text-[11px]">
          <InfoBox label="Location"        value={e.location} />
          <InfoBox label="Total Usage"     value={e.usageHours + ' hrs'} />
          <InfoBox label="Last inspection" value={e.lastInspection} />
          <InfoBox label="Next inspection" value={e.nextInspection} />
          <InfoBox label="Maintenance" value={e.maintenance} span />
        </div>

        <div className="px-5 py-4 flex gap-2 border-t border-slate-100 mt-4">
          <button className="flex-1 py-2.5 rounded-lg bg-pink-600 hover:bg-pink-700 text-white text-[11px] font-bold transition">
            Assign
          </button>
          <button className="flex-1 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-[11px] font-semibold hover:bg-slate-50 transition">
            Log Maintenance
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoBox({ label, value, span }) {
  return (
    <div className={span ? 'col-span-2' : ''}>
      <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{label}</div>
      <div className="text-[12px] font-semibold text-slate-800 mt-0.5">{value}</div>
    </div>
  );
}