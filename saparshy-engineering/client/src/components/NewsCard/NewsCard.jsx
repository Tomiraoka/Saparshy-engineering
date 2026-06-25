import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaCheckCircle, FaNewspaper } from 'react-icons/fa';
import { buildServerUrl } from '../../config/api';
import './NewsCard.css';

const NewsCard = ({ news }) => {
  const imageUrl = news.image?.startsWith('/uploads')
    ? buildServerUrl(news.image)
    : news.image;

  const excerpt = news.content?.length > 110
    ? news.content.substring(0, 110) + '...'
    : news.content;

  const formattedDate = new Date(news.createdAt).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="news-card">
      <div className="news-card-img-wrapper">
        {imageUrl ? (
          <img src={imageUrl} alt={news.title} className="news-card-img" />
        ) : (
          <div className="news-card-img-placeholder">
            <FaNewspaper />
          </div>
        )}
      </div>

      <div className="news-card-content">
        <h3 className="news-title">{news.title}</h3>
        <p className="news-excerpt">{excerpt}</p>

        <div className="news-footer">
          <div className="news-meta">
            <span>
              <FaCheckCircle className="news-verified-icon" /> Saparshy Engineering
            </span>
            <span>
              <FaCalendarAlt /> {formattedDate}
            </span>
          </div>

          <Link to={`/news/${news._id}`} className="news-btn">
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
