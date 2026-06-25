import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTools, FaPlus } from 'react-icons/fa';
import ServiceCard from '../components/ServiceCard/ServiceCard';
import Loader from '../components/Loader/Loader';
import { getServices } from '../services/serviceService';
import { useAuth } from '../context/AuthContext';
import '../styles/Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchQuery, setActiveSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (err) {
      setError('Не удалось загрузить список услуг.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setActiveSearchQuery(searchQuery);
  };

  if (loading) return <Loader />;

  const categories = ['all', ...new Set(services.map(s => s.category).filter(Boolean))];

  const filteredServices = services.filter(service => {
    const query = activeSearchQuery.toLowerCase();
    const matchesQuery =
      (service.title && service.title.toLowerCase().includes(query)) ||
      (service.category && service.category.toLowerCase().includes(query));
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="services-page">
      <div className="services-hero">
        <h1>Услуги компании</h1>
        <p>Полный цикл инженерного сопровождения: от изысканий до сдачи объекта</p>
        {isAdmin && (
          <Link to="/add-service" className="admin-add-btn">
            <FaPlus /> Добавить услугу
          </Link>
        )}
      </div>

      <div className="container services-container">
        {error ? (
          <h2 style={{ textAlign: 'center', color: '#ff4d4f' }}>{error}</h2>
        ) : services.length === 0 ? (
          <div className="empty-services-wrapper">
            <div className="empty-services-content">
              <FaTools className="empty-services-icon" />
              <h2>Каталог пока пуст</h2>
              <p>Администратор еще не добавил ни одной услуги. Загляните сюда немного позже!</p>
              {isAdmin && (
                <Link to="/add-service" className="admin-add-btn" style={{ marginTop: '16px' }}>
                  <FaPlus /> Добавить первую услугу
                </Link>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="search-white-block">
              <form onSubmit={handleSearch} className="search-form-flex">
                <input
                  type="text"
                  className="search-input-field"
                  placeholder="Поиск по названию или категории..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-find-btn">Найти</button>
              </form>

              {categories.length > 1 && (
                <div className="category-filter-row">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      className={`category-chip ${activeCategory === cat ? 'active' : ''}`}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat === 'all' ? 'Все категории' : cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {filteredServices.length === 0 ? (
              <div className="empty-services-wrapper">
                <div className="empty-services-content">
                  <FaTools className="empty-services-icon" />
                  <h2>Ничего не найдено</h2>
                  <p>По заданным параметрам услуг не найдено. Попробуйте изменить запрос или категорию.</p>
                </div>
              </div>
            ) : (
              <div className="services-grid">
                {filteredServices.map(service => (
                  <ServiceCard key={service._id} service={service} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Services;
