import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getServiceById, deleteService } from '../services/serviceService';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader/Loader';
import toast from 'react-hot-toast';
import { FaTools, FaArrowRight } from 'react-icons/fa';
import { buildServerUrl } from '../config/api';
import '../styles/ServiceDetails.css';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      const data = await getServiceById(id);
      setService(data);
    } catch (error) {
      toast.error('Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Удалить услугу навсегда?')) {
      try {
        await deleteService(id);
        toast.success('Удалено!');
        navigate('/services');
      } catch (error) {
        toast.error('Ошибка');
      }
    }
  };

  const handleRequestClick = () => {
    navigate('/contacts', { state: { service: service.title } });
  };

  if (loading) return <Loader />;
  if (!service) {
    return (
      <div className="details-bg">
        <div className="glass-panel">
          <h2>Услуга не найдена</h2>
          <Link to="/services" className="agency-link">Назад к услугам <FaArrowRight /></Link>
        </div>
      </div>
    );
  }

  const imageUrl = service.image?.startsWith('/uploads')
    ? buildServerUrl(service.image)
    : service.image;

  return (
    <div className="details-bg">
      <div className="glass-panel">
        {imageUrl ? (
          <img src={imageUrl} alt={service.title} className="details-img" />
        ) : (
          <div className="details-img-placeholder">
            <FaTools />
          </div>
        )}

        <h1 className="details-title">{service.title}</h1>

        <div className="details-info-bar">
          {service.category && <span className="category-tag">{service.category}</span>}
        </div>

        {user?.role === 'admin' && (
          <div className="admin-controls">
            <button onClick={() => navigate(`/edit-service/${id}`)} className="blue-btn">
              РЕДАКТИРОВАТЬ
            </button>
            <button onClick={handleDelete} className="blue-btn">
              УДАЛИТЬ
            </button>
          </div>
        )}

        <p className="details-desc">{service.description}</p>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button onClick={handleRequestClick} className="book-tour-btn">
            ОСТАВИТЬ ЗАЯВКУ НА ЭТУ УСЛУГУ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
