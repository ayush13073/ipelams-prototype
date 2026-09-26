// src/mobile/medical/MedicalProfile.jsx
import { medicalUser } from '../../data/mobileData';

export default function MedicalProfile() {
  return (
    <div className="pb-4">
      <div className="bg-gradient-to-br from-pink-500 to-rose-700 text-white p-6 rounded-b-2xl">
        <div className="text-[10px] opacity-80 tracking-wider">🔒 CONFIDENTIAL</div>
        <div className="flex items-center gap-4 mt-3">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
            {medicalUser.avatar}
          </div>
          <div className="flex-1">
            <div className="text-lg font-bold">{medicalUser.name}</div>
            <div className="text-[12px] opacity-90 mt-0.5">{medicalUser.role}</div>
            <div className="text-[10px] opacity-80 font-mono mt-0.5">{medicalUser.id}</div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-5 space-y-2">
        <MenuRow icon="🏥" label="Patient Records"  sub="Access restricted · audit-logged" />
        <MenuRow icon="📞" label="Telemedicine"      sub="Scheduled consultations" />
        <MenuRow icon="❄️" label="Cold Chain Log"   sub="Temperature history" />
        <MenuRow icon="🗑️" label="Medical Waste"    sub="Sharps · biohazard · expired" />
        <MenuRow icon="🔒" label="Audit Log"        sub="Your access history" />
        <MenuRow icon="⚙️" label="Settings"          sub="App preferences" />
      </div>

      <div className="mx-4 mt-4 bg-pink-50 border border-pink-200 rounded-lg p-3 text-[11px] text-pink-800 leading-snug">
        <b>🔒 Reminder.</b> Every access to patient records is logged and auditable
        by NCPOR medical oversight.
      </div>

      <div className="px-4 mt-5">
        <button className="w-full py-3 rounded-xl border border-red-200 text-red-600 text-[12px] font-bold hover:bg-red-50 transition">
          Log out
        </button>
      </div>
    </div>
  );
}

function MenuRow({ icon, label, sub }) {
  return (
    <button className="w-full bg-white border border-slate-200 rounded-xl p-3.5 flex items-center justify-between hover:border-pink-400 hover:bg-pink-50/30 transition text-left">
      <div className="flex items-center gap-3">
        <span className="text-base">{icon}</span>
        <div>
          <div className="text-[12px] font-semibold text-slate-800">{label}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">{sub}</div>
        </div>
      </div>
      <span className="text-slate-300 text-[12px]">›</span>
    </button>
  );
}