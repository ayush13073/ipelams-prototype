// src/pages/station/StationEmergency.jsx
import { useState } from 'react';
import {
  emergencyStatus,
  emergencyResources,
  incidentLog,
  incidentSeverityBadge,
  incidentStatusBadge,
  emergencyProcedures,
  drillLog,
} from '../../data/stationData';

/* ───────────── main ───────────── */

export default function StationEmergency() {
  const [sosOpen, setSosOpen] = useState(false);
  const [sosConfirmed, setSosConfirmed] = useState(false);

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">🚨 Emergency</h1>
          <p className="text-[12px] text-slate-500 mt-0.5">
            Maitri Station · {emergencyStatus.activeAlerts} active alerts · {emergencyStatus.stationMode} mode
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-50 border border-green-200">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[11px] font-bold text-green-700">
              SYSTEMS NORMAL
            </span>
          </div>
        </div>
      </div>

      {/* Hero: SOS + Status */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* SOS Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-24 -mt-24" />
          <div className="absolute bottom-0 right-16 w-40 h-40 bg-white/5 rounded-full -mb-16" />

          <div className="relative">
            <div className="text-[11px] font-bold uppercase tracking-wider opacity-80">
              Emergency Alert
            </div>
            <h2 className="text-2xl font-bold mt-1">SOS — Send Signal to Goa</h2>
            <p className="text-[13px] opacity-90 mt-2 max-w-md">
              Sends an immediate distress alert to Goa HQ. Highest priority — bypasses all queue.
              Include a situation report below before sending.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={() => { setSosOpen(true); setSosConfirmed(false); }}
                className="text-[14px] font-bold px-6 py-3 rounded-xl bg-white text-red-700 hover:bg-red-50 transition shadow-lg flex items-center gap-2"
              >
                🚨 Trigger SOS
              </button>
              <button className="text-[13px] font-semibold px-5 py-3 rounded-xl border border-white/30 hover:bg-white/10 transition">
                📞 Open Radio Channel
              </button>
            </div>

            <div className="mt-5 pt-5 border-t border-white/20 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-[10px] uppercase tracking-wide opacity-80">Active Alerts</div>
                <div className="text-xl font-bold">{emergencyStatus.activeAlerts}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wide opacity-80">Comms</div>
                <div className="text-[12px] font-semibold mt-1">{emergencyStatus.commsStatus}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wide opacity-80">Helipad</div>
                <div className="text-[12px] font-semibold mt-1">{emergencyStatus.helicopterPad}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Station readiness */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Station Readiness
          </div>

          <ul className="mt-4 space-y-3">
            <ReadinessRow icon="🏥" label="Medical team"       value={emergencyStatus.medicalReady ? 'Ready' : 'Alert'}     ok />
            <ReadinessRow icon="📡" label="Comms"              value="Operational"                                            ok />
            <ReadinessRow icon="🚁" label="Helipad"            value={emergencyStatus.helicopterPad}                          ok />
            <ReadinessRow icon="🔦" label="Power (backup)"     value="Diesel generator armed"                                 ok />
            <ReadinessRow icon="🚜" label="Vehicles"           value="2 snowcats · 3 skidoos"                                 ok />
          </ul>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-500">Last drill</span>
              <span className="font-semibold text-slate-700">{emergencyStatus.lastDrill}</span>
            </div>
            <div className="flex justify-between text-[11px] mt-1.5">
              <span className="text-slate-500">Next drill</span>
              <span className="font-semibold text-emerald-600">{emergencyStatus.nextDrill}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Resource locator */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[12px] font-bold text-slate-500 tracking-wider uppercase">
              📍 Resource Locator
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Nearest emergency resources from current location (Station Main)
            </p>
          </div>
          <button className="text-[11px] font-semibold text-blue-600 hover:text-blue-800">
            Open Station Map →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {emergencyResources.map((r) => (
            <div
              key={r.id}
              className="border border-slate-200 rounded-xl p-4 hover:border-emerald-400 hover:shadow-sm transition"
            >
              <div className="flex items-start justify-between">
                <span className="text-2xl">{r.icon}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                  ✓ Ready
                </span>
              </div>
              <div className="mt-3">
                <div className="text-[13px] font-bold text-slate-800">{r.label}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{r.location}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{r.distance}</div>
              </div>
              {(r.quantity || r.capacity || r.channel) && (
                <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-600">
                  {r.quantity || r.capacity || r.channel}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Incident log */}
      <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-[12px] font-bold text-slate-500 tracking-wider uppercase">
              Incident Log
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Last {incidentLog.length} incidents at this station
            </p>
          </div>
          <button className="text-[12px] font-semibold px-3.5 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition">
            + Report Incident
          </button>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wide">
            <tr>
              <th className="text-left px-5 py-3 font-semibold">ID</th>
              <th className="text-left px-5 py-3 font-semibold">Date</th>
              <th className="text-left px-5 py-3 font-semibold">Type</th>
              <th className="text-left px-5 py-3 font-semibold">Severity</th>
              <th className="text-left px-5 py-3 font-semibold">Description</th>
              <th className="text-left px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {incidentLog.map((inc) => {
              const sev = incidentSeverityBadge[inc.severity] || incidentSeverityBadge.Low;
              const st = incidentStatusBadge[inc.status] || incidentStatusBadge.Resolved;
              return (
                <tr key={inc.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-5 py-3 font-mono font-semibold text-slate-800">{inc.id}</td>
                  <td className="px-5 py-3 text-slate-600 text-[12px]">{inc.date}</td>
                  <td className="px-5 py-3 text-slate-700 font-medium text-[12px]">{inc.type}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${sev.cls}`}>
                      {inc.severity}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="text-[12px] text-slate-700">{inc.description}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Reported by {inc.reportedBy} · Resolved in {inc.resolvedIn}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${st.cls}`}>
                      {st.label}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button className="text-[12px] font-semibold text-emerald-700 hover:underline">
                      View →
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* Procedures */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-[12px] font-bold text-slate-500 tracking-wider uppercase">
              Emergency Procedures
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Standard response steps · training reference
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {emergencyProcedures.map((p) => (
            <div key={p.id} className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{p.icon}</span>
                <div className="text-[13px] font-bold text-slate-800">{p.title}</div>
              </div>
              <ol className="space-y-2">
                {p.steps.map((s, i) => (
                  <li key={i} className="flex gap-2.5 text-[11px] text-slate-600 leading-snug">
                    <span className="shrink-0 w-4 h-4 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-[9px]">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* Drill log */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[12px] font-bold text-slate-500 tracking-wider uppercase">
              Drill Log
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Regular readiness exercises · every drill recorded
            </p>
          </div>
          <button className="text-[12px] font-semibold px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition">
            + Log Drill
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead className="text-slate-500 text-[11px] uppercase tracking-wide border-b border-slate-100">
              <tr>
                <th className="text-left py-2 font-semibold">Date</th>
                <th className="text-left py-2 font-semibold">Drill Type</th>
                <th className="text-left py-2 font-semibold">Duration</th>
                <th className="text-left py-2 font-semibold">Participants</th>
                <th className="text-left py-2 font-semibold">Score</th>
              </tr>
            </thead>
            <tbody>
              {drillLog.map((d) => (
                <tr key={d.id} className="border-b border-slate-50 last:border-0">
                  <td className="py-3 text-slate-600 text-[12px]">{d.date}</td>
                  <td className="py-3 text-slate-800 font-medium text-[12px]">{d.type}</td>
                  <td className="py-3 text-slate-600 text-[12px]">{d.duration}</td>
                  <td className="py-3 text-slate-600 text-[12px]">{d.participants}</td>
                  <td className="py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      d.score === 'Excellent' ? 'bg-green-100 text-green-700' :
                      d.score === 'Good'      ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {d.score}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SOS Modal */}
      {sosOpen && (
        <SosModal
          confirmed={sosConfirmed}
          onConfirm={() => setSosConfirmed(true)}
          onClose={() => { setSosOpen(false); setSosConfirmed(false); }}
        />
      )}

    </div>
  );
}

/* ───────────── small components ───────────── */

function ReadinessRow({ icon, label, value, ok }) {
  return (
    <li className="flex items-center justify-between text-[12px]">
      <span className="flex items-center gap-2 text-slate-600">
        <span className="text-base">{icon}</span>
        {label}
      </span>
      <span className={`font-semibold ${ok ? 'text-green-700' : 'text-red-700'}`}>
        {value}
      </span>
    </li>
  );
}

/* ───────────── SOS modal ───────────── */

function SosModal({ confirmed, onConfirm, onClose }) {
  const [situation, setSituation] = useState('');
  const [category, setCategory] = useState('medical');
  const [personnelCount, setPersonnelCount] = useState('');

  const categories = [
    { id: 'medical',    label: 'Medical emergency', icon: '🏥' },
    { id: 'fire',       label: 'Fire',              icon: '🔥' },
    { id: 'missing',    label: 'Missing person',    icon: '🧭' },
    { id: 'weather',    label: 'Severe weather',    icon: '🌪️' },
    { id: 'structural', label: 'Structural damage', icon: '🏚️' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg my-6 overflow-hidden">

        {!confirmed ? (
          <>
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-5 flex items-start justify-between">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider opacity-80">
                  Emergency Alert
                </div>
                <h2 className="text-xl font-bold mt-0.5">Trigger SOS to Goa</h2>
                <p className="text-[11px] opacity-90 mt-1">
                  Highest priority · bypasses all sync queues
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">

              {/* Category */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Emergency Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCategory(c.id)}
                      className={`text-[12px] font-semibold px-3 py-2.5 rounded-lg border transition flex items-center gap-2 ${
                        category === c.id
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <span>{c.icon}</span>
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Situation */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Situation Report
                </label>
                <textarea
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  rows={3}
                  placeholder="Describe the emergency: what, where, who is affected…"
                  className="w-full text-[12px] px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 resize-none"
                />
              </div>

              {/* Personnel */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Personnel affected (optional)
                </label>
                <input
                  type="number"
                  min="0"
                  value={personnelCount}
                  onChange={(e) => setPersonnelCount(e.target.value)}
                  placeholder="Number of people"
                  className="w-full text-[12px] px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </div>

              {/* Warning */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2.5">
                <span className="text-base shrink-0">⚠️</span>
                <div className="text-[11px] text-red-800 leading-snug">
                  <b>This alert will be sent immediately.</b> Goa HQ will be notified
                  and will initiate response protocol. Use only in genuine emergencies.
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex gap-2 justify-end bg-slate-50">
              <button
                onClick={onClose}
                className="text-[12px] font-semibold px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="text-[12px] font-bold px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition shadow"
              >
                🚨 Send SOS Alert
              </button>
            </div>
          </>
        ) : (
          <div className="text-center p-8">
            <div className="w-20 h-20 rounded-full bg-red-100 text-red-600 text-4xl flex items-center justify-center mx-auto mb-5 animate-pulse">
              🚨
            </div>
            <h2 className="text-xl font-bold text-slate-800">
              SOS Alert Queued
            </h2>
            <p className="text-[13px] text-slate-500 mt-2 max-w-sm mx-auto">
              Your alert has been saved locally and marked <b className="text-red-600">Priority 1</b>.
              It will transmit immediately when the satellite link is restored.
            </p>

            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4 text-left">
              <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider mb-1.5">
                What happens next
              </div>
              <ul className="space-y-1.5 text-[11px] text-amber-800">
                <li className="flex gap-2"><span>1.</span> Radio room opens channel to Goa</li>
                <li className="flex gap-2"><span>2.</span> Alert uploads ahead of all other data</li>
                <li className="flex gap-2"><span>3.</span> Goa HQ acknowledges and initiates protocol</li>
                <li className="flex gap-2"><span>4.</span> Continuous updates streamed until resolved</li>
              </ul>
            </div>

            <button
              onClick={onClose}
              className="mt-6 text-[12px] font-bold px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white transition"
            >
              Acknowledge & Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}