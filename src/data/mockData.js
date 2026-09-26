// src/data/mockData.js

export const expedition = {
  name: '46 ISEA',
  status: 'Active',
  personnel: 38,
  incidents: 0,
};

export const locations = [
  { id: 'goa',       name: 'Goa',       type: 'HQ',     lastSync: 'Just now',   age: 0,   status: 'fresh' },
  { id: 'capetown',  name: 'Cape Town', type: 'Hub',    lastSync: '2 hours ago', age: 0.1, status: 'fresh' },
  { id: 'maitri',    name: 'Maitri',    type: 'Station', lastSync: '3 days ago',  age: 3,   status: 'stale' },
  { id: 'bharati',   name: 'Bharati',   type: 'Station', lastSync: '6 hours ago', age: 0.25,status: 'fresh' },
  { id: 'himadri',   name: 'Himadri',   type: 'Station', lastSync: '8 days ago',  age: 8,   status: 'very-stale' },
];

export const alerts = [
  { id: 1, level: 'red',    location: 'Maitri',  message: '8 items expiring within 30 days' },
  { id: 2, level: 'yellow', location: 'Bharati', message: 'Medical consult pending' },
  { id: 3, level: 'yellow', location: 'Himadri', message: 'Sync overdue by 8 days' },
  { id: 4, level: 'green',  location: 'Cape Town', message: 'Customs cleared' },
];

export const quickStats = {
  cargoInTransit: 156,
  personnelOnSite: 78,
  openIncidents: 0,
  pendingApprovals: 4,
};

export const shipments = [
  { id: 'SHP-001', item: 'Ice Drill Spare Parts', destination: 'Maitri',  status: 'In Transit', lastUpdate: '3d ago' },
  { id: 'SHP-002', item: 'Frozen Food',           destination: 'Bharati', status: 'Arrived',    lastUpdate: '6h ago' },
  { id: 'SHP-003', item: 'Batteries',             destination: 'Himadri', status: 'Warehouse',  lastUpdate: '1d ago' },
];

export const inventoryByLocation = [
  { location: 'Goa',       items: 245,  expiring: 5, lowStock: 2, freshness: 'live' },
  { location: 'Cape Town', items: 89,   expiring: 0, lowStock: 0, freshness: '2h' },
  { location: 'Maitri',    items: 1245, expiring: 8, lowStock: 3, freshness: '3d' },
  { location: 'Bharati',   items: 987,  expiring: 2, lowStock: 1, freshness: '6h' },
  { location: 'Himadri',   items: 156,  expiring: 0, lowStock: 0, freshness: '8d' },
];

// src/data/mockData.js  → add at bottom

export const cargoShipments = [
  {
    id: 'SHP-001',
    item: 'Ice Core Drill Spare Parts',
    weight: 28,
    dimensions: '80 × 60 × 40 cm',
    destination: 'Maitri',
    status: 'In Transit (Sea)',
    priority: 'high',
    lastUpdate: '3 days ago',
    created: { by: 'PI (web)', at: '46 days ago' },
    scans: [
      { stage: 'Manifest Submitted',   at: 'Goa',       by: 'PI',              when: '46 days ago' },
      { stage: 'Scanned at Warehouse', at: 'Goa',       by: 'Rajesh Kumar',    when: '45 days ago' },
      { stage: 'Packed into Container',at: 'Goa',       by: 'Rajesh Kumar',    when: '45 days ago' },
      { stage: 'Loaded onto Vessel',   at: 'Goa Port',  by: 'Rajesh Kumar',    when: '44 days ago' },
      { stage: 'Arrived Cape Town',    at: 'Cape Town', by: 'Hub Staff',       when: '12 days ago' },
      { stage: 'Customs Cleared',      at: 'Cape Town', by: 'Customs',         when: '10 days ago' },
      { stage: 'Reloaded Onward',      at: 'Cape Town', by: 'Hub Staff',       when: '8 days ago' },
      { stage: 'Location Updated',     at: 'Maitri',    by: 'Dr. Sharma',      when: '3 days ago' },
    ],
    documents: ['Invoice', 'Packing List', 'Bill of Lading', 'Customs Declaration'],
    customs: 'Cleared at Cape Town',
    container: 'CNT-2024-001',
    vessel: 'MV Vasily Golovnin',
  },
  {
    id: 'SHP-002',
    item: 'Frozen Food Consignment',
    weight: 450,
    dimensions: '200 × 150 × 120 cm',
    destination: 'Bharati',
    status: 'Arrived',
    priority: 'normal',
    lastUpdate: '6 hours ago',
    created: { by: 'PI (web)', at: '40 days ago' },
    scans: [
      { stage: 'Manifest Submitted',   at: 'Goa',      by: 'PI',           when: '40 days ago' },
      { stage: 'Scanned at Warehouse', at: 'Goa',      by: 'Rajesh Kumar', when: '39 days ago' },
      { stage: 'Loaded onto Vessel',   at: 'Goa Port', by: 'Rajesh Kumar', when: '37 days ago' },
      { stage: 'Arrived at Bharati',   at: 'Bharati',  by: 'Dr. Priya',    when: '6 hours ago' },
      { stage: 'Placed on Shelf',      at: 'Bharati',  by: 'Dr. Priya',    when: '5 hours ago' },
    ],
    documents: ['Invoice', 'Packing List'],
    customs: 'Cleared at Cape Town',
    container: 'CNT-2024-002',
    vessel: 'MV Vasily Golovnin',
  },
  {
    id: 'SHP-003',
    item: 'Lithium Batteries (UN3480)',
    weight: 120,
    dimensions: '120 × 80 × 60 cm',
    destination: 'Himadri',
    status: 'In Warehouse',
    priority: 'high',
    lastUpdate: '1 day ago',
    created: { by: 'PI (web)', at: '12 days ago' },
    scans: [
      { stage: 'Manifest Submitted',   at: 'Goa', by: 'PI',           when: '12 days ago' },
      { stage: 'Scanned at Warehouse', at: 'Goa', by: 'Rajesh Kumar', when: '11 days ago' },
      { stage: 'Hazardous Decl. Pending', at: 'Goa', by: 'Rajesh Kumar', when: '1 day ago' },
    ],
    documents: ['Invoice', 'MSDS', 'Dangerous Goods Declaration'],
    customs: 'Pending — awaiting DG clearance',
    container: null,
    vessel: null,
  },
  {
    id: 'SHP-004',
    item: 'Scientific Instruments',
    weight: 85,
    dimensions: '100 × 80 × 60 cm',
    destination: 'Maitri',
    status: 'In Transit (Hub)',
    priority: 'normal',
    lastUpdate: '2 days ago',
    created: { by: 'PI (web)', at: '20 days ago' },
    scans: [
      { stage: 'Manifest Submitted',   at: 'Goa',       by: 'PI',           when: '20 days ago' },
      { stage: 'Scanned at Warehouse', at: 'Goa',       by: 'Rajesh Kumar', when: '19 days ago' },
      { stage: 'Loaded onto Vessel',   at: 'Goa Port',  by: 'Rajesh Kumar', when: '17 days ago' },
      { stage: 'Arrived Cape Town',    at: 'Cape Town', by: 'Hub Staff',    when: '2 days ago' },
    ],
    documents: ['Invoice', 'Packing List', 'Insurance'],
    customs: 'In progress',
    container: 'CNT-2024-004',
    vessel: 'MV Vasily Golovnin',
  },
  {
    id: 'SHP-005',
    item: 'Medical Supplies (Cold Chain)',
    weight: 32,
    dimensions: '60 × 40 × 40 cm',
    destination: 'Bharati',
    status: 'Packed',
    priority: 'urgent',
    lastUpdate: '5 hours ago',
    created: { by: 'Medical Officer', at: '5 days ago' },
    scans: [
      { stage: 'Manifest Submitted',   at: 'Goa', by: 'Medical Officer', when: '5 days ago' },
      { stage: 'Scanned at Warehouse', at: 'Goa', by: 'Rajesh Kumar',    when: '4 days ago' },
      { stage: 'Packed into Container',at: 'Goa', by: 'Rajesh Kumar',    when: '5 hours ago' },
    ],
    documents: ['Invoice', 'Cold Chain Log', 'MSDS'],
    customs: 'Not applicable yet',
    container: 'CNT-2024-005',
    vessel: null,
  },
];

// src/data/mockData.js  → add at bottom

export const stockByLocation = [
  { location: 'Goa',       items: 245,  expiring: 5, lowStock: 2, freshness: 'live',  status: 'fresh' },
  { location: 'Cape Town', items: 89,   expiring: 0, lowStock: 0, freshness: '2h',    status: 'fresh' },
  { location: 'Maitri',    items: 1245, expiring: 8, lowStock: 3, freshness: '3d',    status: 'stale' },
  { location: 'Bharati',   items: 987,  expiring: 2, lowStock: 1, freshness: '6h',    status: 'fresh' },
  { location: 'Himadri',   items: 156,  expiring: 0, lowStock: 0, freshness: '8d',    status: 'very-stale' },
];

// Item-level stock per location
export const stockItems = {
  Goa: [
    { id: 'ITM-1001', name: 'Frozen Food (Mixed)',  qty: '2,400 kg', expiry: 'Aug 2025', shelf: 'Warehouse A', status: 'ok',      fefo: 'low' },
    { id: 'ITM-1002', name: 'Rice & Pulses',        qty: '1,800 kg', expiry: 'Dec 2026', shelf: 'Warehouse A', status: 'ok',      fefo: 'low' },
    { id: 'ITM-1003', name: 'Ice Drill Spare Kit',  qty: '45 units', expiry: 'N/A',      shelf: 'Store B',     status: 'ok',      fefo: 'low' },
    { id: 'ITM-1004', name: 'Diesel (Bulk)',        qty: '18,000 L', expiry: 'N/A',      shelf: 'Tank 3',      status: 'ok',      fefo: 'low' },
    { id: 'ITM-1005', name: 'Emergency Rations',    qty: '320 units',expiry: 'Apr 2025', shelf: 'Store A',     status: 'expiring',fefo: 'high' },
  ],
  'Cape Town': [
    { id: 'ITM-2001', name: 'Transit Cargo Hold',   qty: '89 crates',expiry: 'N/A',      shelf: 'Hub Bay 1',   status: 'ok',      fefo: 'low' },
    { id: 'ITM-2002', name: 'Cold Chain Storage',   qty: '12 pallets',expiry: 'Varies',  shelf: 'Reefer 2',    status: 'ok',      fefo: 'medium' },
  ],
  Maitri: [
    { id: 'ITM-3001', name: 'Frozen Food',          qty: '450 kg',   expiry: 'Mar 2025', shelf: 'Store A · 3', status: 'expiring',fefo: 'high' },
    { id: 'ITM-3002', name: 'Medical Supplies',     qty: '120 units',expiry: 'Jun 2025', shelf: 'Med Room',    status: 'ok',      fefo: 'medium' },
    { id: 'ITM-3003', name: 'Diesel (Station)',     qty: '5,000 L',  expiry: 'N/A',      shelf: 'Tank 1',      status: 'ok',      fefo: 'low' },
    { id: 'ITM-3004', name: 'Batteries (AA/Li)',    qty: '45 units', expiry: 'Dec 2025', shelf: 'Store B',     status: 'ok',      fefo: 'low' },
    { id: 'ITM-3005', name: 'Canned Vegetables',    qty: '280 cans', expiry: 'Apr 2025', shelf: 'Store A · 2', status: 'expiring',fefo: 'high' },
    { id: 'ITM-3006', name: 'Coffee & Tea',         qty: '60 kg',    expiry: 'Sep 2025', shelf: 'Store A · 4', status: 'low-stock',fefo: 'medium' },
    { id: 'ITM-3007', name: 'Propane Cylinders',    qty: '22 units', expiry: 'N/A',      shelf: 'Yard 2',      status: 'low-stock',fefo: 'low' },
    { id: 'ITM-3008', name: 'Fresh Vegetables',     qty: '15 kg',    expiry: 'Mar 2025', shelf: 'Cold Store',  status: 'expiring',fefo: 'high' },
  ],
  Bharati: [
    { id: 'ITM-4001', name: 'Frozen Food',          qty: '380 kg',   expiry: 'May 2025', shelf: 'Store 1',     status: 'ok',      fefo: 'medium' },
    { id: 'ITM-4002', name: 'Fuel (Bulk)',          qty: '4,200 L',  expiry: 'N/A',      shelf: 'Tank A',      status: 'ok',      fefo: 'low' },
    { id: 'ITM-4003', name: 'Medical Supplies',     qty: '95 units', expiry: 'Aug 2025', shelf: 'Med Bay',     status: 'low-stock',fefo: 'medium' },
    { id: 'ITM-4004', name: 'Emergency Rations',    qty: '210 units',expiry: 'Apr 2025', shelf: 'Store 2',     status: 'expiring',fefo: 'high' },
  ],
  Himadri: [
    { id: 'ITM-5001', name: 'Survival Kits',        qty: '30 units', expiry: 'Dec 2026', shelf: 'Store A',     status: 'ok',      fefo: 'low' },
    { id: 'ITM-5002', name: 'Diesel',               qty: '1,800 L',  expiry: 'N/A',      shelf: 'Tank 1',      status: 'ok',      fefo: 'low' },
    { id: 'ITM-5003', name: 'Dry Rations',          qty: '85 units', expiry: 'Oct 2025', shelf: 'Store A',     status: 'ok',      fefo: 'low' },
  ],
};

// src/data/mockData.js  → add at bottom

// Confidence model: fresher data → higher confidence
// <1 day old = 95–100% | 1–3 days = 85–95% | 3–7 days = 70–85% | 7–14 days = 50–70% | >14 days = <50%

export const predictions = [
  {
    id: 'PRD-001',
    location: 'Maitri',
    item: 'Frozen Food',
    currentStock: '450 kg',
    dailyUsage: '15 kg/day',
    daysLeft: 2,
    stockoutDate: 'in 2 days',
    confidence: 85,
    dataAge: '3 days',
    recommendation: 'Urgent resupply via next vessel',
    level: 'urgent',
  },
  {
    id: 'PRD-002',
    location: 'Himadri',
    item: 'Fuel (Diesel)',
    currentStock: '1,800 L',
    dailyUsage: '120 L/day',
    daysLeft: 15,
    stockoutDate: 'in 15 days',
    confidence: 60,
    dataAge: '8 days',
    recommendation: 'Confirm consumption rate — data is stale',
    level: 'watch',
  },
  {
    id: 'PRD-003',
    location: 'Bharati',
    item: 'Medical Supplies',
    currentStock: '95 units',
    dailyUsage: '2 units/day',
    daysLeft: 45,
    stockoutDate: 'in 45 days',
    confidence: 90,
    dataAge: '6 hours',
    recommendation: 'Add to routine resupply manifest',
    level: 'ok',
  },
  {
    id: 'PRD-004',
    location: 'Maitri',
    item: 'Coffee & Tea',
    currentStock: '60 kg',
    dailyUsage: '2.5 kg/day',
    daysLeft: 24,
    stockoutDate: 'in 24 days',
    confidence: 85,
    dataAge: '3 days',
    recommendation: 'Include in next Goa manifest',
    level: 'watch',
  },
  {
    id: 'PRD-005',
    location: 'Maitri',
    item: 'Propane Cylinders',
    currentStock: '22 units',
    dailyUsage: '1 unit/2 days',
    daysLeft: 44,
    stockoutDate: 'in 44 days',
    confidence: 85,
    dataAge: '3 days',
    recommendation: 'Monitor — consider top-up with next resupply',
    level: 'ok',
  },
  {
    id: 'PRD-006',
    location: 'Himadri',
    item: 'Dry Rations',
    currentStock: '85 units',
    dailyUsage: '3 units/day',
    daysLeft: 28,
    stockoutDate: 'in 28 days',
    confidence: 42,
    dataAge: '8 days',
    recommendation: '⚠ Low confidence — request station sync',
    level: 'unknown',
  },
  {
    id: 'PRD-007',
    location: 'Bharati',
    item: 'Emergency Rations',
    currentStock: '210 units',
    dailyUsage: '4 units/day',
    daysLeft: 52,
    stockoutDate: 'in 52 days',
    confidence: 88,
    dataAge: '6 hours',
    recommendation: 'No action required',
    level: 'ok',
  },
];

// Prediction model explanation data
export const confidenceBands = [
  { age: '< 1 day',   confidence: '95–100%', cls: 'bg-green-100 text-green-700' },
  { age: '1–3 days',  confidence: '85–95%',  cls: 'bg-green-100 text-green-700' },
  { age: '3–7 days',  confidence: '70–85%',  cls: 'bg-amber-100 text-amber-700' },
  { age: '7–14 days', confidence: '50–70%',  cls: 'bg-orange-100 text-orange-700' },
  { age: '> 14 days', confidence: '< 50%',   cls: 'bg-red-100 text-red-700' },
];

export const modelFactors = [
  { icon: '📦', label: 'Last known stock',      detail: 'From the most recent station sync' },
  { icon: '📉', label: 'Consumption history',   detail: 'Rolling 30-day usage average' },
  { icon: '👥', label: 'Headcount',             detail: 'Current personnel at the station' },
  { icon: '🌡️', label: 'Season factor',         detail: 'Winter / summer usage adjustments' },
  { icon: '⏱️', label: 'Days since last update', detail: 'Drives the confidence score' },
];

// src/data/mockData.js  → add at bottom

export const systemHealth = {
  centralServer: { status: 'online',  label: 'Central Server', detail: 'Goa HQ · Running' },
  database:      { status: 'healthy', label: 'Database',       detail: 'PostgreSQL · Healthy' },
  api:           { status: 'online',  label: 'API',            detail: 'Responding · 42ms avg' },
  storage:       { status: 'healthy', label: 'Storage',        detail: '58% used · 220 GB free' },
};

export const edgeNodes = [
  {
    id: 'goa',
    name: 'Goa',
    type: 'HQ',
    lastSync: 'Just now',
    pending: 0,
    status: 'online',
    uptime: '99.98%',
    version: 'v1.4.2',
  },
  {
    id: 'capetown',
    name: 'Cape Town',
    type: 'Hub',
    lastSync: '2 hours ago',
    pending: 12,
    status: 'online',
    uptime: '99.72%',
    version: 'v1.4.2',
  },
  {
    id: 'maitri',
    name: 'Maitri',
    type: 'Station',
    lastSync: '3 days ago',
    pending: 247,
    status: 'offline',
    uptime: '94.20%',
    version: 'v1.4.0',
  },
  {
    id: 'bharati',
    name: 'Bharati',
    type: 'Station',
    lastSync: '6 hours ago',
    pending: 45,
    status: 'online',
    uptime: '98.55%',
    version: 'v1.4.2',
  },
  {
    id: 'himadri',
    name: 'Himadri',
    type: 'Station',
    lastSync: '8 days ago',
    pending: 89,
    status: 'offline',
    uptime: '88.10%',
    version: 'v1.3.9',
  },
];

export const syncQueue = [
  { priority: 1, type: 'Emergency alerts',  count: 0,   sla: 'Immediate',      cls: 'red' },
  { priority: 2, type: 'Medical data',      count: 3,   sla: '< 1 hour',       cls: 'pink' },
  { priority: 3, type: 'Waste records',     count: 12,  sla: '< 6 hours',      cls: 'amber' },
  { priority: 4, type: 'Inventory changes', count: 180, sla: '< 24 hours',     cls: 'blue' },
  { priority: 5, type: 'Routine logs',      count: 52,  sla: 'Best effort',    cls: 'slate' },
];

export const recentSyncEvents = [
  { id: 1, at: '10:42 IST', node: 'Cape Town', event: 'Synced 12 records',     ok: true },
  { id: 2, at: '09:15 IST', node: 'Bharati',   event: 'Push received',          ok: true },
  { id: 3, at: '08:03 IST', node: 'Maitri',    event: 'Connection attempt failed', ok: false },
  { id: 4, at: '07:48 IST', node: 'Himadri',   event: 'Connection timeout',     ok: false },
  { id: 5, at: '06:30 IST', node: 'Goa',       event: 'Full backup complete',   ok: true },
];