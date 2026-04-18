import { useEffect, useState } from 'react';
import BottomNav from '../components/dashboard/BottomNav';
import GreenhouseCard from '../components/dashboard/GreenhouseCard';
import Header from '../components/dashboard/Header';
import QuickControls from '../components/dashboard/QuickControls';
import TrendChart from '../components/dashboard/TrendChart';
import { getRooms } from '../data/dashboardApi';
import '../styles/dashboard.css';

function DashboardPage({ initialSelectedRoomId, onGoHome, onOpenRooms, onNavigate }) {
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadRooms = async () => {
      try {
        const nextRooms = await getRooms();

        if (!isMounted) {
          return;
        }

        setRooms(nextRooms);
        setSelectedRoomId((current) => {
          if (!nextRooms.length) {
            return '';
          }

          if (current && nextRooms.some((room) => room._id === current)) {
            return current;
          }

          return nextRooms[0]._id;
        });
        setErrorMessage('');
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setErrorMessage(error.message || 'Unable to load greenhouse data.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadRooms();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (initialSelectedRoomId) {
      setSelectedRoomId(initialSelectedRoomId);
    }
  }, [initialSelectedRoomId]);

  const featuredRoom =
    rooms.find((room) => room._id === selectedRoomId) ??
    rooms[0] ??
    null;

  return (
    <main className="dashboard-page">
      <div className="dashboard-shell">
        <div className="dashboard-topbar dashboard-topbar--split">
          <button className="dashboard-topbar__link" onClick={onGoHome} type="button">
            Back to Landing Page
          </button>
          <button className="dashboard-topbar__link" onClick={onOpenRooms} type="button">
            Open Rooms CRUD
          </button>
        </div>

        {!isLoading && rooms.length > 1 ? (
          <section className="dashboard-room-switcher" aria-label="Room switcher">
            <div className="dashboard-room-switcher__list">
              {rooms.map((room) => {
                const isActive = room._id === featuredRoom?._id;

                return (
                  <button
                    key={room._id}
                    className={`dashboard-room-switcher__item ${isActive ? 'is-active' : ''}`}
                    onClick={() => setSelectedRoomId(room._id)}
                    type="button"
                  >
                    <span className="dashboard-room-switcher__title">{room.location}</span>
                    <span className="dashboard-room-switcher__meta">
                      {room.device_id} - {room.type}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        ) : null}

        <Header featuredRoom={featuredRoom} isLoading={isLoading} roomCount={rooms.length} />

        {errorMessage ? <p className="dashboard-feedback">{errorMessage}</p> : null}

        {!errorMessage && !isLoading ? (
          <p className="dashboard-feedback dashboard-feedback--soft">
            Live backend data loaded for {rooms.length} room{rooms.length === 1 ? '' : 's'}.
          </p>
        ) : null}

        <div className="dashboard-layout">
          <div className="dashboard-layout__main">
            <GreenhouseCard featuredRoom={featuredRoom} isLoading={isLoading} />
            <TrendChart featuredRoom={featuredRoom} isLoading={isLoading} />
          </div>

          <aside className="dashboard-layout__side">
            <QuickControls featuredRoom={featuredRoom} isLoading={isLoading} />
          </aside>
        </div>

        <div className="dashboard-spacer" />
        <BottomNav currentRoute="/dashboard" onNavigate={onNavigate} />
      </div>
    </main>
  );
}

export default DashboardPage;
