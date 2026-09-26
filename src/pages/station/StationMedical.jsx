// src/pages/station/StationMedical.jsx
import { useState, useMemo } from 'react';
import {
  medicalOverview,
  coldChainStatus,
  medicalSupplies,
  medicalAlerts,
  patients,
  patientStatusBadge,
  telemedicineConsults,
  telemedicineStatusBadge,
  medicalWasteCategories,
  medicalAuditLog,
} from '../../data/stationData';

/* ───────────── helpers ───────────── */

const ALERT_STYLES = {
  red:   { bg: 'bg-red-50 border-red-200',     text: 'text-red-800',    icon: '🔴' },
  amber: { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-800',  icon: '🟡' },
  green: { bg: 'bg-green-50 border-green-200', text: 'text-green-800',  icon: '🟢' },
};

const SUPPLY_COLORS = {
  green: { bar: 'bg-green-500', text: 'text-green-700' },
  amber: { bar: 'bg-amber-500', text: 'text-amber-700' },
  red:   { bar: 'bg-red-500',   text: 'text-red-700' },
};

const WASTE_STATUS_BADGE = {
  'ready-incineration': { label: 'Ready for Incineration', cls: 'bg-amber-100 text-amber-700' },
  'awaiting-permit':    { label: 'Awaiting Permit',         cls: 'bg-red-100 text-red-700' },
};

const HAZARD_BADGE = {
  low:    { label: 'Low',    cls: 'bg-slate-100 text-slate-600' },
  medium: { label: 'Medium', cls: 'bg-amber-100 text-amber-700' },
  high:   { label: 'High',   cls: 'bg-red-100 text-red-700' },
};

function initials(name) {
  return name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
}

/* ───────────── main ───────────── */

export default function StationMedical() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  const selectedPatient = patients.find((p) => p.id === selectedPatientId);

  const tabs = [
    { id: 'overview',    label: 'Overview',        icon: '🏥' },
    { id: 'patients',    label: 'Patients',        icon: '👥', count: patients.length },
    { id: 'telemedicine',label: 'Telemedicine',    icon: '📡', count: telemedicineConsults.length },
    { id: 'waste',       label: 'Medical Waste',   icon: '🗑️', count: medicalWasteCategories.length },
    { id: 'audit',       label: 'Audit Log',       icon: '🔒', count: medicalAuditLog.length },
  ];

  return (
    <div className="p-6 space-y-6">

      {/* Confidential banner */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-700 text-white rounded-xl px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">🔒</span>
          <div>
            <div className="text-[12px] font-bold uppercase tracking-wider">
              Confidential — Authorized Access Only
            </div>
            <div className="text-[11px] opacity-90">
              Every access to patient data is logged and auditable.
            </div>
          </div>
        </div>
        <button
          onClick={() => setEmergencyOpen(true)}
          className="text-[11px] font-bold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition flex items-center gap-1.5"
        >
          🚨 Emergency Access
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">🏥 Medical Module</h1>
          <p className="text-[12px] text-slate-500 mt-0.5">
            Dr. Priya · Medical Officer · Maitri Station
          </p>
        </div>
        <div className="flex gap-2">
          <button className="text-[12px] font-semibold px-3.5 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition">
            + New Consultation
          </button>
          <button className="text-[12px] font-semibold px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition">
            📡 Request Telemedicine
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1 w-fit overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`text-[12px] font-semibold px-4 py-2 rounded-md transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === t.id
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>{t.icon}</span>
            {t.label}
            {t.count !== undefined && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeTab === t.id ? 'bg-pink-100 text-pink-700' : 'bg-slate-200 text-slate-600'
              }`}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'overview' && (
        <OverviewTab onViewPatient={(id) => { setActiveTab('patients'); setSelectedPatientId(id); }} />
      )}
      {activeTab === 'patients' && (
        <PatientsTab
          selectedPatientId={selectedPatientId}
          setSelectedPatientId={setSelectedPatientId}
        />
      )}
      {activeTab === 'telemedicine' && <TelemedicineTab />}
      {activeTab === 'waste' && <MedicalWasteTab />}
      {activeTab === 'audit' && <AuditTab />}

      {/* Patient detail modal */}
      {selectedPatient && activeTab === 'patients' && (
        <PatientModal
          patient={selectedPatient}
          onClose={() => setSelectedPatientId(null)}
        />
      )}

      {/* Emergency access modal */}
      {emergencyOpen && (
        <EmergencyAccessModal onClose={() => setEmergencyOpen(false)} />
      )}

    </div>
  );
}

/* ───────────── Overview tab ───────────── */

function OverviewTab({ onViewPatient }) {
  return (
    <div className="space-y-6">

      {/* Summary tiles */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <SummaryTile label="Active Patients"  value={medicalOverview.activePatients}   accent="text-red-600" />
        <SummaryTile label="Pending Consults" value={medicalOverview.pendingConsults}  accent="text-amber-600" />
        <SummaryTile label="Telemedicine"     value={medicalOverview.telemedicineToday} accent="text-blue-600" />
        <SummaryTile label="Medical Waste"    value={`${medicalOverview.medicalWasteKg} kg`} accent="text-slate-700" />
      </section>

      {/* Alerts + Cold chain */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Alerts (2 cols) */}
        <section className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[12px] font-bold text-slate-500 tracking-wider uppercase">
              Medical Alerts
            </div>
            <span className="text-[11px] text-slate-400">{medicalAlerts.length} active</span>
          </div>
          <div className="space-y-2">
            {medicalAlerts.map((a) => {
              const s = ALERT_STYLES[a.level];
              return (
                <div key={a.id} className={`flex items-start gap-3 border rounded-lg px-3.5 py-2.5 ${s.bg}`}>
                  <span className="text-base shrink-0 mt-0.5">{s.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className={`text-[13px] font-semibold ${s.text}`}>{a.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{a.detail}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Cold chain */}
        <section className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="text-[12px] font-bold text-slate-500 tracking-wider uppercase mb-3">
            ❄️ Cold Chain Status
          </div>
          <ul className="space-y-3">
            {coldChainStatus.map((c) => (
              <li key={c.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{c.icon}</span>
                  <div>
                    <div className="text-[12px] font-semibold text-slate-800">{c.label}</div>
                    <div className="text-[10px] text-slate-400">Target {c.target}</div>
                  </div>
                </div>
                <span className="text-[12px] font-bold text-green-700 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  {c.current}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-500">
            All cold chain units within range. Logging every 15 min.
          </div>
        </section>
      </div>

      {/* Patients today + Supply levels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Patients today (2 cols) */}
        <section className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[12px] font-bold text-slate-500 tracking-wider uppercase">
              Patients Today
            </div>
          </div>

          <ul className="divide-y divide-slate-100">
            {patients.map((p) => {
              const st = patientStatusBadge[p.status];
              return (
                <li
                  key={p.id}
                  onClick={() => onViewPatient(p.id)}
                  className="flex items-center justify-between py-3 cursor-pointer hover:bg-slate-50 -mx-2 px-2 rounded transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center text-[11px] font-bold">
                      {initials(p.name)}
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-slate-800">{p.name}</div>
                      <div className="text-[11px] text-slate-500">{p.statusLabel}</div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${st.cls}`}>
                    {st.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Supplies */}
        <section className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="text-[12px] font-bold text-slate-500 tracking-wider uppercase mb-4">
            Medical Supplies
          </div>
          <div className="space-y-3">
            {medicalSupplies.map((s) => {
              const c = SUPPLY_COLORS[s.cls];
              const pct = Math.round((s.daysLeft / s.totalDays) * 100);
              return (
                <div key={s.id}>
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-[11px] font-semibold text-slate-700">{s.label}</span>
                    <span className={`text-[12px] font-bold ${c.text}`}>{s.daysLeft}d</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className={`h-full rounded-full ${c.bar}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

function SummaryTile({ label, value, accent }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg px-4 py-3">
      <div className={`text-xl font-bold ${accent}`}>{value}</div>
      <div className="text-[11px] text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}

/* ───────────── Patients tab ───────────── */

function PatientsTab({ selectedPatientId, setSelectedPatientId }) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return patients.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.statusLabel.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-[14px] font-bold text-slate-800">Patient Records</h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {patients.length} patient(s) on record · all access audited
          </p>
        </div>
        <input
          type="text"
          placeholder="Search by name, ID or status…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-[12px] w-72 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wide">
            <tr>
              <th className="text-left px-5 py-3 font-semibold">Patient</th>
              <th className="text-left px-5 py-3 font-semibold">Age</th>
              <th className="text-left px-5 py-3 font-semibold">Role</th>
              <th className="text-left px-5 py-3 font-semibold">Blood</th>
              <th className="text-left px-5 py-3 font-semibold">Status</th>
              <th className="text-left px-5 py-3 font-semibold">Last Visit</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-slate-400 text-[12px]">
                  No patients match your search.
                </td>
              </tr>
            ) : (
              filtered.map((p) => {
                const st = patientStatusBadge[p.status];
                return (
                  <tr
                    key={p.id}
                    onClick={() => setSelectedPatientId(p.id)}
                    className="border-t border-slate-100 hover:bg-slate-50 cursor-pointer transition"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center text-[10px] font-bold">
                          {initials(p.name)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800">{p.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{p.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-slate-600 text-[12px]">{p.age}</td>
                    <td className="px-5 py-3 text-slate-600 text-[12px]">{p.role}</td>
                    <td className="px-5 py-3 font-mono font-bold text-red-600 text-[12px]">{p.bloodGroup}</td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${st.cls}`}>
                        {st.label}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-500 text-[12px]">{p.lastVisit}</td>
                    <td className="px-5 py-3 text-right">
                      <span className="text-pink-700 text-[12px] font-semibold">View →</span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ───────────── Patient modal ───────────── */

function PatientModal({ patient: p, onClose }) {
  const st = patientStatusBadge[p.status];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center text-base font-bold">
              {initials(p.name)}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">{p.name}</h2>
              <div className="text-[12px] text-slate-500 mt-0.5">
                {p.age} yrs · {p.role}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${st.cls}`}>
                  {st.label}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{p.id}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 text-xl"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto">

          {/* Critical info */}
          <div className="grid grid-cols-2 gap-4">
            <InfoBox label="Blood Group"       value={p.bloodGroup}            highlight />
            <InfoBox label="Emergency Contact" value={p.emergencyContact}       mono />
            <InfoBox label="Allergies"         value={p.allergies.length ? p.allergies.join(', ') : 'None known'} />
            <InfoBox label="Current Meds"      value={p.currentMeds.length ? p.currentMeds.join(', ') : 'None'} />
          </div>

          {/* History */}
          <div>
            <div className="flex items-center gap-2 text-[12px] font-bold text-slate-500 tracking-wider uppercase mb-3">
              🕐 Consultation History
            </div>
            <ol className="relative border-l-2 border-slate-200 ml-2 space-y-4">
              {p.history.map((h, i) => (
                <li key={i} className="ml-5">
                  <span className={`absolute -left-[7px] w-3.5 h-3.5 rounded-full border-2 border-white shadow ${
                    i === 0 ? 'bg-pink-500 ring-4 ring-pink-100' : 'bg-slate-400'
                  }`} />
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="text-[12px] font-bold text-slate-800">{h.date}</div>
                    <div className="text-[11px] text-slate-400">{h.doctor}</div>
                  </div>
                  <div className="text-[12px] text-slate-700 mt-0.5">{h.complaint}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">→ {h.treatment}</div>
                </li>
              ))}
            </ol>
          </div>

          {/* Audit notice */}
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-3 flex items-start gap-2.5">
            <span className="text-base shrink-0">🔒</span>
            <div className="text-[11px] text-pink-800 leading-snug">
              <b>Audit logged.</b> This access is recorded with your user ID, timestamp
              and reason for review.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex flex-wrap gap-2 justify-end bg-slate-50 rounded-b-2xl">
          <ActionBtn icon="📝" label="Consult"       primary />
          <ActionBtn icon="💊" label="Prescribe"      />
          <ActionBtn icon="🧪" label="Order Lab"      />
          <ActionBtn icon="📡" label="Telemedicine"   />
        </div>
      </div>
    </div>
  );
}

/* ───────────── Telemedicine tab ───────────── */

function TelemedicineTab() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-[14px] font-bold text-slate-800">Telemedicine</h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Video consults with specialists in India · works over satellite
          </p>
        </div>
        <button className="text-[12px] font-semibold px-3.5 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition">
          + Request Consult
        </button>
      </div>

      <div className="space-y-3">
        {telemedicineConsults.map((t) => {
          const st = telemedicineStatusBadge[t.status];
          return (
            <div key={t.id} className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {t.id}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${st.cls}`}>
                      {st.label}
                    </span>
                  </div>
                  <div className="mt-2 text-[14px] font-bold text-slate-800">
                    {t.patient}
                    <span className="text-[11px] text-slate-400 font-mono ml-2">{t.patientId}</span>
                  </div>
                  <div className="text-[12px] text-slate-600 mt-1">{t.topic}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Scheduled</div>
                  <div className="text-[12px] font-semibold text-slate-800">{t.scheduled}</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Specialist</div>
                  <div className="text-[12px] text-slate-700 font-medium">{t.specialist}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Location</div>
                  <div className="text-[12px] text-slate-700">{t.location}</div>
                </div>
                <div className="ml-auto flex gap-2">
                  {t.status === 'scheduled' ? (
                    <button className="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition">
                      🎥 Join Call
                    </button>
                  ) : (
                    <button className="text-[11px] font-semibold px-3 py-1.5 rounded-lg border border-slate-300 text-slate-500 cursor-wait">
                      ⏳ Awaiting Slot
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <span className="text-xl">📡</span>
        <div className="text-[11px] text-blue-800 leading-snug">
          <b>How it works:</b> Consults are scheduled via the satellite link. Both doctor
          and specialist join a low-bandwidth video call. If the link drops, the
          session can resume — the platform caches the connection state locally.
        </div>
      </div>
    </>
  );
}

/* ───────────── Medical Waste tab ───────────── */

function MedicalWasteTab() {
  const totalKg = medicalWasteCategories.reduce((s, c) => s + c.weight, 0);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <SummaryTile label="Total Medical Waste" value={`${totalKg} kg`} accent="text-slate-800" />
        <SummaryTile label="Sharps"              value="5 kg"            accent="text-red-600" />
        <SummaryTile label="Biohazard"           value="10 kg"           accent="text-red-600" />
        <SummaryTile label="Expired Meds"        value="20 kg"           accent="text-amber-600" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {medicalWasteCategories.map((c) => {
          const st = WASTE_STATUS_BADGE[c.status];
          const hz = HAZARD_BADGE[c.hazardLevel];
          return (
            <div key={c.id} className={`bg-white border rounded-xl p-4 ${
              c.hazardLevel === 'high' ? 'border-red-200' : 'border-slate-200'
            }`}>
              <div className="flex items-start justify-between">
                <span className="text-2xl">{c.icon}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${hz.cls}`}>
                  {hz.label}
                </span>
              </div>
              <div className="mt-3">
                <div className="text-[13px] font-bold text-slate-800">{c.label}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Storage · {c.storage}</div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold text-slate-800">{c.weight}</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">kg</div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${st.cls}`}>
                  {st.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[12px] font-bold text-slate-500 tracking-wider uppercase">
              Medical Waste Actions
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Sharps and biohazard are incinerated on-site. Expired meds are backhauled.
            </div>
          </div>
          <div className="flex gap-2">
            <button className="text-[12px] font-semibold px-3.5 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition">
              + Add Waste
            </button>
            <button className="text-[12px] font-semibold px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition">
              🔥 Log Incineration
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ───────────── Audit tab ───────────── */

function AuditTab() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-[14px] font-bold text-slate-800">Access Audit Log</h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Every medical access is recorded · {medicalAuditLog.length} recent entries
          </p>
        </div>
        <button className="text-[12px] font-semibold px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition">
          ⬇ Export CSV
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wide">
            <tr>
              <th className="text-left px-5 py-3 font-semibold">Time</th>
              <th className="text-left px-5 py-3 font-semibold">User</th>
              <th className="text-left px-5 py-3 font-semibold">Action</th>
              <th className="text-left px-5 py-3 font-semibold">Reason</th>
            </tr>
          </thead>
          <tbody>
            {medicalAuditLog.map((a) => (
              <tr key={a.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-5 py-3 text-slate-600 text-[12px] whitespace-nowrap">{a.at}</td>
                <td className="px-5 py-3 text-slate-700 font-semibold text-[12px]">{a.user}</td>
                <td className="px-5 py-3 text-slate-700 text-[12px]">{a.action}</td>
                <td className="px-5 py-3 text-slate-500 text-[11px]">{a.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 bg-pink-50 border border-pink-200 rounded-lg p-3 text-[11px] text-pink-800 leading-snug flex items-start gap-2.5">
        <span className="text-base shrink-0">🔒</span>
        <div>
          <b>Compliance.</b> Access audit logs are retained for the full expedition
          duration and can be exported for review by NCPOR medical oversight.
        </div>
      </div>
    </>
  );
}

/* ───────────── Emergency Access modal ───────────── */

function EmergencyAccessModal({ onClose }) {
  const [patientId, setPatientId] = useState('');
  const [revealed, setRevealed] = useState(false);

  const patient = patients.find((p) => p.id === patientId.trim().toUpperCase());

  const handleReveal = () => {
    if (patient) setRevealed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg my-6 overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white px-6 py-5 flex items-start justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider opacity-80">
              Emergency Access
            </div>
            <h2 className="text-xl font-bold mt-0.5">Critical Patient Info</h2>
            <p className="text-[11px] opacity-90 mt-1">
              Enter patient ID or scan wristband · access is audit-logged
            </p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white text-2xl leading-none">
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">

          {!revealed ? (
            <>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Patient ID
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    placeholder="e.g. P-045"
                    className="flex-1 text-[13px] font-mono px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                  <button
                    disabled={!patient}
                    onClick={handleReveal}
                    className={`text-[12px] font-bold px-4 py-2.5 rounded-lg transition ${
                      patient
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    🔓 Access
                  </button>
                </div>
                {patientId && !patient && (
                  <div className="text-[11px] text-red-600 mt-1.5">
                    No patient found with ID "{patientId}"
                  </div>
                )}
                {patient && (
                  <div className="text-[11px] text-green-600 mt-1.5">
                    ✓ Found: {patient.name}
                  </div>
                )}
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2.5">
                <span className="text-base shrink-0">⚠️</span>
                <div className="text-[11px] text-red-800 leading-snug">
                  <b>Use only in genuine emergencies.</b> Emergency access reveals critical
                  info and is logged with your user ID and timestamp.
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-base font-bold">
                  {initials(patient.name)}
                </div>
                <div>
                  <div className="text-[14px] font-bold text-slate-800">{patient.name}</div>
                  <div className="text-[11px] text-slate-500">
                    {patient.age} yrs · {patient.role} · {patient.id}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="text-[10px] font-bold text-red-700 uppercase tracking-wider">
                    Blood Group
                  </div>
                  <div className="text-2xl font-bold text-red-700 mt-1">{patient.bloodGroup}</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Emergency Contact
                  </div>
                  <div className="text-[13px] font-mono font-bold text-slate-800 mt-1">
                    {patient.emergencyContact}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Allergies
                </div>
                <div className="text-[13px] text-slate-800">
                  {patient.allergies.length
                    ? patient.allergies.map((a) => (
                        <span key={a} className="inline-block mr-2 px-2 py-0.5 rounded bg-red-100 text-red-700 text-[11px] font-bold">
                          ⚠ {a}
                        </span>
                      ))
                    : 'None known'}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Current Medications
                </div>
                <div className="text-[13px] text-slate-800">
                  {patient.currentMeds.length ? patient.currentMeds.join(', ') : 'None'}
                </div>
              </div>

              <div className="bg-pink-50 border border-pink-200 rounded-lg p-3 text-[11px] text-pink-800 leading-snug flex items-start gap-2.5">
                <span className="text-base shrink-0">🔒</span>
                <div>
                  <b>Audit logged at {new Date().toLocaleTimeString('en-IN')}.</b>
                  Your access has been recorded.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex gap-2 justify-end bg-slate-50">
          <button
            onClick={onClose}
            className="text-[12px] font-semibold px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───────────── helpers ───────────── */

function InfoBox({ label, value, mono, highlight }) {
  return (
    <div className={`rounded-lg p-3 border ${
      highlight ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200'
    }`}>
      <div className={`text-[10px] font-bold uppercase tracking-wider ${
        highlight ? 'text-red-700' : 'text-slate-400'
      }`}>
        {label}
      </div>
      <div className={`text-[13px] font-semibold mt-0.5 ${
        highlight ? 'text-red-700 text-base' : 'text-slate-800'
      } ${mono ? 'font-mono' : ''}`}>
        {value}
      </div>
    </div>
  );
}

function ActionBtn({ icon, label, primary }) {
  return (
    <button
      className={`text-[12px] font-semibold px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 ${
        primary
          ? 'bg-pink-600 text-white hover:bg-pink-700'
          : 'border border-slate-300 text-slate-700 hover:bg-slate-100'
      }`}
    >
      <span>{icon}</span>
      {label}
    </button>
  );
}