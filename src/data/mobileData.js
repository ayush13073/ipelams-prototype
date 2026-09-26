// src/data/mobileData.js

/* ───────────── LOGISTICS ───────────── */

export const logisticsUser = {
  name: 'Rajesh Kumar',
  id: 'LOG-001',
  role: 'Logistics Officer',
  location: 'Goa Warehouse',
  shift: 'Morning · 06:00–14:00',
  avatar: 'RK',
  phone: '+91-XXXX-1001',
};

export const logisticsToday = {
  itemsScanned: 24,
  containers: 8,
  transfers: 12,
  pending: 2,
};

export const logisticsRecentScans = [
  { id: 'SHP-2024-001', name: 'Ice Core Drill',  when: '10:45 AM', status: 'pending', dest: 'Maitri' },
  { id: 'SHP-2024-002', name: 'Frozen Food',     when: '10:42 AM', status: 'synced',  dest: 'Bharati' },
  { id: 'SHP-2024-003', name: 'Batteries',       when: '10:38 AM', status: 'synced',  dest: 'Himadri' },
  { id: 'SHP-2024-004', name: 'Medical Supplies',when: '10:22 AM', status: 'pending', dest: 'Bharati' },
];

/* ───────────── STATION ───────────── */

export const stationUser = {
  name: 'Rahul Sharma',
  id: 'STF-1024',
  role: 'Station Staff',
  location: 'Maitri Station',
  shift: 'Day · 08:00–20:00',
  avatar: 'RS',
};

export const stationToday = {
  insideStation: 31,
  outside: 7,
  containers: 3,
  openedToday: 5,
};

export const stationPersonnel = [
  {
    id: 'STF-1024', name: 'Rahul Sharma', role: 'Station Staff',
    status: 'inside', location: 'Warehouse B',
    entryTime: '09:42', entryGate: 'Gate A',
    movement: [
      { at: '09:42', event: 'Gate A → Station' },
      { at: '10:03', event: 'Station → Warehouse A' },
      { at: '10:28', event: 'Warehouse A → Warehouse B' },
      { at: '11:14', event: 'Warehouse B → Gate C' },
      { at: '11:38', event: 'Gate C → Warehouse B' },
    ],
    activity: [
      { icon: '📦', text: 'Loaded container CNT-2048', time: '10:45' },
      { icon: '📦', text: 'Opened container CNT-2051', time: '11:20' },
      { icon: '💊', text: 'Medical kit MK-102 issued', time: '12:05' },
    ],
  },
  {
    id: 'STF-1025', name: 'Anjali Verma', role: 'Engineer',
    status: 'outside', location: 'Yard · Zone 2',
    entryTime: '08:15', entryGate: 'Gate B',
    movement: [
      { at: '08:15', event: 'Gate B → Station' },
      { at: '09:30', event: 'Station → Workshop' },
      { at: '11:00', event: 'Workshop → Yard Zone 2' },
    ],
    activity: [
      { icon: '🔧', text: 'Repaired generator GEN-03', time: '10:15' },
    ],
  },
  {
    id: 'STF-1026', name: 'Vikram Singh', role: 'Scientist',
    status: 'outside', location: 'Camp 2 (8 km)',
    entryTime: '—', entryGate: '—',
    movement: [
      { at: '06:00', event: 'Station → Camp 2' },
      { at: '07:30', event: 'Arrived at Camp 2' },
    ],
    activity: [
      { icon: '🧪', text: 'Sample collection started', time: '08:00' },
    ],
  },
  {
    id: 'STF-1027', name: 'Meera Nair', role: 'Cook',
    status: 'inside', location: 'Kitchen',
    entryTime: '06:30', entryGate: 'Gate A',
    movement: [
      { at: '06:30', event: 'Gate A → Station' },
      { at: '06:45', event: 'Station → Kitchen' },
    ],
    activity: [
      { icon: '🍱', text: 'Breakfast service completed', time: '08:00' },
    ],
  },
  {
    id: 'STF-1028', name: 'Dr. Priya', role: 'Medical Officer',
    status: 'inside', location: 'Med Room',
    entryTime: '08:00', entryGate: 'Gate A',
    movement: [
      { at: '08:00', event: 'Gate A → Station' },
      { at: '08:10', event: 'Station → Med Room' },
    ],
    activity: [
      { icon: '🏥', text: 'Patient P-045 consult', time: '09:30' },
    ],
  },
  {
    id: 'STF-1029', name: 'Suresh Iyer', role: 'Technician',
    status: 'overdue', location: 'Yard · last seen 11h ago',
    entryTime: '07:20', entryGate: 'Gate B',
    movement: [
      { at: '07:20', event: 'Gate B → Station' },
      { at: '09:15', event: 'Station → Yard' },
    ],
    activity: [],
  },
];

export const stationContainers = [
  { id: 'CNT-2048', status: 'loaded',   item: 'Spare Parts',    weight: '245 kg', loadedAt: '10:45', by: 'Rahul Sharma', shelf: 'Store B · 2' },
  { id: 'CNT-2051', status: 'opened',   item: 'Medical Kit',    weight: '32 kg',  loadedAt: '11:20', by: 'Rahul Sharma', shelf: 'Med Room · 1' },
  { id: 'CNT-2052', status: 'in-transit',item: 'Frozen Food',   weight: '450 kg', loadedAt: 'Yesterday', by: 'Dr. Sharma', shelf: '—' },
  { id: 'CNT-2049', status: 'loaded',   item: 'Batteries',      weight: '120 kg', loadedAt: '09:15', by: 'Anjali Verma', shelf: 'Store B · 1' },
];

export const openedItems = [
  { id: 'ITM-3001', name: 'Frozen Food (Mixed)',  openedAt: '15 Nov', openLifeDays: 7,  daysLeft: 2,  status: 'critical', by: 'Meera Nair' },
  { id: 'ITM-3005', name: 'Canned Vegetables',    openedAt: '10 Nov', openLifeDays: 30, daysLeft: 18, status: 'warning',  by: 'Meera Nair' },
  { id: 'ITM-3002', name: 'Medical Kit · Paracetamol', openedAt: '18 Nov', openLifeDays: 30, daysLeft: 22, status: 'ok', by: 'Dr. Priya' },
];

/* ───────────── MEDICAL ───────────── */

export const medicalUser = {
  name: 'Dr. Priya',
  id: 'MED-001',
  role: 'Medical Officer',
  location: 'Maitri Station',
  shift: 'On-call',
  avatar: 'DP',
};

export const medicalToday = {
  activePatients: 2,
  pendingConsults: 1,
  medicines: 48,
  equipment: 12,
};

export const medicines = [
  {
    id: 'MED-PCM-2048', name: 'Paracetamol 500mg',
    type: 'Analgesic', batch: 'PCM-2048',
    quantity: 100, unit: 'tablets',
    location: 'Medical Store · Shelf 2',
    expiry: 'Jun 2026', expiryDays: 245,
    opened: '18 Sep 2026', openLifeDays: 30, daysLeft: 10,
    openedBy: 'Dr. Sharma',
    status: 'opened',
  },
  {
    id: 'MED-AMX-0419', name: 'Amoxicillin 250mg',
    type: 'Antibiotic', batch: 'AMX-0419',
    quantity: 60, unit: 'capsules',
    location: 'Medical Store · Shelf 1',
    expiry: 'Mar 2026', expiryDays: 155,
    opened: null, openLifeDays: null, daysLeft: null,
    status: 'sealed',
  },
  {
    id: 'MED-INS-0221', name: 'Insulin (cold chain)',
    type: 'Hormone', batch: 'INS-0221',
    quantity: 12, unit: 'vials',
    location: 'Vaccine Fridge · 4°C',
    expiry: 'Apr 2026', expiryDays: 180,
    opened: '10 Nov 2026', openLifeDays: 28, daysLeft: 14,
    openedBy: 'Dr. Priya',
    status: 'opened',
  },
  {
    id: 'MED-MOR-0009', name: 'Morphine 10mg',
    type: 'Controlled', batch: 'MOR-0009',
    quantity: 8, unit: 'ampoules',
    location: 'Secure Store · Locked',
    expiry: 'Dec 2026', expiryDays: 410,
    opened: null, openLifeDays: null, daysLeft: null,
    status: 'controlled',
  },
  {
    id: 'MED-PCM-1980', name: 'Paracetamol 500mg (older batch)',
    type: 'Analgesic', batch: 'PCM-1980',
    quantity: 40, unit: 'tablets',
    location: 'Medical Store · Shelf 2',
    expiry: 'Jan 2026', expiryDays: 95,
    opened: '20 Aug 2026', openLifeDays: 30, daysLeft: -12,
    openedBy: 'Dr. Verma',
    status: 'expired',
  },
];

export const medicalEquipment = [
  {
    id: 'EQ-0042', name: 'Portable Oxygen Concentrator',
    status: 'available', location: 'Medical Bay',
    lastInspection: '20 Sep 2026', nextInspection: '20 Dec 2026',
    usageHours: 42, maintenance: 'None',
  },
  {
    id: 'EQ-0058', name: 'Defibrillator',
    status: 'in-use', location: 'Med Room · Bed 1',
    lastInspection: '15 Oct 2026', nextInspection: '15 Jan 2027',
    usageHours: 8, maintenance: 'Battery replaced 10 Nov',
  },
  {
    id: 'EQ-0063', name: 'Ultrasound Scanner',
    status: 'available', location: 'Med Room · Cabinet',
    lastInspection: '01 Oct 2026', nextInspection: '01 Jan 2027',
    usageHours: 120, maintenance: 'Calibration due',
  },
  {
    id: 'EQ-0071', name: 'Ventilator',
    status: 'maintenance', location: 'Workshop',
    lastInspection: '10 Nov 2026', nextInspection: '10 Feb 2027',
    usageHours: 340, maintenance: 'Valve replacement in progress',
  },
];

/* ───────────── SHARED ───────────── */

export const syncQueue = [
  { priority: 1, type: 'Emergency alerts',  count: 0,   sla: 'Immediate',   cls: 'red' },
  { priority: 2, type: 'Medical data',      count: 3,   sla: '< 1 hour',    cls: 'pink' },
  { priority: 3, type: 'Waste records',     count: 12,  sla: '< 6 hours',   cls: 'amber' },
  { priority: 4, type: 'Inventory changes', count: 180, sla: '< 24 hours',  cls: 'blue' },
  { priority: 5, type: 'Routine logs',      count: 52,  sla: 'Best effort', cls: 'slate' },
];