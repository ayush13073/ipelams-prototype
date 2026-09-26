// src/pages/station/StationCargo.jsx
import { useState, useMemo } from 'react';
import { incomingShipments, containerItems, stationShelves } from '../../data/stationData';

/* ───────────── helpers ───────────── */

const STATUS_PILL = {
  received:    { cls: 'bg-green-100 text-green-700',   label: '✅ Received' },
  pending:     { cls: 'bg-amber-100 text-amber-700',   label: '⏳ Awaiting Receipt' },
  'in-transit':{ cls: 'bg-blue-100 text-blue-700',     label: '🚢 In Transit' },
};

const PRIORITY_PILL = {
  urgent: 'bg-red-100 text-red-700',
  high:   'bg-orange-100 text-orange-700',
  normal: 'bg-slate-100 text-slate-600',
};

/* ───────────── main ───────────── */

export default function StationCargo() {
  const [activeShipmentId, setActiveShipmentId] = useState(null);

  const activeShipment = incomingShipments.find((s) => s.id === activeShipmentId);

  return (
    <div className="p-6">
      {activeShipment ? (
        <ReceivingWizard
          shipment={activeShipment}
          onDone={() => setActiveShipmentId(null)}
        />
      ) : (
        <ListView onSelect={setActiveShipmentId} />
      )}
    </div>
  );
}

/* ───────────── list view ───────────── */

function ListView({ onSelect }) {
  const stats = useMemo(() => {
    const pending = incomingShipments.filter((s) => s.status === 'pending').length;
    const arrived = incomingShipments.filter((s) => s.status === 'received').length;
    const transit = incomingShipments.filter((s) => s.status === 'in-transit').length;
    return { pending, arrived, transit };
  }, []);

  return (
    <>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div>
          <h1 className="text-xl font-bold text-slate-800">📦 Cargo Receiving</h1>
          <p className="text-[12px] text-slate-500 mt-0.5">
            Scan container → items → assign shelf → confirm. Works offline.
          </p>
        </div>
        <button className="text-[12px] font-semibold px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition">
          📷 Scan Container QR
        </button>
      </div>

      {/* Summary tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <MiniStat label="Total Incoming" value={incomingShipments.length} />
        <MiniStat label="Awaiting Receipt" value={stats.pending} accent="text-amber-600" />
        <MiniStat label="Already Received" value={stats.arrived} accent="text-green-600" />
        <MiniStat label="In Transit"       value={stats.transit} accent="text-blue-600" />
      </div>

      {/* Incoming list */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/60">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Incoming Shipments
          </div>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wide">
            <tr>
              <th className="text-left px-5 py-3 font-semibold">Shipment</th>
              <th className="text-left px-5 py-3 font-semibold">Contents</th>
              <th className="text-left px-5 py-3 font-semibold">Items</th>
              <th className="text-left px-5 py-3 font-semibold">Weight</th>
              <th className="text-left px-5 py-3 font-semibold">Priority</th>
              <th className="text-left px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {incomingShipments.map((s) => {
              const st = STATUS_PILL[s.status];
              const canReceive = s.status === 'pending';
              return (
                <tr
                  key={s.id}
                  className={`border-t border-slate-100 transition ${
                    s.priority === 'urgent' && canReceive
                      ? 'bg-red-50/40 hover:bg-red-50'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="px-5 py-3">
                    <div className="font-mono font-semibold text-slate-800">{s.id}</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {s.container || '—'}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-700">{s.item}</td>
                  <td className="px-5 py-3 text-slate-600">{s.itemsCount}</td>
                  <td className="px-5 py-3 text-slate-600">{s.weight}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${PRIORITY_PILL[s.priority]}`}>
                      {s.priority}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${st.cls}`}>
                      {st.label}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    {canReceive ? (
                      <button
                        onClick={() => onSelect(s.id)}
                        className="text-[12px] font-bold text-emerald-700 hover:text-emerald-900 hover:underline"
                      >
                        Receive →
                      </button>
                    ) : (
                      <span className="text-[12px] text-slate-400">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-[11px] text-slate-500 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
        All receiving actions are saved locally. Data will sync to Goa when link is available.
      </div>
    </>
  );
}

function MiniStat({ label, value, accent = 'text-slate-800' }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg px-4 py-3">
      <div className={`text-xl font-bold ${accent}`}>{value}</div>
      <div className="text-[11px] text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}

/* ───────────── wizard ───────────── */

function ReceivingWizard({ shipment, onDone }) {
  const items = containerItems[shipment.id] || [];

  // Wizard state
  const [step, setStep] = useState(1);
  const [containerScanned, setContainerScanned] = useState(false);
  const [scannedItemIds, setScannedItemIds] = useState([]);
  const [shelf, setShelf] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const totalItems = items.length;
  const scannedCount = scannedItemIds.length;
  const allScanned = scannedCount === totalItems;

  /* scan next unsanned item */
  const scanNextItem = () => {
    const next = items.find((it) => !scannedItemIds.includes(it.id));
    if (next) setScannedItemIds((prev) => [...prev, next.id]);
  };

  const scanAllRemaining = () => {
    setScannedItemIds(items.map((it) => it.id));
  };

  const reset = () => {
    setStep(1);
    setContainerScanned(false);
    setScannedItemIds([]);
    setShelf('');
    setConfirmed(false);
  };

  return (
    <>
      {/* Back + header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <button
            onClick={onDone}
            className="text-[12px] font-semibold text-blue-600 hover:text-blue-800 mb-1"
          >
            ← Back to incoming
          </button>
          <h1 className="text-xl font-bold text-slate-800">
            📦 Receiving · {shipment.id}
          </h1>
          <p className="text-[12px] text-slate-500 mt-0.5">
            {shipment.item} · {totalItems} items · {shipment.weight}
          </p>
        </div>
        <button
          onClick={() => { reset(); onDone(); }}
          className="text-[11px] text-slate-400 hover:text-red-600"
        >
          Cancel receiving
        </button>
      </div>

      {/* Step indicator */}
      <StepIndicator current={step} confirmed={confirmed} />

      {/* STEP 1 — scan container */}
      {step === 1 && (
        <StepCard
          stepNum={1}
          title="Scan Container"
          description="Scan the QR code on the shipping container to pull up its manifest."
        >
          {!containerScanned ? (
            <div className="flex flex-col items-center gap-4 py-6">
              <ScanBox label="Point scanner at container QR" />
              <button
                onClick={() => setContainerScanned(true)}
                className="text-[12px] font-bold px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition"
              >
                📷 Simulate Scan
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-300 rounded-lg p-4">
                <div className="text-[12px] font-bold text-green-800 mb-2">
                  ✅ Container scanned
                </div>
                <div className="grid grid-cols-2 gap-3 text-[12px]">
                  <Meta label="Container" value={shipment.container} mono />
                  <Meta label="Contents"  value={shipment.item} />
                  <Meta label="Items"     value={`${totalItems} items`} />
                  <Meta label="Weight"    value={shipment.weight} />
                </div>
              </div>
              <StepNext onClick={() => setStep(2)} />
            </div>
          )}
        </StepCard>
      )}

      {/* STEP 2 — scan items */}
      {step === 2 && (
        <StepCard
          stepNum={2}
          title="Scan Each Item"
          description={`Scan every item inside the container. ${scannedCount} of ${totalItems} scanned.`}
        >
          {/* progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-semibold text-slate-700">
                Progress
              </span>
              <span className="text-[12px] font-bold text-slate-800">
                {scannedCount} / {totalItems}
              </span>
            </div>
            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  allScanned ? 'bg-green-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${(scannedCount / totalItems) * 100}%` }}
              />
            </div>
          </div>

          {/* scan buttons */}
          {!allScanned && (
            <div className="flex gap-2 mb-4">
              <button
                onClick={scanNextItem}
                className="text-[12px] font-bold px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition"
              >
                📷 Scan Next Item
              </button>
              <button
                onClick={scanAllRemaining}
                className="text-[12px] font-semibold px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
              >
                Scan All Remaining
              </button>
            </div>
          )}

          {/* items list */}
          <div className="border border-slate-200 rounded-lg overflow-hidden max-h-80 overflow-y-auto">
            {items.map((it) => {
              const isScanned = scannedItemIds.includes(it.id);
              return (
                <div
                  key={it.id}
                  className={`flex items-center justify-between px-4 py-2.5 border-b border-slate-100 last:border-0 transition ${
                    isScanned ? 'bg-green-50/40' : 'bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isScanned ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {isScanned ? '✓' : ''}
                    </span>
                    <div>
                      <div className="text-[12px] font-semibold text-slate-800">
                        {it.name}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">{it.id}</div>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-500">{it.weight}</span>
                </div>
              );
            })}
          </div>

          {allScanned && (
            <div className="mt-4 bg-green-50 border border-green-300 rounded-lg p-3 flex items-center gap-3">
              <span className="text-xl">✅</span>
              <div className="text-[12px] text-green-800">
                <b>All {totalItems} items accounted for</b>
                <div className="text-[11px] text-green-700 mt-0.5">
                  No discrepancies against the manifest.
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="text-[12px] font-semibold text-slate-500 hover:text-slate-700"
            >
              ← Back
            </button>
            <button
              disabled={!allScanned}
              onClick={() => setStep(3)}
              className={`text-[12px] font-bold px-4 py-2 rounded-lg transition ${
                allScanned
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Continue →
            </button>
          </div>
        </StepCard>
      )}

      {/* STEP 3 — assign shelf */}
      {step === 3 && (
        <StepCard
          stepNum={3}
          title="Assign Shelf Location"
          description="Choose where these items will be stored. FEFO priority is applied automatically based on expiry."
        >
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Shelf
              </label>
              <select
                value={shelf}
                onChange={(e) => setShelf(e.target.value)}
                className="w-full text-[13px] px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="">— Select shelf —</option>
                {stationShelves.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {shelf && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <div className="text-[12px] font-bold text-emerald-800 mb-1.5">
                  📍 Confirmation
                </div>
                <div className="text-[12px] text-emerald-900">
                  All <b>{totalItems} items</b> will be placed at <b>{shelf}</b>.
                </div>
                <div className="text-[11px] text-emerald-700 mt-1.5">
                  Stock level will be updated locally and queued for sync.
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="text-[12px] font-semibold text-slate-500 hover:text-slate-700"
              >
                ← Back
              </button>
              <button
                disabled={!shelf}
                onClick={() => setStep(4)}
                className={`text-[12px] font-bold px-4 py-2 rounded-lg transition ${
                  shelf
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Continue →
              </button>
            </div>
          </div>
        </StepCard>
      )}

      {/* STEP 4 — confirm */}
      {step === 4 && (
        <StepCard
          stepNum={4}
          title="Confirm Placement"
          description="Review and confirm. Placement will be saved locally and queued for sync."
        >
          {!confirmed ? (
            <>
              <div className="space-y-3">
                <ReviewRow label="Container"      value={shipment.container} mono />
                <ReviewRow label="Contents"       value={shipment.item} />
                <ReviewRow label="Items Scanned"  value={`${totalItems} / ${totalItems}`} />
                <ReviewRow label="Shelf Assigned" value={shelf} />
                <ReviewRow label="Total Weight"   value={shipment.weight} />
                <ReviewRow label="Destination"    value="Maitri Station" />
              </div>

              <div className="mt-5 flex items-center justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="text-[12px] font-semibold text-slate-500 hover:text-slate-700"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setConfirmed(true)}
                  className="text-[12px] font-bold px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition"
                >
                  ✅ Confirm Placement
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 text-3xl flex items-center justify-center mx-auto mb-4">
                ✓
              </div>
              <div className="text-lg font-bold text-slate-800 mb-1">
                Items Placed on {shelf}
              </div>
              <div className="text-[12px] text-slate-500 mb-5">
                Inventory updated · Status set to In Stock
              </div>

              <div className="inline-flex items-center gap-3 px-4 py-3 rounded-lg bg-amber-50 border border-amber-300">
                <span className="text-lg">⏳</span>
                <div className="text-left">
                  <div className="text-[12px] font-bold text-amber-800">
                    Pending sync
                  </div>
                  <div className="text-[11px] text-amber-700">
                    Will upload to Goa when link is restored
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  onClick={onDone}
                  className="text-[12px] font-bold px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition"
                >
                  Done — Back to Incoming
                </button>
                <button
                  onClick={reset}
                  className="text-[12px] font-semibold px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
                >
                  Receive Another
                </button>
              </div>
            </div>
          )}
        </StepCard>
      )}
    </>
  );
}

/* ───────────── wizard sub-components ───────────── */

function StepIndicator({ current, confirmed }) {
  const steps = [
    { n: 1, label: 'Scan Container' },
    { n: 2, label: 'Scan Items'     },
    { n: 3, label: 'Assign Shelf'   },
    { n: 4, label: 'Confirm'        },
  ];

  return (
    <div className="mb-5 flex items-center">
      {steps.map((s, i) => {
        const isDone = confirmed || current > s.n;
        const isActive = current === s.n && !confirmed;
        return (
          <div key={s.n} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition ${
                  isDone
                    ? 'bg-green-500 text-white'
                    : isActive
                    ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {isDone ? '✓' : s.n}
              </div>
              <span
                className={`text-[12px] font-semibold whitespace-nowrap ${
                  isDone || isActive ? 'text-slate-800' : 'text-slate-400'
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-3 rounded-full ${
                  isDone ? 'bg-green-400' : 'bg-slate-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function StepCard({ stepNum, title, description, children }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="mb-5">
        <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
          Step {stepNum}
        </div>
        <h2 className="text-lg font-bold text-slate-800 mt-1">{title}</h2>
        <p className="text-[12px] text-slate-500 mt-1">{description}</p>
      </div>
      {children}
    </div>
  );
}

function ScanBox({ label }) {
  return (
    <div className="relative w-full max-w-md bg-slate-900 rounded-xl aspect-video flex items-center justify-center overflow-hidden">
      <div className="absolute inset-8 border-2 border-white/20 rounded-lg" />
      <div className="absolute top-8 left-8 w-6 h-6 border-t-4 border-l-4 border-emerald-400 rounded-tl" />
      <div className="absolute top-8 right-8 w-6 h-6 border-t-4 border-r-4 border-emerald-400 rounded-tr" />
      <div className="absolute bottom-8 left-8 w-6 h-6 border-b-4 border-l-4 border-emerald-400 rounded-bl" />
      <div className="absolute bottom-8 right-8 w-6 h-6 border-b-4 border-r-4 border-emerald-400 rounded-br" />
      <div className="text-white/60 text-[12px] text-center px-4">{label}</div>
    </div>
  );
}

function Meta({ label, value, mono }) {
  return (
    <div>
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
        {label}
      </div>
      <div className={`text-[12px] font-semibold text-slate-800 mt-0.5 ${mono ? 'font-mono' : ''}`}>
        {value}
      </div>
    </div>
  );
}

function StepNext({ onClick }) {
  return (
    <div className="flex justify-end">
      <button
        onClick={onClick}
        className="text-[12px] font-bold px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition"
      >
        Continue →
      </button>
    </div>
  );
}

function ReviewRow({ label, value, mono }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
      <span className="text-[12px] text-slate-500">{label}</span>
      <span className={`text-[13px] font-semibold text-slate-800 ${mono ? 'font-mono' : ''}`}>
        {value}
      </span>
    </div>
  );
}