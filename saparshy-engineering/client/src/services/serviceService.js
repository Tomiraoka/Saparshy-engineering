import { buildApiUrl } from '../config/api';

const API_URL = buildApiUrl('/services');

const authHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getServices = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Ошибка загрузки услуг');
  return await response.json();
};

export const getServiceById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error('Ошибка загрузки услуги');
  return await response.json();
};

export const createService = async (formData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Ошибка создания услуги');
  return data;
};

export const updateService = async (id, formData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Ошибка обновления услуги');
  return data;
};

export const deleteService = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Ошибка удаления услуги');
  return data;
};
