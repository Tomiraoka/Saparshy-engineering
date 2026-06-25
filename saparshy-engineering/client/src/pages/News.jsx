import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaNewspaper, FaPlus } from 'react-icons/fa';
import NewsCard from '../components/NewsCard/NewsCard';
import Loader from '../components/Loader/Loader';
import { getNews } from '../services/newsService';
import { useAuth } from '../context/AuthContext';
import '../styles/News.css';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchQuery, setActiveSearchQuery] = useState('');

  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const data = await getNews();
      setNews(data);
    } catch (err) {
      console.error('Ошибка:', err);
      setError('Не удалось загрузить новости. Проверьте подключение к серверу.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setActiveSearchQuery(searchQuery);
  };

  if (loading) return <Loader />;

  const filteredNews = news.filter(item => {
    const query = activeSearchQuery.toLowerCase();
    return (
      (item.title && item.title.toLowerCase().includes(query)) ||
      (item.content && item.content.toLowerCase().includes(query))
    );
  });

  return (
    <div className="news-page">

      <div className="news-hero">
        <h1>Новости и проекты</h1>
        <p>Завершённые объекты, события компании и отраслевые новости</p>
        {isAdmin && (
          <Link to="/add-news" className="admin-add-btn">
            <FaPlus /> Добавить новость
          </Link>
        )}
      </div>

      <div className="container news-page-container">
        {error ? (
          <h2 style={{ textAlign: 'center', color: '#ff4d4f' }}>{error}</h2>
        ) : news.length === 0 ? (
          <div className="empty-news-wrapper">
            <div className="empty-news-content">
              <FaNewspaper className="empty-news-icon" />
              <h2>Новостей пока нет</h2>
              <p>Администратор еще не опубликовал ни одной записи. Загляните сюда немного позже!</p>
              {isAdmin && (
                <Link to="/add-news" className="admin-add-btn" style={{ marginTop: '16px' }}>
                  <FaPlus /> Добавить первую новость
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
                  placeholder="Поиск по названию или тексту..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-find-btn">Найти</button>
              </form>
            </div>

            {filteredNews.length === 0 ? (
              <div className="empty-news-wrapper">
                <div className="empty-news-content">
                  <FaNewspaper className="empty-news-icon" />
                  <h2>Ничего не найдено</h2>
                  <p>По запросу «{activeSearchQuery}» записей не найдено. Попробуйте изменить параметры поиска.</p>
                </div>
              </div>
            ) : (
              <div className="news-grid">
                {filteredNews.map(item => (
                  <NewsCard key={item._id} news={item} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default News;
