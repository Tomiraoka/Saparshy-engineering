import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaDraftingCompass, FaHardHat, FaClock, FaAward, FaArrowRight } from 'react-icons/fa'
import ServiceCard from '../components/ServiceCard/ServiceCard'
import { getServices } from '../services/serviceService'
import '../styles/Main.css'

const Main = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getServices()
      .then((data) => setServices(data.slice(0, 3)))
      .catch(() => setServices([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="home-page">

      <section className="hero-section">
        <div className="container hero-container">
          <div className="welcome-box">
            <span className="hero-eyebrow">ТОО «Saparshy Engineering»</span>
            <h1 className="hero-title">Инженерные решения, на которые можно опереться</h1>
            <p className="hero-subtitle">
              Проектирование, инженерные изыскания и технический надзор для промышленных
              и гражданских объектов в Астане и по всему Казахстану. Берём проект от идеи
              до сдачи в эксплуатацию — с соблюдением сроков, норм и бюджета.
            </p>
            <div className="hero-actions">
              <Link to="/services" className="hero-btn-primary">Наши услуги</Link>
              <Link to="/contacts" className="hero-btn-secondary">Оставить заявку</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="agency-section">
        <div className="container agency-container">
          <div className="agency-text">
            <div>
              <h2>Партнёр для вашего <br /><span>инженерного проекта</span></h2>
              <p className="agency-description">
                Saparshy Engineering — инжиниринговая компания из Астаны. Мы объединяем
                проектировщиков, изыскателей и инженеров технического надзора в одной команде,
                чтобы заказчик получал результат, а не переписку между подрядчиками.
              </p>
              <Link to="/about" className="agency-link">
                Подробнее о компании <FaArrowRight />
              </Link>
            </div>
          </div>
          <div className="agency-graphic">
            <div className="blueprint-card">
              <FaDraftingCompass className="blueprint-icon" />
            </div>
            <div className="blueprint-grid-decor"></div>
          </div>
        </div>
      </section>

      <section className="services-preview-section">
        <div className="container">
          <h2 className="section-title">Наши услуги</h2>
          <p className="section-subtitle">
            От технического заключения до полного сопровождения строительства
          </p>

          {loading ? (
            <div className="services-preview-grid">
              {[1, 2, 3].map((i) => <div key={i} className="service-skeleton" />)}
            </div>
          ) : services.length > 0 ? (
            <>
              <div className="services-preview-grid">
                {services.map((service) => (
                  <ServiceCard key={service._id} service={service} />
                ))}
              </div>
              <div className="services-preview-cta">
                <Link to="/services" className="agency-link">
                  Смотреть все услуги <FaArrowRight />
                </Link>
              </div>
            </>
          ) : (
            <p className="services-preview-empty">
              Каталог услуг пока заполняется. Свяжитесь с нами напрямую — расскажем обо всех направлениях работы.
            </p>
          )}
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Почему выбирают нас</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><FaDraftingCompass /></div>
              <h3>Проектирование под нормы РК</h3>
              <p>Разрабатываем и согласовываем документацию в соответствии с действующими СН и ГОСТ</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FaHardHat /></div>
              <h3>Технадзор на объекте</h3>
              <p>Контролируем качество и безопасность работ на каждом этапе строительства</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FaClock /></div>
              <h3>Соблюдение сроков</h3>
              <p>Чёткий график работ и прозрачная отчётность по каждому этапу проекта</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FaAward /></div>
              <h3>Опыт и квалификация</h3>
              <p>Команда инженеров с практическим опытом реализации промышленных объектов</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band-container">
          <div>
            <h2>Готовы обсудить ваш проект?</h2>
            <p>Оставьте заявку — наш инженер свяжется с вами и уточнит детали</p>
          </div>
          <Link to="/contacts" className="cta-band-btn">Оставить заявку</Link>
        </div>
      </section>

    </div>
  )
}

export default Main
