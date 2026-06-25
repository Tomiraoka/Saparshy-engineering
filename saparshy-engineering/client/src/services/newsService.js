import { buildApiUrl } from '../config/api';

const API_URL = buildApiUrl('/news');

const authHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getNews = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Ошибка загрузки новостей');
  return await response.json();
};

export const getNewsById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error('Ошибка загрузки новости');
  return await response.json();
};

export const createNews = async (formData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Ошибка создания новости');
  return data;
};

export const updateNews = async (id, formData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Ошибка обновления новости');
  return data;
};

export const deleteNews = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Ошибка удаления новости');
  return data;
};

export const addComment = async (newsId, userId, text) => {
  const response = await fetch(`${API_URL}/${newsId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, text }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Ошибка добавления комментария');
  return data;
};
