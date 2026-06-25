import { buildApiUrl } from '../config/api';

const API_URL = buildApiUrl('/requests');

const authHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Публичная отправка заявки — без авторизации
export const createRequest = async (payload) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Ошибка отправки заявки');
  return data;
};

// Ниже — только для админ-панели
export const getRequests = async () => {
  const response = await fetch(API_URL, { headers: authHeaders() });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Ошибка загрузки заявок');
  return data;
};

export const updateRequestStatus = async (id, status) => {
  const response = await fetch(`${API_URL}/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ status }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Ошибка обновления статуса');
  return data;
};
