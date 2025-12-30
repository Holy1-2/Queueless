export const SERVICES = [
  {
    id: 'bank',
    name: 'Bank Teller',
    description: 'Cash transactions, deposits, withdrawals',
    avgWaitTime: 5,
    icon: 'business',
    color: '#0066FF',
    locations: ['Main Branch', 'Downtown', 'Mall Branch'],
  },
  {
    id: 'hospital',
    name: 'Hospital Doctor',
    description: 'Medical consultations and checkups',
    avgWaitTime: 15,
    icon: 'medkit',
    color: '#FF4444',
    locations: ['Emergency', 'OPD', 'Specialist'],
  },
  {
    id: 'government',
    name: 'Government Office',
    description: 'Document processing and permits',
    avgWaitTime: 10,
    icon: 'document',
    color: '#00CC88',
    locations: ['City Hall', 'License Office', 'Tax Department'],
  },
  {
    id: 'post',
    name: 'Post Office',
    description: 'Mail and parcel services',
    avgWaitTime: 7,
    icon: 'mail',
    color: '#FFAA00',
    locations: ['Central Post', 'Express Counter'],
  },
];

export const ADMIN_PERMISSIONS = {
  canManageQueue: true,
  canResetCounter: true,
  canViewStats: true,
  canAddService: true,
};

export const NOTIFICATION_CONFIG = {
  alertBeforeMinutes: 5,
  maxNotificationsPerDay: 10,
  soundEnabled: true,
  vibrationEnabled: true,
};