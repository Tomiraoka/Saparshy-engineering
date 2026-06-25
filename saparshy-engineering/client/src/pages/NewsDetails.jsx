import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNewsById, deleteNews, addComment } from '../services/newsService';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader/Loader';
import toast from 'react-hot-toast';
import { FaUser, FaCalendarAlt, FaCheckCircle, FaNewspaper } from 'react-icons/fa';
import { buildServerUrl } from '../config/api';
import '../styles/NewsDetails.css';

const NewsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        const data = await getNewsById(id);
        setNewsItem(data);
      } catch (error) {
        toast.error('Ошибка загрузки записи');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsItem();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить эту запись?')) {
      try {
        await deleteNews(id);
        toast.success('Запись удалена!');
        navigate('/news');
      } catch (error) {
        toast.error('Ошибка при удалении');
      }
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const updated = await addComment(id, user._id, commentText);
      setNewsItem(updated);
      setCommentText('');
      toast.success('Комментарий добавлен');
    } catch (error) {
      toast.error('Ошибка при добавлении комментария');
    }
  };

  if (loading) return <Loader />;
  if (!newsItem) {
    return (
      <div className="details-bg">
        <div className="glass-panel">
          <h2>Запись не найдена</h2>
        </div>
      </div>
    );
  }

  const imageUrl = newsItem.image?.startsWith('/uploads')
    ? buildServerUrl(newsItem.image)
    : newsItem.image;

  return (
    <div className="details-bg">
      <div className="glass-panel">
        {imageUrl ? (
          <img src={imageUrl} alt={newsItem.title} className="details-img" />
        ) : (
          <div className="details-img-placeholder">
            <FaNewspaper />
          </div>
        )}
        <h1 className="details-title">{newsItem.title}</h1>

        <div className="details-info-bar">
          <div className="info-group">
            <span className="info-item">
              <FaUser /> {newsItem.author?.name || 'Saparshy Engineering'}
              {(!newsItem.author || newsItem.author?.role === 'admin') && (
                <FaCheckCircle className="admin-check" />
              )}
            </span>
            <span className="info-item">
              <FaCalendarAlt /> {new Date(newsItem.createdAt).toLocaleDateString('ru-RU')}
            </span>
          </div>
        </div>

        {user?.role === 'admin' && (
          <div className="admin-controls">
            <button onClick={() => navigate(`/edit-news/${id}`)} className="blue-btn">
              РЕДАКТИРОВАТЬ
            </button>
            <button onClick={handleDelete} className="blue-btn">
              УДАЛИТЬ
            </button>
          </div>
        )}

        <div className="details-desc">{newsItem.content}</div>

        <hr className="divider" />
        <h2>Комментарии ({newsItem.comments?.length || 0})</h2>

        {user ? (
          <form onSubmit={handleAddComment} className="comment-form">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Напишите комментарий..."
              required
              className="comment-input"
            />
            <button type="submit" className="comment-submit-btn">
              ОТПРАВИТЬ
            </button>
          </form>
        ) : (
          <p className="login-prompt">
            Войдите в аккаунт, чтобы оставить комментарий.
          </p>
        )}

        <div className="comments-list">
          {newsItem.comments?.map((comment, index) => {
            const userAvatar =
              comment.user?.avatar && comment.user.avatar !== 'default-avatar.jpg'
                ? buildServerUrl(comment.user.avatar)
                : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

            return (
              <div key={index} className="comment-card">
                <img src={userAvatar} alt="avatar" className="comment-avatar" />
                <div>
                  <h4 className="comment-author">
                    {comment.user?.name || 'Пользователь'}
                    {comment.user?.role === 'admin' && (
                      <FaCheckCircle className="admin-check" />
                    )}
                  </h4>
                  <p className="comment-text">{comment.text}</p>
                  <span className="comment-date">
                    {new Date(comment.createdAt).toLocaleDateString('ru-RU')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
