// src/pages/station/StationPersonnel.jsx
import { useState, useMemo } from 'react';
import {
  stationPersonnel,
  personnelStatusBadge,
  musteringStatus,
} from '../../data/stationData';

/* ───────────── helpers ───────────── */

function initials(name) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function avatarColor(status) {
  switch (status) {
    case 'on-site':         return 'bg-green-100 text-green-700';
    case 'in-field':        return 'bg-blue-100 text-blue-700';
    case 'overdue-checkin': return 'bg-red-100 text-red-700';
    case 'medical':         return 'bg-pink-100 text-pink-700';
    default:                return 'bg-slate-100 text-slate-600';
  }
}

/* ───────────── main ───────────── */

export default function StationPersonnel() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deptFilter, setDeptFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(null);

  const departments = ['all', ...new Set(stationPersonnel.map((p) => p.department))];

  const filtered = useMemo(() => {
    return stationPersonnel.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.role.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      const matchDept = deptFilter === 'all' || p.department === deptFilter;
      return matchSearch && matchStatus && matchDept;
    });
  }, [search, statusFilter, deptFilter]);

  const counts = {
    all:       stationPersonnel.length,
    'on-site': stationPersonnel.filter((p) => p.status === 'on-site').length,
    'in-field':stationPersonnel.filter((p) => p.status === 'in-field').length,
    overdue:   stationPersonnel.filter((p) => p.status === 'overdue-checkin').length,
  };

  const selected = stationPersonnel.find((p) => p.id === selectedId);

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">👥 Personnel</h1>
          <p className="text-[12px] text-slate-500 mt-0.5">
            Maitri Station · {stationPersonnel.length} tracked · mustering status live
          </p>
        </div>
        <div className="flex gap-2">
          <button className="text-[12px] font-semibold px-3.5 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition">
            ✓ Check-in
          </button>
          <button className="text-[12px] font-semibold px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition">
            ← Check-out
          </button>
          <button className="text-[12px] font-semibold px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition">
            📋 Mustering
          </button>
        </div>
      </div>

      {/* Mustering status card */}
      <MusteringCard />

      {/* Summary tiles */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <SummaryTile label="Total Personnel" value={counts.all}          accent="text-slate-800" />
        <SummaryTile label="On-site"         value={counts['on-site']}   accent="text-green-600" />
        <SummaryTile label="In-field"        value={counts['in-field']}  accent="text-blue-600" />
        <SummaryTile label="Overdue check-in" value={counts.overdue}     accent={counts.overdue > 0 ? 'text-red-600' : 'text-slate-800'} />
      </section>

      {/* Filters */}
      <section className="flex flex-wrap items-center gap-3">

        {/* Status tabs */}
        <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
          {[
            { id: 'all',          label: 'All',       count: counts.all },
            { id: 'on-site',      label: 'On-site',   count: counts['on-site'] },
            { id: 'in-field',     label: 'In-field',  count: counts['in-field'] },
            { id: 'overdue-checkin', label: 'Overdue', count: counts.overdue },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setStatusFilter(t.id)}
              className={`text-[12px] font-semibold px-3 py-1.5 rounded-md transition flex items-center gap-1.5 ${
                statusFilter === t.id
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {t.label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                statusFilter === t.id ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
              }`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* Department filter */}
        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="text-[12px] font-semibold px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-emerald-500"
        >
          {departments.map((d) => (
            <option key={d} value={d}>
              {d === 'all' ? 'All Departments' : d}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search name, role, ID…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ml-auto text-[12px] w-64 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
      </section>

      {/* Personnel table */}
      <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wide">
            <tr>
              <th className="text-left px-5 py-3 font-semibold">Name</th>
              <th className="text-left px-5 py-3 font-semibold">Role</th>
              <th className="text-left px-5 py-3 font-semibold">Location</th>
              <th className="text-left px-5 py-3 font-semibold">Last Update</th>
              <th className="text-left px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-slate-400 text-[12px]">
                  No personnel match your filter.
                </td>
              </tr>
            ) : (
              filtered.map((p) => {
                const st = personnelStatusBadge[p.status];
                const isOverdue = p.status === 'overdue-checkin';
                return (
                  <tr
                    key={p.id}
                    onClick={() => setSelectedId(p.id)}
                    className={`border-t border-slate-100 cursor-pointer transition ${
                      isOverdue ? 'bg-red-50/40 hover:bg-red-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold ${avatarColor(p.status)}`}>
                          {initials(p.name)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800">{p.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{p.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="text-slate-700 text-[12px]">{p.role}</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">{p.department}</div>
                    </td>
                    <td className="px-5 py-3 text-slate-600 text-[12px]">{p.location}</td>
                    <td className="px-5 py-3 text-slate-500 text-[12px]">{p.lastUpdate}</td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${st.cls}`}>
                        {st.label}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span className="text-emerald-700 text-[12px] font-semibold">View →</span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </section>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500"></span> On-site
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span> In-field (camp)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500"></span> Overdue check-in
        </span>
        <span className="ml-auto font-semibold">
          Offline · All check-ins queued for sync
        </span>
      </div>

      {/* Person detail modal */}
      {selected && (
        <PersonModal person={selected} onClose={() => setSelectedId(null)} />
      )}
    </div>
  );
}

/* ───────────── mustering card ───────────── */

function MusteringCard() {
  const { total, accounted, overdue, inField, onSite, lastMuster, nextMuster } = musteringStatus;

  return (
    <section className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
            📋
          </div>
          <div>
            <div className="text-lg font-bold">Mustering Status</div>
            <div className="text-[12px] opacity-90 mt-0.5">
              Last muster · {lastMuster} · Next · {nextMuster}
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="text-right">
            <div className="text-[10px] opacity-80 uppercase tracking-wide">Accounted</div>
            <div className="text-2xl font-bold">
              {accounted} / {total}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] opacity-80 uppercase tracking-wide">On-site</div>
            <div className="text-2xl font-bold">{onSite}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] opacity-80 uppercase tracking-wide">In-field</div>
            <div className="text-2xl font-bold">{inField}</div>
          </div>
          {overdue > 0 && (
            <div className="text-right border-l-2 border-white/30 pl-6">
              <div className="text-[10px] opacity-80 uppercase tracking-wide">Overdue</div>
              <div className="text-2xl font-bold text-amber-200">{overdue}</div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/20 flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
        <div className="text-[11px] opacity-95">
          {accounted === total
            ? '✅ All personnel accounted for. No action required.'
            : `⚠ ${overdue} person(s) overdue check-in. Verify before next muster.`}
        </div>
      </div>
    </section>
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

/* ───────────── person detail modal ───────────── */

function PersonModal({ person, onClose }) {
  const p = person;
  const st = personnelStatusBadge[p.status];

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
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-base font-bold ${avatarColor(p.status)}`}>
              {initials(p.name)}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">{p.name}</h2>
              <div className="text-[12px] text-slate-500 mt-0.5">
                {p.role} · {p.department}
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
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">

          {/* Basic info grid */}
          <div className="grid grid-cols-2 gap-4">
            <InfoBox label="Current location" value={p.location} />
            <InfoBox label="Last update"      value={p.lastUpdate} />
            <InfoBox label="Blood group"      value={p.bloodGroup} />
            <InfoBox label="Emergency contact" value={p.emergencyContact} mono />
          </div>

          {/* Movement log */}
          <div>
            <SectionTitle icon="🧭" title="Movement Log" />
            <ol className="mt-3 relative border-l-2 border-slate-200 ml-2 space-y-4">
              {p.movement.map((m, i) => (
                <li key={i} className="ml-5">
                  <span className={`absolute -left-[7px] w-3.5 h-3.5 rounded-full border-2 border-white shadow ${
                    i === p.movement.length - 1 ? 'bg-emerald-500 ring-4 ring-emerald-100' : 'bg-slate-400'
                  }`} />
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="text-[13px] font-semibold text-slate-800">
                      📍 {m.at}
                    </div>
                    <div className="text-[11px] text-slate-400 whitespace-nowrap">{m.when}</div>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{m.event}</div>
                </li>
              ))}
            </ol>
          </div>

          {/* Training + gear side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <SectionTitle icon="🎓" title="Training" />
              <ul className="mt-3 space-y-1.5">
                {p.training.map((t) => (
                  <li key={t} className="text-[12px] text-slate-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionTitle icon="🎒" title="Gear Issued" />
              <ul className="mt-3 space-y-1.5">
                {p.gear.map((g) => (
                  <li key={g} className="text-[12px] text-slate-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Offline notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2.5">
            <span className="text-base shrink-0">📡</span>
            <div className="text-[11px] text-amber-800 leading-snug">
              <b>Data is local.</b> Check-ins, gear changes, and movement logs will sync
              to Goa when link is restored.
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-slate-100 flex flex-wrap gap-2 justify-end bg-slate-50 rounded-b-2xl">
          <ActionBtn icon="✓" label="Check-in"  primary />
          <ActionBtn icon="📡" label="Send Message" />
          <ActionBtn icon="🎒" label="Update Gear"  />
        </div>
      </div>
    </div>
  );
}

function InfoBox({ label, value, mono }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
        {label}
      </div>
      <div className={`text-[13px] font-semibold text-slate-800 mt-0.5 ${mono ? 'font-mono' : ''}`}>
        {value}
      </div>
    </div>
  );
}

function SectionTitle({ icon, title }) {
  return (
    <div className="flex items-center gap-2 text-[12px] font-bold text-slate-500 tracking-wider uppercase">
      <span>{icon}</span> {title}
    </div>
  );
}

function ActionBtn({ icon, label, primary }) {
  return (
    <button
      className={`text-[12px] font-semibold px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 ${
        primary
          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
          : 'border border-slate-300 text-slate-700 hover:bg-slate-100'
      }`}
    >
      <span>{icon}</span>
      {label}
    </button>
  );
}