import React from 'react';
import { FaIndustry, FaUserTie, FaBalanceScale, FaHandshake, FaMapMarkerAlt, FaPhoneAlt, FaUserCircle, FaClipboardList, FaCalculator, FaFileSignature, FaHardHat, FaCheckDouble } from 'react-icons/fa';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>О компании</h1>
      </div>

      <div className="container about-container">

        <section className="about-section top-agency-section">
          <div className="agency-text">
            <div>
              <h2>ТОО «Saparshy Engineering» <br /><span>инжиниринг без посредников</span></h2>
              <p className="agency-description">
                Мы занимаемся проектированием, инженерными изысканиями и техническим
                надзором для промышленных и гражданских объектов. Работаем напрямую с
                заказчиком — от технического задания до сдачи объекта в эксплуатацию,
                без лишних посредников и задержек.
              </p>
            </div>
          </div>
          <div className="agency-graphic">
            <div className="blueprint-card">
              <FaIndustry className="blueprint-icon" />
            </div>
            <div className="blueprint-grid-decor"></div>
          </div>
        </section>

        <section className="about-section features-section-about">
          <h2>Что нас отличает</h2>
          <div className="about-features-grid">
            <div className="about-feature-card">
              <div className="about-feature-icon"><FaUserTie /></div>
              <h3>Квалифицированная команда</h3>
              <p>Инженеры с практическим опытом реализации промышленных и гражданских объектов</p>
            </div>
            <div className="about-feature-card">
              <div className="about-feature-icon"><FaBalanceScale /></div>
              <h3>Соответствие нормам РК</h3>
              <p>Проектная документация разрабатывается и согласовывается по действующим СН и ГОСТ</p>
            </div>
            <div className="about-feature-card">
              <div className="about-feature-icon"><FaHandshake /></div>
              <h3>Полный цикл</h3>
              <p>Изыскания, проектирование, технадзор — закрываем все этапы одной командой</p>
            </div>
            <div className="about-feature-card">
              <div className="about-feature-icon"><FaIndustry /></div>
              <h3>Прозрачные условия</h3>
              <p>Чёткий договор, понятная смета и отчётность на каждом этапе работ</p>
            </div>
          </div>
        </section>

        <section className="about-section process-section">
          <h2>Как мы работаем</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="process-step-icon"><FaClipboardList /></div>
              <h3>1. Заявка</h3>
              <p>Оставляете заявку на сайте или по телефону — уточняем задачу</p>
            </div>
            <div className="process-step">
              <div className="process-step-icon"><FaCalculator /></div>
              <h3>2. Расчёт</h3>
              <p>Оцениваем объём работ, сроки и стоимость</p>
            </div>
            <div className="process-step">
              <div className="process-step-icon"><FaFileSignature /></div>
              <h3>3. Договор</h3>
              <p>Заключаем договор с прозрачными условиями и графиком</p>
            </div>
            <div className="process-step">
              <div className="process-step-icon"><FaHardHat /></div>
              <h3>4. Реализация</h3>
              <p>Выполняем работы, держим заказчика в курсе на каждом этапе</p>
            </div>
            <div className="process-step">
              <div className="process-step-icon"><FaCheckDouble /></div>
              <h3>5. Сдача</h3>
              <p>Передаём готовую документацию или объект заказчику</p>
            </div>
          </div>
        </section>

        <section className="about-section requisites-section">
          <div className="requisites-box">
            <div className="requisites-text">
              <h2>Реквизиты <br /><span>и контакты</span></h2>
              <ul className="requisites-list">
                <li><FaUserCircle /> Директор: Нурмухамбетов Канат</li>
                <li><FaMapMarkerAlt /> г. Астана, район Сарайшык, ул. Байтурсынова, 67-47</li>
                <li><FaPhoneAlt /> 8-777-107-66-77</li>
              </ul>
            </div>
            <div className="requisites-card">
              <h3>Связаться с нами</h3>
              <p>Расскажите о вашей задаче — подскажем оптимальное решение и сроки</p>
              <a href="/contacts" className="requisites-btn">Оставить заявку</a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
