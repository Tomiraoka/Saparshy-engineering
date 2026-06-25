import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import { FaUser, FaPhone, FaEnvelope, FaCommentDots } from 'react-icons/fa';
import { getServices } from '../../services/serviceService';
import { createRequest } from '../../services/requestService';
import './RequestForm.css';

const RequestForm = ({ initialService = '' }) => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: initialService,
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    getServices().then(setServices).catch(() => setServices([]));
  }, []);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const notifyByEmail = async () => {
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) return;

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        to_email: import.meta.env.VITE_COMPANY_EMAIL || '',
        from_name: formData.name,
        from_phone: formData.phone,
        from_email: formData.email,
        service: formData.service || 'Не указана',
        message: formData.message || 'Без сообщения',
      }, PUBLIC_KEY);
    } catch (error) {
      console.error('EmailJS: не удалось отправить уведомление', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createRequest(formData);
      await notifyByEmail();
      setSent(true);
      toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
      setFormData({ name: '', phone: '', email: '', service: '', message: '' });
    } catch (error) {
      toast.error(error.message || 'Не удалось отправить заявку');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="request-form-success">
        <h3>Спасибо за обращение!</h3>
        <p>Ваша заявка принята. Наш специалист свяжется с вами в ближайшее время.</p>
        <button className="request-form-again-btn" onClick={() => setSent(false)}>
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  return (
    <form className="request-form" onSubmit={handleSubmit}>
      <div className="request-form-row">
        <div className="request-input-group">
          <label><FaUser /> Имя</label>
          <input
            type="text"
            name="name"
            placeholder="Ваше имя"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="request-input-group">
          <label><FaPhone /> Телефон</label>
          <input
            type="tel"
            name="phone"
            placeholder="+7 (700) 000-00-00"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="request-form-row">
        <div className="request-input-group">
          <label><FaEnvelope /> Email (необязательно)</label>
          <input
            type="email"
            name="email"
            placeholder="example@mail.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="request-input-group">
          <label>Интересующая услуга</label>
          <select name="service" value={formData.service} onChange={handleChange}>
            <option value="">Выберите услугу (необязательно)</option>
            {services.map((s) => (
              <option key={s._id} value={s.title}>{s.title}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="request-input-group">
        <label><FaCommentDots /> Сообщение</label>
        <textarea
          name="message"
          placeholder="Расскажите немного о вашей задаче..."
          value={formData.message}
          onChange={handleChange}
          rows={4}
        />
      </div>

      <button type="submit" className="request-submit-btn" disabled={loading}>
        {loading ? 'Отправка...' : 'Оставить заявку'}
      </button>
    </form>
  );
};

export default RequestForm;
