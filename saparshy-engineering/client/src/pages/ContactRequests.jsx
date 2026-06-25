import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getRequests, updateRequestStatus } from '../services/requestService';
import Loader from '../components/Loader/Loader';
import toast from 'react-hot-toast';
import { FaPhoneAlt, FaEnvelope, FaInbox } from 'react-icons/fa';
import '../styles/ContactRequests.css';

const STATUS_LABELS = {
  new: 'Новая',
  in_progress: 'В обработке',
  done: 'Выполнена',
};

const ContactRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.role === 'admin') fetchRequests();
  }, [user]);

  const fetchRequests = async () => {
    try {
      const data = await getRequests();
      setRequests(data);
    } catch (err) {
      setError(err.message || 'Не удалось загрузить заявки');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const updated = await updateRequestStatus(id, status);
      setRequests((prev) => prev.map((r) => (r._id === id ? updated : r)));
      toast.success('Статус обновлён');
    } catch (err) {
      toast.error(err.message || 'Ошибка обновления статуса');
    }
  };

  if (!user || user.role !== 'admin') {
    return <div className="requests-page"><div className="requests-denied"><h2>Доступ запрещен</h2></div></div>;
  }

  if (loading) return <Loader />;

  return (
    <div className="requests-page">
      <div className="requests-hero">
        <h1>Заявки клиентов</h1>
      </div>

      <div className="container requests-container">
        {error ? (
          <h2 style={{ textAlign: 'center', color: '#ff4d4f' }}>{error}</h2>
        ) : requests.length === 0 ? (
          <div className="requests-empty">
            <FaInbox className="requests-empty-icon" />
            <h2>Заявок пока нет</h2>
            <p>Новые заявки с сайта появятся здесь</p>
          </div>
        ) : (
          <div className="requests-table-wrapper">
            <table className="requests-table">
              <thead>
                <tr>
                  <th>Имя</th>
                  <th>Контакты</th>
                  <th>Услуга</th>
                  <th>Сообщение</th>
                  <th>Дата</th>
                  <th>Статус</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r._id}>
                    <td className="requests-name-cell">{r.name}</td>
                    <td>
                      <div className="requests-contact-cell">
                        <span><FaPhoneAlt /> <a href={`tel:${r.phone}`}>{r.phone}</a></span>
                        {r.email && <span><FaEnvelope /> <a href={`mailto:${r.email}`}>{r.email}</a></span>}
                      </div>
                    </td>
                    <td>{r.service || '—'}</td>
                    <td className="requests-message-cell">{r.message || '—'}</td>
                    <td className="requests-date-cell">
                      {new Date(r.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td>
                      <select
                        className={`status-select status-${r.status}`}
                        value={r.status}
                        onChange={(e) => handleStatusChange(r._id, e.target.value)}
                      >
                        {Object.entries(STATUS_LABELS).map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactRequests;
