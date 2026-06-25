import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhoneAlt, FaUserCircle, FaEnvelope } from 'react-icons/fa';
import RequestForm from '../components/RequestForm/RequestForm';
import '../styles/Contacts.css';

const MAP_QUERY = encodeURIComponent('Астана, район Сарайшык, улица Байтурсынова 67-47');

const Contacts = () => {
  const location = useLocation();
  const initialService = location.state?.service || '';

  return (
    <div className="contacts-page">
      <div className="contacts-hero">
        <h1>Контакты</h1>
        <p>Оставьте заявку — мы свяжемся с вами в течение рабочего дня</p>
      </div>

      <div className="container contacts-container">
        <div className="contacts-info-col">
          <h2>ТОО «Saparshy Engineering»</h2>

          <ul className="contacts-list">
            <li><FaUserCircle /> Директор: Нурмухамбетов Канат</li>
            <li><FaMapMarkerAlt /> г. Астана, район Сарайшык, ул. Байтурсынова, 67-47</li>
            <li><FaPhoneAlt /> <a href="tel:+77771076677">8-777-107-66-77</a></li>
            <li><FaEnvelope /> <a href="mailto:info@saparshy-engineering.kz">info@saparshy-engineering.kz</a></li>
          </ul>

          <div className="contacts-map-wrapper">
            <iframe
              title="Карта"
              src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
              width="100%"
              height="280"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        </div>

        <div className="contacts-form-col">
          <div className="contacts-form-card">
            <h2>Оставить заявку</h2>
            <RequestForm initialService={initialService} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
