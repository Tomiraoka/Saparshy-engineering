import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src="/logo.svg" alt="Saparshy Engineering" className="header-logo-img" />
          <span className="header-brand-text">Saparshy Engineering</span>
        </Link>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Меню"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={closeMenu}>
            Главная
          </Link>
          <Link to="/services" className="nav-link" onClick={closeMenu}>
            Услуги
          </Link>
          <Link to="/news" className="nav-link" onClick={closeMenu}>
            Новости
          </Link>
          <Link to="/about" className="nav-link" onClick={closeMenu}>
            О нас
          </Link>
          <Link to="/contacts" className="nav-link" onClick={closeMenu}>
            Контакты
          </Link>

          <div className="mobile-user-actions">
            {user ? (
              <>
                <Link to="/contact-requests" className="header-outline-btn" onClick={closeMenu}>
                  Заявки
                </Link>
                <button
                  className="header-outline-btn"
                  onClick={() => { logout(); closeMenu(); }}
                >
                  Выход
                </button>
              </>
            ) : (
              <Link to="/auth" className="header-outline-btn" onClick={closeMenu}>
                Вход для администратора
              </Link>
            )}
            <Link to="/contacts" className="header-cta-btn" onClick={closeMenu}>
              Оставить заявку
            </Link>
          </div>
        </nav>

        <div className="user-actions">
          {user ? (
            <div className="user-menu">
              <Link to="/contact-requests" className="header-outline-btn">
                Заявки
              </Link>
              <button className="header-outline-btn" onClick={logout}>
                Выход
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/auth" className="header-outline-btn">
                Вход
              </Link>
            </div>
          )}
          <Link to="/contacts" className="header-cta-btn">
            Оставить заявку
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
