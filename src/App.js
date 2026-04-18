import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import RoomsPage from './pages/RoomsPage';
import './styles/landing-page.css';

const HOME_ROUTE = '/';
const DASHBOARD_ROUTE = '/dashboard';
const ROOMS_ROUTE = '/rooms';

function normalizeHashRoute() {
  const hash = window.location.hash.replace(/^#/, '');

  if (hash === DASHBOARD_ROUTE || hash === ROOMS_ROUTE || hash === HOME_ROUTE) {
    return hash;
  }

  if (window.location.pathname === DASHBOARD_ROUTE) {
    return DASHBOARD_ROUTE;
  }

  if (window.location.pathname === ROOMS_ROUTE) {
    return ROOMS_ROUTE;
  }

  return HOME_ROUTE;
}

function syncHash(path) {
  const nextHash = path === HOME_ROUTE ? '#/' : `#${path}`;

  if (window.location.hash !== nextHash) {
    window.location.hash = nextHash;
  }
}

function App() {
  const [route, setRoute] = useState(normalizeHashRoute);
  const [selectedDashboardRoomId, setSelectedDashboardRoomId] = useState('');

  useEffect(() => {
    syncHash(route);

    const handleHashChange = () => {
      setRoute(normalizeHashRoute());
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [route]);

  const navigateTo = (path, options = {}) => {
    const { roomId = '' } = options;

    if (path === route) {
      if (path === DASHBOARD_ROUTE && roomId) {
        setSelectedDashboardRoomId(roomId);
      }

      return;
    }

    if (path === DASHBOARD_ROUTE) {
      setSelectedDashboardRoomId(roomId);
    }

    syncHash(path);
    setRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (route === DASHBOARD_ROUTE) {
    return (
      <DashboardPage
        initialSelectedRoomId={selectedDashboardRoomId}
        onGoHome={() => navigateTo(HOME_ROUTE)}
        onNavigate={navigateTo}
        onOpenRooms={() => navigateTo(ROOMS_ROUTE)}
      />
    );
  }

  if (route === ROOMS_ROUTE) {
    return (
      <RoomsPage
        onGoHome={() => navigateTo(HOME_ROUTE)}
        onNavigate={navigateTo}
        onOpenDashboard={(roomId) => navigateTo(DASHBOARD_ROUTE, { roomId })}
      />
    );
  }

  return (
    <HomePage
      onOpenDashboard={() => navigateTo(DASHBOARD_ROUTE)}
      onOpenRooms={() => navigateTo(ROOMS_ROUTE)}
    />
  );
}

export default App;
