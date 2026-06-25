import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getServiceById, updateService } from '../services/serviceService';
import toast from 'react-hot-toast';
import '../styles/AddService.css';

const CATEGORY_SUGGESTIONS = [
  'Проектирование',
  'Инженерные изыскания',
  'Технический надзор',
  'Строительный контроль',
  'Консультации и экспертиза',
];

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: '', shortDescription: '', description: '', imageUrl: '' });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const service = await getServiceById(id);
        setFormData({ ...service, imageUrl: service.image && !service.image.startsWith('/uploads') ? service.image : '' });
      } catch (error) { toast.error('Ошибка'); }
    };
    fetchService();
  }, [id]);

  if (!user || user.role !== 'admin') return <div className="form-bg"><div className="glass-form"><h2>Доступ запрещен</h2></div></div>;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
    if (e.target.files[0]) {
      toast.success('Фото выбрано');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (imageFile) data.append('image', imageFile);

    try {
      await updateService(id, data);
      toast.success('Обновлено!');
      navigate(`/services/${id}`);
    } catch (error) {
      toast.error(error.message || 'Ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-bg">
      <div className="glass-form">
        <h2>Редактировать услугу</h2>
        <form onSubmit={handleSubmit}>
          <input className="form-input" name="title" value={formData.title || ''} required onChange={handleChange} />

          <input
            className="form-input"
            name="category"
            value={formData.category || ''}
            list="category-suggestions"
            required
            onChange={handleChange}
          />
          <datalist id="category-suggestions">
            {CATEGORY_SUGGESTIONS.map((c) => <option key={c} value={c} />)}
          </datalist>

          <input className="form-input" name="shortDescription" value={formData.shortDescription || ''} placeholder="Краткое описание (для карточки)" onChange={handleChange} />
          <textarea className="form-input area" name="description" value={formData.description || ''} required onChange={handleChange} />

          <div className="file-box">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <button type="button" onClick={triggerFileInput} className="blue-btn" style={{ marginTop: 0, marginBottom: '8px' }}>
              {imageFile ? 'ФОТО ВЫБРАНО' : 'ОБНОВИТЬ ФОТО'}
            </button>
            <input className="form-input" name="imageUrl" value={formData.imageUrl || ''} placeholder="URL изображения" onChange={handleChange} disabled={!!imageFile} />
          </div>

          <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
            <button type="submit" className="blue-btn" disabled={loading}>СОХРАНИТЬ</button>
            <button type="button" className="blue-btn" onClick={() => navigate(`/services/${id}`)}>ОТМЕНА</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditService;
