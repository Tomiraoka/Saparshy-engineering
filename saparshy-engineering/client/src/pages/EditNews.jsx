import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getNewsById, updateNews } from '../services/newsService';
import toast from 'react-hot-toast';
import '../styles/AddNews.css';

const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', imageUrl: '' });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        const newsItem = await getNewsById(id);
        setFormData({
          title: newsItem.title,
          content: newsItem.content,
          imageUrl: newsItem.image && !newsItem.image.startsWith('/uploads') ? newsItem.image : ''
        });
      } catch (error) {
        toast.error('Не удалось загрузить данные записи');
      }
    };
    fetchNewsItem();
  }, [id]);

  if (!user || user.role !== 'admin') {
    return <div className="form-bg"><div className="glass-form"><h2>Доступ запрещен</h2></div></div>;
  }

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

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('content', formData.content);
      data.append('imageUrl', formData.imageUrl);
      if (imageFile) data.append('image', imageFile);

      await updateNews(id, data);
      toast.success('Запись обновлена!');
      navigate(`/news/${id}`);
    } catch (error) {
      toast.error('Ошибка при обновлении записи');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-bg">
      <div className="glass-form">
        <h2>Редактировать новость</h2>
        <form onSubmit={handleSubmit}>
          <input className="form-input" name="title" value={formData.title || ''} required onChange={handleChange} />
          <textarea className="form-input area" name="content" value={formData.content || ''} required onChange={handleChange} />

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
            <button type="button" className="blue-btn" onClick={() => navigate(`/news/${id}`)}>ОТМЕНА</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNews;
