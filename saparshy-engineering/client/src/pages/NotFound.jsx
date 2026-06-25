import React from 'react';
import { Link } from 'react-router-dom';
import { FaTools } from 'react-icons/fa';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">

        <div className="not-found-icon-wrapper">
          <FaTools className="not-found-icon" />
          <span className="not-found-code">404</span>
        </div>

        <h2>Страница не найдена</h2>
        <p>
          Возможно, ссылка устарела или маршрут был изменен.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="not-found-btn">
            Вернуться на главную
          </Link>
          <Link to="/services" className="not-found-btn">
            Смотреть услуги
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
