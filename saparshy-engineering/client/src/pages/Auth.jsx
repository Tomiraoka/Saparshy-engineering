import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Auth.css'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const success = await login(email, password)

    setLoading(false)
    if (success) {
      navigate('/')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">

        <div className="auth-logo">
          <img
            src="/logo.svg"
            alt="Saparshy Engineering"
            className="logo-img"
          />
          <h1 className="brand-text">Saparshy Engineering</h1>
        </div>

        <h2>Вход в админ-панель</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            disabled={loading}
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Пароль"
            disabled={loading}
          />

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading ? 'Загрузка...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Auth
