// src/data/stationData.js

export const currentStation = {
  name: 'Maitri',
  code: 'MAI',
  manager: 'Dr. Sharma',
  personnel: 38,
  latitude: '-70.76°S',
  longitude: '11.83°E',
  offline: true,
  lastSync: '3 days ago',
  pendingRecords: 247,
  uptime: '94.20%',
  temperature: '-18°C',
  windSpeed: '24 km/h',
  daylight: '18h 12m',
};

export const inventorySnapshot = [
  { label: 'Food',     daysLeft: 45,  totalDays: 120, cls: 'amber' },
  { label: 'Fuel',     daysLeft: 60,  totalDays: 120, cls: 'green' },
  { label: 'Medical',  daysLeft: 90,  totalDays: 120, cls: 'green' },
  { label: 'Spares',   daysLeft: 120, totalDays: 120, cls: 'green' },
];

export const stationAlerts = [
  { id: 1, level: 'red',    title: '8 items expiring',        detail: 'Within 30 days · Store A' },
  { id: 2, level: 'amber',  title: '3 items below reorder',   detail: 'Coffee, Propane, Fresh veg' },
  { id: 3, level: 'amber',  title: 'Waste storage 85%',       detail: 'Schedule incineration soon' },
  { id: 4, level: 'green',  title: 'All personnel accounted', detail: 'Mustering complete · 38/38' },
];

export const todayMovements = [
  { id: 1, icon: '👥', text: '3 personnel checked in',      time: '09:12 IST' },
  { id: 2, icon: '📦', text: '5 items issued to scientists', time: '10:40 IST' },
  { id: 3, icon: '🗑️', text: '2 waste records created',      time: '11:05 IST' },
  { id: 4, icon: '📷', text: '12 scans saved locally',       time: '13:22 IST' },
];

export const stationQuickStats = {
  personnel: 38,
  inventoryItems: 1245,
  incidents: 0,
  expiringSoon: 8,
  lowStock: 3,
};

// src/data/stationData.js  → add at bottom

export const incomingShipments = [
  {
    id: 'SHP-001',
    item: 'Ice Core Drill Spare Parts',
    itemsCount: 12,
    eta: 'Arrived',
    status: 'received',
    container: 'CNT-2024-001',
    weight: '245 kg',
    priority: 'normal',
  },
  {
    id: 'SHP-004',
    item: 'Scientific Instruments',
    itemsCount: 8,
    eta: 'Arrived',
    status: 'pending',
    container: 'CNT-2024-004',
    weight: '180 kg',
    priority: 'normal',
  },
  {
    id: 'SHP-006',
    item: 'Medical Supplies (Urgent)',
    itemsCount: 4,
    eta: 'Arrived',
    status: 'pending',
    container: 'CNT-2024-006',
    weight: '32 kg',
    priority: 'urgent',
  },
  {
    id: 'SHP-007',
    item: 'Fresh Vegetables',
    itemsCount: 6,
    eta: 'Arrived',
    status: 'pending',
    container: 'CNT-2024-007',
    weight: '45 kg',
    priority: 'high',
  },
  {
    id: 'SHP-009',
    item: 'Replacement Batteries',
    itemsCount: 15,
    eta: 'in 2 days',
    status: 'in-transit',
    container: null,
    weight: '120 kg',
    priority: 'normal',
  },
];

// Items inside a container — used in step 2 of receiving
export const containerItems = {
  'SHP-001': [
    { id: 'ITM-001', name: 'Ice Drill Bit',       weight: '12 kg', shelf: null },
    { id: 'ITM-002', name: 'Drill Motor',         weight: '28 kg', shelf: null },
    { id: 'ITM-003', name: 'Control Panel',       weight: '8 kg',  shelf: null },
    { id: 'ITM-004', name: 'Spare Coupling',      weight: '5 kg',  shelf: null },
    { id: 'ITM-005', name: 'Cable Spool',         weight: '15 kg', shelf: null },
    { id: 'ITM-006', name: 'Lubricant Can',       weight: '6 kg',  shelf: null },
    { id: 'ITM-007', name: 'Tool Set',            weight: '22 kg', shelf: null },
    { id: 'ITM-008', name: 'Sensor Kit',          weight: '4 kg',  shelf: null },
    { id: 'ITM-009', name: 'Spare Seals (box)',   weight: '3 kg',  shelf: null },
    { id: 'ITM-010', name: 'Hydraulic Fluid',     weight: '18 kg', shelf: null },
    { id: 'ITM-011', name: 'Coolant',             weight: '10 kg', shelf: null },
    { id: 'ITM-012', name: 'Manuals & Docs',      weight: '2 kg',  shelf: null },
  ],
  'SHP-004': [
    { id: 'ITM-101', name: 'Spectrometer',        weight: '22 kg', shelf: null },
    { id: 'ITM-102', name: 'Data Logger',         weight: '6 kg',  shelf: null },
    { id: 'ITM-103', name: 'Sample Containers',   weight: '14 kg', shelf: null },
    { id: 'ITM-104', name: 'Seismic Sensors',     weight: '18 kg', shelf: null },
    { id: 'ITM-105', name: 'Calibration Kit',     weight: '9 kg',  shelf: null },
    { id: 'ITM-106', name: 'Power Adapter Set',   weight: '5 kg',  shelf: null },
    { id: 'ITM-107', name: 'Tripod Stands',       weight: '24 kg', shelf: null },
    { id: 'ITM-108', name: 'Cable Set',           weight: '12 kg', shelf: null },
  ],
  'SHP-006': [
    { id: 'ITM-201', name: 'Insulin (cold chain)',    weight: '2 kg', shelf: null },
    { id: 'ITM-202', name: 'Antibiotics',             weight: '4 kg', shelf: null },
    { id: 'ITM-203', name: 'Painkillers',             weight: '3 kg', shelf: null },
    { id: 'ITM-204', name: 'Surgical Supplies',       weight: '6 kg', shelf: null },
  ],
  'SHP-007': [
    { id: 'ITM-301', name: 'Potatoes',           weight: '12 kg', shelf: null },
    { id: 'ITM-302', name: 'Onions',             weight: '8 kg',  shelf: null },
    { id: 'ITM-303', name: 'Carrots',            weight: '7 kg',  shelf: null },
    { id: 'ITM-304', name: 'Cabbage',            weight: '6 kg',  shelf: null },
    { id: 'ITM-305', name: 'Apples',             weight: '5 kg',  shelf: null },
    { id: 'ITM-306', name: 'Oranges',            weight: '7 kg',  shelf: null },
  ],
};

export const stationShelves = [
  'Store A · 1', 'Store A · 2', 'Store A · 3', 'Store A · 4',
  'Store B · 1', 'Store B · 2', 'Store B · 3',
  'Cold Store · 1', 'Cold Store · 2',
  'Med Room · 1', 'Med Room · 2',
  'Yard · 1', 'Yard · 2',
];

// src/data/stationData.js  → add at bottom

export const stationStock = [
  {
    id: 'ITM-3001',
    name: 'Frozen Food (Mixed)',
    category: 'Food',
    qty: 450,  unit: 'kg',
    expiry: 'Mar 2025',
    expiryDays: 28,
    shelf: 'Store A · 3',
    status: 'expiring',
    fefo: 'high',
    batch: 'BATCH-2024-045',
    openedExpiry: '7 days after opening',
  },
  {
    id: 'ITM-3002',
    name: 'Medical Supplies',
    category: 'Medical',
    qty: 120, unit: 'units',
    expiry: 'Jun 2025',
    expiryDays: 118,
    shelf: 'Med Room · 1',
    status: 'ok',
    fefo: 'medium',
    batch: 'BATCH-2024-021',
  },
  {
    id: 'ITM-3003',
    name: 'Diesel (Station)',
    category: 'Fuel',
    qty: 5000, unit: 'L',
    expiry: 'N/A',
    expiryDays: null,
    shelf: 'Tank 1',
    status: 'ok',
    fefo: 'low',
  },
  {
    id: 'ITM-3004',
    name: 'Batteries (AA/Li)',
    category: 'Spares',
    qty: 45, unit: 'units',
    expiry: 'Dec 2025',
    expiryDays: 285,
    shelf: 'Store B · 2',
    status: 'ok',
    fefo: 'low',
  },
  {
    id: 'ITM-3005',
    name: 'Canned Vegetables',
    category: 'Food',
    qty: 280, unit: 'cans',
    expiry: 'Apr 2025',
    expiryDays: 42,
    shelf: 'Store A · 2',
    status: 'expiring',
    fefo: 'high',
    batch: 'BATCH-2024-033',
  },
  {
    id: 'ITM-3006',
    name: 'Coffee & Tea',
    category: 'Food',
    qty: 60, unit: 'kg',
    expiry: 'Sep 2025',
    expiryDays: 195,
    shelf: 'Store A · 4',
    status: 'low-stock',
    fefo: 'medium',
    reorderAt: 80,
  },
  {
    id: 'ITM-3007',
    name: 'Propane Cylinders',
    category: 'Fuel',
    qty: 22, unit: 'units',
    expiry: 'N/A',
    expiryDays: null,
    shelf: 'Yard · 2',
    status: 'low-stock',
    fefo: 'low',
    reorderAt: 30,
  },
  {
    id: 'ITM-3008',
    name: 'Fresh Vegetables',
    category: 'Food',
    qty: 15, unit: 'kg',
    expiry: 'Mar 2025',
    expiryDays: 5,
    shelf: 'Cold Store · 1',
    status: 'expiring',
    fefo: 'high',
    batch: 'BATCH-2024-051',
  },
  {
    id: 'ITM-3009',
    name: 'Painkillers',
    category: 'Medical',
    qty: 240, unit: 'tablets',
    expiry: 'Aug 2025',
    expiryDays: 155,
    shelf: 'Med Room · 2',
    status: 'ok',
    fefo: 'medium',
  },
  {
    id: 'ITM-3010',
    name: 'Surgical Gloves',
    category: 'Medical',
    qty: 180, unit: 'pairs',
    expiry: 'Nov 2025',
    expiryDays: 245,
    shelf: 'Med Room · 1',
    status: 'ok',
    fefo: 'low',
  },
  {
    id: 'ITM-3011',
    name: 'Hand Tools Set',
    category: 'Spares',
    qty: 12, unit: 'kits',
    expiry: 'N/A',
    expiryDays: null,
    shelf: 'Store B · 1',
    status: 'ok',
    fefo: 'low',
  },
  {
    id: 'ITM-3012',
    name: 'Emergency Rations',
    category: 'Food',
    qty: 210, unit: 'units',
    expiry: 'Apr 2025',
    expiryDays: 38,
    shelf: 'Store A · 1',
    status: 'expiring',
    fefo: 'high',
    batch: 'BATCH-2024-017',
  },
];

export const stationCategories = ['Food', 'Medical', 'Fuel', 'Spares'];

// src/data/stationData.js  → add at bottom

export const stationSyncQueue = [
  { priority: 1, type: 'Emergency alerts',  count: 0,   sla: 'Immediate',   cls: 'red' },
  { priority: 2, type: 'Medical data',      count: 3,   sla: '< 1 hour',    cls: 'pink' },
  { priority: 3, type: 'Waste records',     count: 12,  sla: '< 6 hours',   cls: 'amber' },
  { priority: 4, type: 'Inventory changes', count: 180, sla: '< 24 hours',  cls: 'blue' },
  { priority: 5, type: 'Routine logs',      count: 52,  sla: 'Best effort', cls: 'slate' },
];

export const syncLog = [
  { id: 1, at: '3 days ago · 14:22',    event: 'Last successful sync',         detail: '247 records uploaded to Goa',        ok: true },
  { id: 2, at: '3 days ago · 14:18',    event: 'Connection established',       detail: 'Iridium link · 42 kbps',             ok: true },
  { id: 3, at: '3 days ago · 09:00',    event: 'Connection attempt failed',    detail: 'No satellite in range',              ok: false },
  { id: 4, at: '4 days ago · 20:45',    event: 'Local backup created',         detail: 'Full snapshot · 128 MB',             ok: true },
  { id: 5, at: '4 days ago · 14:20',    event: 'Last successful sync',         detail: 'Prior day · 189 records uploaded',   ok: true },
  { id: 6, at: '5 days ago · 08:30',    event: 'Priority reordered',           detail: 'Medical moved above Waste',          ok: true },
];

export const syncPriorities = [
  { key: 'emergency', label: 'Emergency alerts',  description: 'SOS and life-threatening events',      sla: 'Immediate',    locked: true },
  { key: 'medical',   label: 'Medical data',      description: 'Patient records, telemedicine',         sla: '< 1 hour' },
  { key: 'waste',     label: 'Waste records',     description: 'Compliance and backhaul tracking',      sla: '< 6 hours' },
  { key: 'inventory', label: 'Inventory changes', description: 'Scans, issues, receipts',               sla: '< 24 hours' },
  { key: 'routine',   label: 'Routine logs',      description: 'Movement logs, non-urgent events',      sla: 'Best effort' },
];

export const syncBandwidth = {
  current: 0,        // kbps — 0 means offline
  min: 9.6,
  max: 64,
  linkType: 'Iridium',
  lastSpeed: '42 kbps',
};



// src/data/stationData.js  → add at bottom

export const stationWasteSummary = {
  totalKg: 1245,
  hazardousKg: 120,
  backhaulKg: 890,
  storagePercent: 85,
  storageCapacityKg: 1500,
  incineratedKg: 235,
  compliance: 'Compliant',
  treatyNote: 'Antarctic Treaty · Annex III',
};

export const wasteCategories = [
  {
    id: 'organic',
    label: 'Organic',
    icon: '🥬',
    weight: 450,
    storage: 'Bin A',
    status: 'ready-incineration',
    incinerable: true,
    hazardLevel: 'low',
    backhaul: false,
  },
  {
    id: 'plastic',
    label: 'Plastic',
    icon: '🧴',
    weight: 200,
    storage: 'Bin B',
    status: 'ready-backhaul',
    incinerable: false,
    hazardLevel: 'low',
    backhaul: true,
  },
  {
    id: 'hazardous',
    label: 'Hazardous',
    icon: '☢️',
    weight: 120,
    storage: 'Secure Store',
    status: 'awaiting-permit',
    incinerable: false,
    hazardLevel: 'high',
    backhaul: true,
  },
  {
    id: 'medical',
    label: 'Medical',
    icon: '🏥',
    weight: 45,
    storage: 'Med Bin',
    status: 'ready-incineration',
    incinerable: true,
    hazardLevel: 'medium',
    backhaul: false,
  },
  {
    id: 'glass',
    label: 'Glass',
    icon: '🍶',
    weight: 180,
    storage: 'Bin C',
    status: 'ready-backhaul',
    incinerable: false,
    hazardLevel: 'low',
    backhaul: true,
  },
  {
    id: 'metal',
    label: 'Metal',
    icon: '🔩',
    weight: 140,
    storage: 'Bin D',
    status: 'ready-backhaul',
    incinerable: false,
    hazardLevel: 'low',
    backhaul: true,
  },
  {
    id: 'paper',
    label: 'Paper / Cardboard',
    icon: '📦',
    weight: 110,
    storage: 'Bin E',
    status: 'ready-incineration',
    incinerable: true,
    hazardLevel: 'low',
    backhaul: false,
  },
];

export const wasteStatusBadge = {
  'ready-incineration': { label: 'Ready for Incineration', cls: 'bg-amber-100 text-amber-700' },
  'ready-backhaul':     { label: 'Ready for Backhaul',      cls: 'bg-blue-100 text-blue-700' },
  'awaiting-permit':    { label: 'Awaiting Permit',         cls: 'bg-red-100 text-red-700' },
  'in-progress':        { label: 'In Progress',             cls: 'bg-purple-100 text-purple-700' },
};

export const incinerationLog = [
  { id: 1, at: '2 days ago · 14:30', by: 'Dr. Sharma', weightKg: 45, category: 'Organic',  note: 'Routine daily burn' },
  { id: 2, at: '3 days ago · 09:15', by: 'Dr. Sharma', weightKg: 38, category: 'Paper',    note: 'Weekly paper burn' },
  { id: 3, at: '5 days ago · 16:20', by: 'Dr. Priya',  weightKg: 12, category: 'Medical',  note: 'Sharps disposed' },
  { id: 4, at: '7 days ago · 11:00', by: 'Dr. Sharma', weightKg: 52, category: 'Organic',  note: 'Routine burn' },
  { id: 5, at: '9 days ago · 15:45', by: 'Dr. Sharma', weightKg: 88, category: 'Organic',  note: 'Post-event cleanup' },
];

export const backhaulQueue = [
  {
    id: 'BH-001',
    category: 'Plastic',
    weight: 200,
    origin: 'Maitri',
    destination: 'India (via Cape Town)',
    status: 'staged',
    vessel: 'MV Vasily Golovnin · Return',
    vesselETA: 'Mar 2025',
  },
  {
    id: 'BH-002',
    category: 'Glass',
    weight: 180,
    origin: 'Maitri',
    destination: 'India (via Cape Town)',
    status: 'staged',
    vessel: 'MV Vasily Golovnin · Return',
    vesselETA: 'Mar 2025',
  },
  {
    id: 'BH-003',
    category: 'Metal',
    weight: 140,
    origin: 'Maitri',
    destination: 'India (via Cape Town)',
    status: 'staged',
    vessel: 'MV Vasily Golovnin · Return',
    vesselETA: 'Mar 2025',
  },
  {
    id: 'BH-004',
    category: 'Hazardous',
    weight: 120,
    origin: 'Maitri',
    destination: 'India · Hazardous facility',
    status: 'awaiting-permit',
    vessel: 'TBD',
    vesselETA: 'Pending',
  },
  {
    id: 'BH-005',
    category: 'Electronic',
    weight: 250,
    origin: 'Maitri',
    destination: 'India · E-waste facility',
    status: 'permit-cleared',
    vessel: 'MV Vasily Golovnin · Return',
    vesselETA: 'Mar 2025',
  },
];

export const backhaulStatusBadge = {
  'staged':         { label: '📦 Staged',          cls: 'bg-blue-100 text-blue-700' },
  'awaiting-permit':{ label: '⏳ Awaiting Permit',  cls: 'bg-amber-100 text-amber-700' },
  'permit-cleared': { label: '✅ Permit Cleared',   cls: 'bg-green-100 text-green-700' },
  'shipped':        { label: '🚢 Shipped',          cls: 'bg-purple-100 text-purple-700' },
};


// src/data/stationData.js  → add at bottom

export const stationPersonnel = [
  {
    id: 'P-001',
    name: 'Dr. Sharma',
    role: 'Station Manager',
    department: 'Command',
    status: 'on-site',
    location: 'Station Main',
    lastUpdate: '3 days ago',
    emergencyContact: '+91-XXXX-1001',
    bloodGroup: 'B+',
    gear: ['Parka', 'Boots', 'Radio', 'GPS beacon'],
    training: ['Polar Survival', 'First Aid L2', 'Fire Safety'],
    movement: [
      { at: 'Goa',        when: '90 days ago', event: 'Departed NCPOR HQ' },
      { at: 'Cape Town',  when: '45 days ago', event: 'Transit hub' },
      { at: 'Maitri',     when: '30 days ago', event: 'Arrived · Station Manager' },
    ],
  },
  {
    id: 'P-002',
    name: 'Dr. Priya',
    role: 'Medical Officer',
    department: 'Medical',
    status: 'on-site',
    location: 'Med Room',
    lastUpdate: '3 days ago',
    emergencyContact: '+91-XXXX-1002',
    bloodGroup: 'O+',
    gear: ['Parka', 'Boots', 'Radio', 'Medical kit'],
    training: ['Polar Survival', 'Advanced Trauma', 'Cold Chain Mgmt'],
    movement: [
      { at: 'Goa',        when: '88 days ago', event: 'Departed' },
      { at: 'Maitri',     when: '28 days ago', event: 'Arrived · Medical Officer' },
    ],
  },
  {
    id: 'P-003',
    name: 'Rajesh Kumar',
    role: 'Scientist',
    department: 'Research',
    status: 'in-field',
    location: 'Camp 1 (12 km)',
    lastUpdate: '1 day ago',
    emergencyContact: '+91-XXXX-1003',
    bloodGroup: 'A+',
    gear: ['Parka', 'Boots', 'Radio', 'GPS beacon', 'Sample kit'],
    training: ['Polar Survival', 'Field Research', 'Ice Core Drilling'],
    movement: [
      { at: 'Station',    when: '2 days ago', event: 'Departed for Camp 1' },
      { at: 'Camp 1',     when: '1 day ago',  event: 'Set up field camp' },
    ],
  },
  {
    id: 'P-004',
    name: 'Anjali Verma',
    role: 'Engineer',
    department: 'Technical',
    status: 'on-site',
    location: 'Workshop',
    lastUpdate: '5 hours ago',
    emergencyContact: '+91-XXXX-1004',
    bloodGroup: 'AB+',
    gear: ['Parka', 'Boots', 'Radio', 'Tool kit'],
    training: ['Polar Survival', 'Electrical Systems', 'Diesel Maintenance'],
    movement: [
      { at: 'Maitri',     when: '25 days ago', event: 'Arrived' },
    ],
  },
  {
    id: 'P-005',
    name: 'Vikram Singh',
    role: 'Scientist',
    department: 'Research',
    status: 'in-field',
    location: 'Camp 2 (8 km)',
    lastUpdate: '18 hours ago',
    emergencyContact: '+91-XXXX-1005',
    bloodGroup: 'O-',
    gear: ['Parka', 'Boots', 'Radio', 'GPS beacon', 'Sample kit'],
    training: ['Polar Survival', 'Glaciology'],
    movement: [
      { at: 'Station',    when: '3 days ago', event: 'Departed for Camp 2' },
      { at: 'Camp 2',     when: '2 days ago', event: 'Setup complete' },
    ],
  },
  {
    id: 'P-006',
    name: 'Meera Nair',
    role: 'Cook',
    department: 'Support',
    status: 'on-site',
    location: 'Kitchen',
    lastUpdate: '4 hours ago',
    emergencyContact: '+91-XXXX-1006',
    bloodGroup: 'B-',
    gear: ['Parka', 'Boots'],
    training: ['Polar Survival', 'Food Safety'],
    movement: [
      { at: 'Maitri', when: '30 days ago', event: 'Arrived' },
    ],
  },
  {
    id: 'P-007',
    name: 'Suresh Iyer',
    role: 'Technician',
    department: 'Technical',
    status: 'overdue-checkin',
    location: 'Yard (last seen)',
    lastUpdate: '11 hours ago',
    emergencyContact: '+91-XXXX-1007',
    bloodGroup: 'A-',
    gear: ['Parka', 'Boots', 'Radio'],
    training: ['Polar Survival', 'Mechanical Repairs'],
    movement: [
      { at: 'Yard',  when: '11 hours ago', event: 'Last check-in' },
    ],
  },
  {
    id: 'P-008',
    name: 'Kavya Rao',
    role: 'Scientist',
    department: 'Research',
    status: 'on-site',
    location: 'Lab',
    lastUpdate: '2 hours ago',
    emergencyContact: '+91-XXXX-1008',
    bloodGroup: 'O+',
    gear: ['Parka', 'Boots', 'Radio', 'Lab kit'],
    training: ['Polar Survival', 'Sample Analysis'],
    movement: [
      { at: 'Maitri', when: '26 days ago', event: 'Arrived' },
    ],
  },
];

export const personnelStatusBadge = {
  'on-site':         { label: '🏠 On-site',      cls: 'bg-green-100 text-green-700' },
  'in-field':        { label: '🏕 In-field',     cls: 'bg-blue-100 text-blue-700' },
  'overdue-checkin': { label: '⚠ Overdue',      cls: 'bg-red-100 text-red-700' },
  'off-site':        { label: '🚶 Off-site',     cls: 'bg-slate-100 text-slate-600' },
  'medical':         { label: '🏥 Medical',      cls: 'bg-pink-100 text-pink-700' },
};

export const musteringStatus = {
  total: 38,
  accounted: 37,
  overdue: 1,
  inField: 6,
  onSite: 31,
  lastMuster: 'Today · 08:00 IST',
  nextMuster: 'Today · 20:00 IST',
};


// src/data/stationData.js  → add at bottom

export const emergencyStatus = {
  activeAlerts: 0,
  stationMode: 'Normal',
  lastDrill: '5 days ago · Fire drill',
  nextDrill: 'in 9 days · Medevac drill',
  commsStatus: 'Radio room operational',
  medicalReady: true,
  helicopterPad: 'Clear',
};

export const emergencyResources = [
  {
    id: 'medical',
    icon: '🏥',
    label: 'Nearest Medical Kit',
    location: 'Med Room · Shelf A1',
    distance: 'Station main building',
    status: 'ready',
    quantity: '3 kits',
  },
  {
    id: 'shelter',
    icon: '🏠',
    label: 'Nearest Shelter',
    location: 'Station Main Hall',
    distance: 'Ground level',
    status: 'ready',
    capacity: '40 people',
  },
  {
    id: 'comms',
    icon: '📡',
    label: 'Nearest Comms',
    location: 'Radio Room',
    distance: 'Station main · West wing',
    status: 'ready',
    channel: 'Iridium + HF backup',
  },
  {
    id: 'fuel',
    icon: '⛽',
    label: 'Nearest Fuel Cache',
    location: 'Tank 1 · Yard',
    distance: '50 m from main building',
    status: 'ready',
    quantity: '5,000 L',
  },
  {
    id: 'firestation',
    icon: '🧯',
    label: 'Fire Equipment',
    location: 'Fire Station Bay',
    distance: 'Adjacent to Workshop',
    status: 'ready',
    quantity: '8 extinguishers · 2 hose reels',
  },
  {
    id: 'snowcat',
    icon: '🚜',
    label: 'Emergency Vehicle',
    location: 'Vehicle Bay',
    distance: 'Outside Yard',
    status: 'ready',
    quantity: '1 snowcat · 2 skidoos',
  },
];

export const incidentLog = [
  {
    id: 'INC-2024-018',
    date: '15 Nov 2024',
    type: 'Medical',
    severity: 'Low',
    status: 'Resolved',
    reportedBy: 'Dr. Priya',
    description: 'Fever case · patient recovered',
    resolvedIn: '2 days',
  },
  {
    id: 'INC-2024-017',
    date: '10 Nov 2024',
    type: 'Equipment',
    severity: 'Medium',
    status: 'Resolved',
    reportedBy: 'Anjali Verma',
    description: 'Generator fault · repaired on-site',
    resolvedIn: '6 hours',
  },
  {
    id: 'INC-2024-016',
    date: '28 Oct 2024',
    type: 'Weather',
    severity: 'High',
    status: 'Resolved',
    reportedBy: 'Dr. Sharma',
    description: 'Blizzard · personnel recalled from Camp 2',
    resolvedIn: '1 day',
  },
  {
    id: 'INC-2024-015',
    date: '12 Oct 2024',
    type: 'Medical',
    severity: 'Low',
    status: 'Resolved',
    reportedBy: 'Dr. Priya',
    description: 'Minor frostbite · treated',
    resolvedIn: '3 days',
  },
];

export const incidentSeverityBadge = {
  Low:    { cls: 'bg-green-100 text-green-700' },
  Medium: { cls: 'bg-amber-100 text-amber-700' },
  High:   { cls: 'bg-orange-100 text-orange-700' },
  Critical: { cls: 'bg-red-100 text-red-700' },
};

export const incidentStatusBadge = {
  Resolved:      { cls: 'bg-green-100 text-green-700',   label: '✅ Resolved' },
  Active:        { cls: 'bg-red-100 text-red-700',       label: '🔴 Active' },
  Investigating: { cls: 'bg-amber-100 text-amber-700',   label: '🔍 Investigating' },
};

export const emergencyProcedures = [
  {
    id: 'fire',
    icon: '🔥',
    title: 'Fire Emergency',
    steps: [
      'Activate nearest fire alarm',
      'Evacuate to Station Main Hall',
      'Report headcount to Station Manager',
      'Use extinguisher only if safe',
    ],
  },
  {
    id: 'medical',
    icon: '🏥',
    title: 'Medical Emergency',
    steps: [
      'Call Medical Officer on Ch. 2',
      'Bring patient to Med Room',
      'Prepare telemedicine link',
      'Await medevac decision from Goa',
    ],
  },
  {
    id: 'missing',
    icon: '🧭',
    title: 'Missing Person',
    steps: [
      'Trigger mustering immediately',
      'Check last known GPS beacon',
      'Deploy search team (min. 3)',
      'Notify Goa · prepare medevac',
    ],
  },
  {
    id: 'weather',
    icon: '🌪️',
    title: 'Severe Weather',
    steps: [
      'Recall all field parties',
      'Secure loose equipment outdoors',
      'Close exterior hatches',
      'Wait in Station Main Hall',
    ],
  },
];

export const drillLog = [
  { id: 1, date: '5 days ago', type: 'Fire Drill',        duration: '12 min',  score: 'Excellent', participants: 34 },
  { id: 2, date: '18 days ago', type: 'Medevac Drill',    duration: '28 min',  score: 'Good',      participants: 32 },
  { id: 3, date: '34 days ago', type: 'Evacuation Drill', duration: '9 min',   score: 'Excellent', participants: 38 },
  { id: 4, date: '58 days ago', type: 'Comms Failure',    duration: '22 min',  score: 'Good',      participants: 30 },
];


// src/data/stationData.js  → add at bottom

/* ───────────── MEDICAL MODULE ───────────── */

export const medicalOverview = {
  activePatients: 2,
  pendingConsults: 1,
  criticalAlerts: 0,
  telemedicineToday: 1,
  coldChainAlerts: 0,
  medicalWasteKg: 45,
};

export const coldChainStatus = [
  { id: 'vaccine', icon: '💉', label: 'Vaccine Fridge',  target: '2–8°C',   current: '4°C',   status: 'ok' },
  { id: 'blood',   icon: '🩸', label: 'Blood Bank',      target: '−20°C',   current: '−20°C', status: 'ok' },
  { id: 'sample',  icon: '🧪', label: 'Sample Freezer',  target: '−80°C',   current: '−80°C', status: 'ok' },
  { id: 'plasma',  icon: '💊', label: 'Plasma Store',    target: '−30°C',   current: '−31°C', status: 'ok' },
];

export const medicalSupplies = [
  { id: 'general',   label: 'General Medicines',   daysLeft: 90,  totalDays: 180, cls: 'green' },
  { id: 'emergency', label: 'Emergency Drugs',     daysLeft: 120, totalDays: 180, cls: 'green' },
  { id: 'vaccines',  label: 'Vaccines',            daysLeft: 45,  totalDays: 120, cls: 'amber' },
  { id: 'dressings', label: 'Bandages / Dressings',daysLeft: 60,  totalDays: 120, cls: 'amber' },
  { id: 'controlled',label: 'Controlled Substances',daysLeft: 18, totalDays: 90,  cls: 'red' },
];

export const medicalAlerts = [
  { id: 1, level: 'amber', title: '2 medications expiring',       detail: 'Within 60 days · check expiry' },
  { id: 2, level: 'red',   title: 'Controlled substance low',    detail: 'Below minimum stock — request resupply' },
  { id: 3, level: 'amber', title: 'Vaccination due',             detail: 'P-078 · within 7 days' },
];

export const patients = [
  {
    id: 'P-045',
    name: 'Rajesh Kumar',
    age: 42,
    role: 'Scientist',
    bloodGroup: 'A+',
    allergies: ['Penicillin'],
    currentMeds: [],
    status: 'fever',
    statusLabel: 'Fever · under observation',
    lastVisit: 'Today',
    emergencyContact: '+91-XXXX-1003',
    history: [
      { date: 'Today',        complaint: 'Fever (38.2°C) · sore throat',  treatment: 'Paracetamol · rest · hydrate', doctor: 'Dr. Priya' },
      { date: '6 months ago', complaint: 'Routine checkup',                treatment: 'Fit for expedition',            doctor: 'Dr. Verma' },
    ],
  },
  {
    id: 'P-012',
    name: 'Dr. Sharma',
    age: 51,
    role: 'Station Manager',
    bloodGroup: 'B+',
    allergies: [],
    currentMeds: ['Amlodipine 5mg'],
    status: 'dental',
    statusLabel: 'Dental pain · teleconsult scheduled',
    lastVisit: 'Yesterday',
    emergencyContact: '+91-XXXX-1001',
    history: [
      { date: 'Yesterday',    complaint: 'Lower molar pain',              treatment: 'Analgesic · teleconsult 3 PM',  doctor: 'Dr. Priya' },
      { date: '2 months ago', complaint: 'Hypertension follow-up',        treatment: 'Continue Amlodipine',           doctor: 'Dr. Priya' },
    ],
  },
  {
    id: 'P-078',
    name: 'Anjali Verma',
    age: 34,
    role: 'Engineer',
    bloodGroup: 'AB+',
    allergies: [],
    currentMeds: [],
    status: 'healthy',
    statusLabel: 'Healthy · vaccination due',
    lastVisit: '3 weeks ago',
    emergencyContact: '+91-XXXX-1004',
    history: [
      { date: '3 weeks ago', complaint: 'Routine checkup',                treatment: 'Fit · vaccination scheduled',    doctor: 'Dr. Priya' },
    ],
  },
];

export const patientStatusBadge = {
  fever:   { cls: 'bg-red-100 text-red-700',    label: '🌡️ Fever' },
  dental:  { cls: 'bg-amber-100 text-amber-700',label: '🦷 Dental' },
  healthy: { cls: 'bg-green-100 text-green-700',label: '✅ Healthy' },
  injured: { cls: 'bg-orange-100 text-orange-700', label: '🩹 Injured' },
};

export const telemedicineConsults = [
  {
    id: 'TM-001',
    patient: 'Dr. Sharma',
    patientId: 'P-012',
    scheduled: 'Today · 15:00 IST',
    specialist: 'Dr. Rao · Dental Surgeon',
    location: 'AIIMS New Delhi',
    status: 'scheduled',
    topic: 'Persistent lower molar pain',
  },
  {
    id: 'TM-002',
    patient: 'Rajesh Kumar',
    patientId: 'P-045',
    scheduled: 'Requested',
    specialist: 'Dr. Mehta · Internal Medicine',
    location: 'AIIMS New Delhi',
    status: 'pending',
    topic: 'Prolonged fever — second opinion',
  },
];

export const telemedicineStatusBadge = {
  scheduled: { cls: 'bg-green-100 text-green-700', label: '✅ Scheduled' },
  pending:   { cls: 'bg-amber-100 text-amber-700', label: '⏳ Awaiting Slot' },
  completed: { cls: 'bg-slate-100 text-slate-600', label: '✓ Completed' },
  cancelled: { cls: 'bg-red-100 text-red-700',     label: '✕ Cancelled' },
};

export const medicalWasteCategories = [
  { id: 'sharps',    icon: '💉', label: 'Sharps',           weight: 5,  storage: 'Sharps Bin',  status: 'ready-incineration', hazardLevel: 'high' },
  { id: 'biohazard', icon: '☣️', label: 'Biohazard',        weight: 10, storage: 'Red Bin',     status: 'ready-incineration', hazardLevel: 'high' },
  { id: 'expired',   icon: '💊', label: 'Expired Medicines',weight: 20, storage: 'Secure Store',status: 'awaiting-permit',    hazardLevel: 'medium' },
  { id: 'general',   icon: '🩹', label: 'General Medical',  weight: 10, storage: 'Med Bin',     status: 'ready-incineration', hazardLevel: 'low' },
];

export const medicalAuditLog = [
  { id: 1, at: 'Today · 10:42',   user: 'Dr. Priya', action: 'Viewed patient P-045',        reason: 'Routine consultation' },
  { id: 2, at: 'Today · 09:15',   user: 'Dr. Priya', action: 'Prescribed medication',        reason: 'P-012 · Analgesic' },
  { id: 3, at: 'Yesterday · 16:20',user: 'Dr. Priya', action: 'Emergency access',            reason: 'P-045 · Fever spike' },
  { id: 4, at: 'Yesterday · 14:00',user: 'Dr. Priya', action: 'Teleconsult scheduled',       reason: 'P-012 · Dental' },
  { id: 5, at: '2 days ago · 08:30',user: 'Dr. Priya', action: 'Added medical waste record', reason: 'Sharps bin full' },
];