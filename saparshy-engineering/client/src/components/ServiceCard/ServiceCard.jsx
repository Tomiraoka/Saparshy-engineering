import React from 'react';
import { Link } from 'react-router-dom';
import { FaTools, FaArrowRight } from 'react-icons/fa';
import { buildServerUrl } from '../../config/api';
import './ServiceCard.css';

const ServiceCard = ({ service }) => {
  const imageUrl = service.image?.startsWith('/uploads')
    ? buildServerUrl(service.image)
    : service.image;

  const excerpt = service.shortDescription
    || (service.description?.length > 110
      ? service.description.substring(0, 110) + '...'
      : service.description);

  return (
    <div className="service-card">
      <div className="service-card-img-wrapper">
        {imageUrl ? (
          <img src={imageUrl} alt={service.title} className="service-card-img" />
        ) : (
          <div className="service-card-img-placeholder">
            <FaTools />
          </div>
        )}
        {service.category && <span className="service-category-badge">{service.category}</span>}
      </div>

      <div className="service-card-content">
        <h3 className="service-title">{service.title}</h3>
        <p className="service-excerpt">{excerpt}</p>

        <div className="service-footer">
          <Link to={`/services/${service._id}`} className="service-btn">
            Подробнее <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
