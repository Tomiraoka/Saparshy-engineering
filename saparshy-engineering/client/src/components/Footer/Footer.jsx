import React from 'react'
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">

          <div className="footer-section">
            <Link to="/" className="footer-logo">
              <img
                src="/logo.svg"
                alt="Saparshy Engineering Logo"
                className="footer-logo-img"
              />
              <span className="footer-brand-text">Saparshy Engineering</span>
            </Link>
            <p>Инжиниринговая компания: проектирование, инженерные изыскания и технический надзор для промышленных и гражданских объектов.</p>
          </div>

          <div className="footer-section">
            <h4>Быстрые ссылки</h4>
            <ul>
              <li><Link to="/">Главная</Link></li>
              <li><Link to="/services">Услуги</Link></li>
              <li><Link to="/news">Новости</Link></li>
              <li><Link to="/about">О нас</Link></li>
              <li><Link to="/contacts">Контакты</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Контакты</h4>
            <ul className="contacts-list">
              <li><FaMapMarkerAlt /> <span>г. Астана, район Сарайшык, ул. Байтурсынова 67-47</span></li>
              <li><FaPhoneAlt /> <span>8-777-107-66-77</span></li>
              <li><FaEnvelope /> <span>info@saparshy-engineering.kz</span></li>
            </ul>
          </div>

          <div className="footer-section right-align">
            <h4>Режим работы</h4>
            <ul className="contacts-list">
              <li><FaClock /> <span>Пн–Пт: 09:00–18:00</span></li>
              <li><FaClock /> <span>Сб–Вс: выходной</span></li>
            </ul>
            <p className="footer-director">Директор: Нурмухамбетов Канат</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 ТОО «Saparshy Engineering». Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
