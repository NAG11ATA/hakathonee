export const quickControls = [
  { id: 'ventilation', icon: 'ventilation', name: 'Ventilation' },
  { id: 'irrigation', icon: 'irrigation', name: 'Irrigation' },
  { id: 'lighting', icon: 'lighting', name: 'Lighting' },
  { id: 'heating', icon: 'heating', name: 'Heating' },
];

export const navItems = [
  { id: 'dashboard', icon: 'dashboard', label: 'Dashboard', path: '/dashboard' },
  { id: 'rooms', icon: 'rooms', label: 'Rooms', path: '/rooms' },
  { id: 'home', icon: 'home', label: 'Home', path: '/' },
];

export const mockRooms = [
  {
    _id: 'local-room-1',
    device_id: 'GH-101',
    location: 'Greenhouse North',
    type: 'Tomatoes',
    current: {
      temperature: 26,
      humidity: 61,
      status: 'active',
    },
    target: {
      temperature: 24,
      humidity: 58,
      status: 'active',
    },
  },
  {
    _id: 'local-room-2',
    device_id: 'GH-102',
    location: 'Greenhouse South',
    type: 'Peppers',
    current: {
      temperature: 25,
      humidity: 57,
      status: 'active',
    },
    target: {
      temperature: 23,
      humidity: 55,
      status: 'active',
    },
  },
];
