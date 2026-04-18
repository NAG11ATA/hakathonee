import { useEffect, useState } from 'react';
import BottomNav from '../components/dashboard/BottomNav';
import {
  createRoom,
  deleteRoom,
  getRooms,
  updateRoomTarget,
} from '../data/dashboardApi';
import '../styles/rooms-page.css';

const emptyCreateForm = {
  device_id: '',
  location: '',
  type: '',
  targetTemperature: '',
  targetHumidity: '',
  targetStatus: 'active',
};

const emptyEditForm = {
  targetTemperature: '',
  targetHumidity: '',
  targetStatus: 'active',
};

const isRequiredValueMissing = (value) => value === '' || value === null || value === undefined;

function RoomsPage({ onGoHome, onOpenDashboard, onNavigate }) {
  const [rooms, setRooms] = useState([]);
  const [createForm, setCreateForm] = useState(emptyCreateForm);
  const [editForm, setEditForm] = useState(emptyEditForm);
  const [editingRoomId, setEditingRoomId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    setIsLoading(true);

    try {
      const nextRooms = await getRooms();
      setRooms(nextRooms);
      setFeedback({ type: '', message: '' });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.message || 'Unable to load rooms.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateChange = (event) => {
    const { name, value } = event.target;
    setCreateForm((current) => ({ ...current, [name]: value }));
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditForm((current) => ({ ...current, [name]: value }));
  };

  const handleCreateSubmit = async (event) => {
    event.preventDefault();

    if (
      !createForm.device_id ||
      !createForm.location ||
      !createForm.type ||
      !createForm.targetTemperature ||
      !createForm.targetHumidity
    ) {
      setFeedback({
        type: 'error',
        message: 'Please fill in all create fields before saving.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const createdRoom = await createRoom({
        device_id: createForm.device_id,
        location: createForm.location,
        type: createForm.type,
        targetTemperature: Number(createForm.targetTemperature),
        targetHumidity: Number(createForm.targetHumidity),
        targetStatus: createForm.targetStatus,
      });

      setRooms((current) => [createdRoom, ...current]);
      setCreateForm(emptyCreateForm);
      setFeedback({
        type: 'success',
        message: `Room ${createdRoom.location} created successfully.`,
      });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.message || 'Unable to create room.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEditing = (room) => {
    const target = room.target || {};

    setEditingRoomId(room._id);
    setEditForm({
      targetTemperature: target.temperature ?? '',
      targetHumidity: target.humidity ?? '',
      targetStatus: target.status || 'active',
    });
    setFeedback({
      type: 'info',
      message: `Editing ${room.location}. Update target values, then save.`,
    });
  };

  const cancelEditing = () => {
    setEditingRoomId('');
    setEditForm(emptyEditForm);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    if (!editingRoomId) {
      return;
    }

    if (
      isRequiredValueMissing(editForm.targetTemperature) ||
      isRequiredValueMissing(editForm.targetHumidity)
    ) {
      setFeedback({
        type: 'error',
        message: 'Complete all update fields before saving changes.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const targetRoom = await updateRoomTarget(editingRoomId, {
        targetTemperature: Number(editForm.targetTemperature),
        targetHumidity: Number(editForm.targetHumidity),
        targetStatus: editForm.targetStatus,
      });

      const updatedRoom = {
        ...(targetRoom || {}),
        target: targetRoom?.target || {},
      };

      setRooms((current) =>
        current.map((room) => (room._id === editingRoomId ? { ...room, ...updatedRoom } : room))
      );
      setFeedback({
        type: 'success',
        message: `Room ${(updatedRoom.location || targetRoom?.location || 'record')} updated successfully.`,
      });
      cancelEditing();
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.message || 'Unable to update room.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (roomId) => {
    const shouldDelete = window.confirm('Delete this room?');

    if (!shouldDelete) {
      return;
    }

    setIsSubmitting(true);

    try {
      await deleteRoom(roomId);
      setRooms((current) => current.filter((room) => room._id !== roomId));

      if (editingRoomId === roomId) {
        cancelEditing();
      }

      setFeedback({
        type: 'success',
        message: 'Room deleted successfully.',
      });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.message || 'Unable to delete room.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenRoomDashboard = (roomId) => {
    onOpenDashboard?.(roomId);
  };

  return (
    <main className="rooms-page">
      <div className="rooms-shell">
        <div className="rooms-topbar">
          <button className="rooms-link" onClick={onGoHome} type="button">
            Back Home
          </button>
          <button className="rooms-link" onClick={onOpenDashboard} type="button">
            Open Dashboard
          </button>
        </div>

        <header className="rooms-header">
          <div className="rooms-header__content">
            <span className="rooms-header__eyebrow">Rooms CRUD</span>
            <h1 className="rooms-header__title">Manage greenhouse rooms from the frontend</h1>
            <p className="rooms-header__text">
              Create new rooms, update target and current values, and delete records directly
              from the backend API.
            </p>
          </div>
          <div className="rooms-header__actions">
            <div className="rooms-header__stat">
              <span className="rooms-header__stat-label">Rooms</span>
              <div className="rooms-header__count">{rooms.length}</div>
            </div>
          </div>
        </header>

        {feedback.message ? (
          <p className={`rooms-feedback rooms-feedback--${feedback.type || 'info'}`}>
            {feedback.message}
          </p>
        ) : null}

        <section className="rooms-grid">
          <section className="rooms-panel">
            <div className="rooms-panel__header">
              <div>
                <h2 className="rooms-panel__title">Create Room</h2>
                <p className="rooms-panel__text">Add a new greenhouse zone and its target setup.</p>
              </div>
            </div>

            <form className="rooms-form" onSubmit={handleCreateSubmit}>
              <label className="rooms-field">
                <span>Device ID</span>
                <input
                  name="device_id"
                  onChange={handleCreateChange}
                  placeholder="ST-001"
                  value={createForm.device_id}
                />
              </label>

              <label className="rooms-field">
                <span>Location</span>
                <input
                  name="location"
                  onChange={handleCreateChange}
                  placeholder="Greenhouse A"
                  value={createForm.location}
                />
              </label>

              <label className="rooms-field">
                <span>Type</span>
                <input
                  name="type"
                  onChange={handleCreateChange}
                  placeholder="Poultry or Tomatoes"
                  value={createForm.type}
                />
              </label>

              <label className="rooms-field">
                <span>Target Temperature</span>
                <input
                  name="targetTemperature"
                  onChange={handleCreateChange}
                  placeholder="24"
                  type="number"
                  value={createForm.targetTemperature}
                />
              </label>

              <label className="rooms-field">
                <span>Target Humidity</span>
                <input
                  name="targetHumidity"
                  onChange={handleCreateChange}
                  placeholder="55"
                  type="number"
                  value={createForm.targetHumidity}
                />
              </label>

              <label className="rooms-field">
                <span>Target Status</span>
                <select
                  name="targetStatus"
                  onChange={handleCreateChange}
                  value={createForm.targetStatus}
                >
                  <option value="active">active</option>
                  <option value="inactive">inactive</option>
                  <option value="maintenance">maintenance</option>
                </select>
              </label>

              <button className="rooms-button rooms-button--primary" disabled={isSubmitting} type="submit">
                {isSubmitting ? 'Saving...' : 'Create Room'}
              </button>
            </form>
          </section>

          <section className="rooms-panel">
            <div className="rooms-panel__header">
              <div>
                <h2 className="rooms-panel__title">Update Room</h2>
                <p className="rooms-panel__text">Select a room below to edit target values.</p>
              </div>
            </div>

            {editingRoomId ? (
              <form className="rooms-form" onSubmit={handleEditSubmit}>
                <label className="rooms-field">
                  <span>Target Temperature</span>
                  <input
                    name="targetTemperature"
                    onChange={handleEditChange}
                    type="number"
                    value={editForm.targetTemperature}
                  />
                </label>

                <label className="rooms-field">
                  <span>Target Humidity</span>
                  <input
                    name="targetHumidity"
                    onChange={handleEditChange}
                    type="number"
                    value={editForm.targetHumidity}
                  />
                </label>

                <label className="rooms-field">
                  <span>Target Status</span>
                  <select
                    name="targetStatus"
                    onChange={handleEditChange}
                    value={editForm.targetStatus}
                  >
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>
                    <option value="maintenance">maintenance</option>
                  </select>
                </label>

                <div className="rooms-actions">
                  <button className="rooms-button rooms-button--primary" disabled={isSubmitting} type="submit">
                    Save Changes
                  </button>
                  <button className="rooms-button" onClick={cancelEditing} type="button">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <p className="rooms-empty">Choose a room from the list to edit its target values.</p>
            )}
          </section>
        </section>

        <section className="rooms-panel rooms-panel--list">
          <div className="rooms-panel__header">
            <div>
              <h2 className="rooms-panel__title">All Rooms</h2>
              <p className="rooms-panel__text">Live list of greenhouse rooms from the backend API.</p>
            </div>
          </div>

          {isLoading ? (
            <p className="rooms-empty">Loading rooms...</p>
          ) : rooms.length ? (
            <div className="rooms-list">
              {rooms.map((room) => (
                <article
                  className={`rooms-card ${editingRoomId === room._id ? 'rooms-card--selected' : ''}`}
                  onClick={() => handleOpenRoomDashboard(room._id)}
                  key={room._id}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      handleOpenRoomDashboard(room._id);
                    }
                  }}
                >
                  <div className="rooms-card__header">
                    <div>
                      <h3 className="rooms-card__title">{room.location}</h3>
                      <p className="rooms-card__meta">
                        {room.device_id} | {room.type}
                      </p>
                    </div>
                    <span className="rooms-card__status">{room.current.status}</span>
                  </div>

                  <div className="rooms-card__grid">
                    <div className="rooms-card__metric">
                      <span className="rooms-card__label">Current</span>
                      <strong className="rooms-card__value">
                        {room.current.temperature}C | {room.current.humidity}%
                      </strong>
                    </div>
                    <div className="rooms-card__metric">
                      <span className="rooms-card__label">Target</span>
                      <strong className="rooms-card__value">
                        {room.target.temperature}C | {room.target.humidity}%
                      </strong>
                    </div>
                  </div>

                  <div className="rooms-actions">
                    <button
                      className="rooms-button rooms-button--primary"
                      onClick={(event) => {
                        event.stopPropagation();
                        startEditing(room);
                      }}
                      type="button"
                    >
                      {editingRoomId === room._id ? 'Editing' : 'Edit'}
                    </button>
                    <button
                      className="rooms-button rooms-button--danger"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDelete(room._id);
                      }}
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="rooms-empty">No rooms found yet. Create your first room from the form above.</p>
          )}
        </section>

        <BottomNav currentRoute="/rooms" onNavigate={onNavigate} />
      </div>
    </main>
  );
}

export default RoomsPage;
