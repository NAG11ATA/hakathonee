const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

async function request(path, options = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });
  } catch (error) {
    throw new Error(
      `Unable to reach backend at ${API_BASE_URL}. Check that the backend is running and CORS allows your frontend origin.`
    );
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Request failed (${response.status})`);
  }

  return data;
}

export async function getRooms() {
  const data = await request('/api/rooms');
  return data.rooms ?? [];
}

export async function createRoom(payload) {
  const data = await request('/api/rooms/add', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return data.room;
}

export async function updateRoomTarget(id, payload) {
  const normalizedPayload = {
    ...payload,
    target: {
      temperature: payload.targetTemperature,
      humidity: payload.targetHumidity,
      status: payload.targetStatus,
    },
  };

  const data = await request(`/api/rooms/${id}/target`, {
    method: 'PATCH',
    body: JSON.stringify(normalizedPayload),
  });

  return data.room;
}

export async function updateRoomCurrent(id, payload) {
  const normalizedPayload = {
    ...payload,
    current: {
      temperature: payload.currentTemperature,
      humidity: payload.currentHumidity,
      status: payload.currentStatus,
    },
  };

  const data = await request(`/api/rooms/${id}/current`, {
    method: 'PATCH',
    body: JSON.stringify(normalizedPayload),
  });

  return data.room;
}

export async function deleteRoom(id) {
  await request(`/api/rooms/${id}`, {
    method: 'DELETE',
  });
}
