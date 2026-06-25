import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Main from '../pages/Main'
import Services from '../pages/Services'
import ServiceDetails from '../pages/ServiceDetails'
import News from '../pages/News'
import NewsDetails from '../pages/NewsDetails'
import About from '../pages/About'
import Contacts from '../pages/Contacts'
import Auth from '../pages/Auth'
import NotFound from '../pages/NotFound'
import AddService from '../pages/AddService'
import EditService from '../pages/EditService'
import AddNews from '../pages/AddNews'
import EditNews from '../pages/EditNews'
import ContactRequests from '../pages/ContactRequests'

const AppRouter = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <div className="loader"></div>
      </div>
    )
  }

  const isAdmin = user?.role === 'admin'

  return (
    <div className="app-wrapper">
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/auth" element={<Auth />} />

          <Route path="/add-service" element={isAdmin ? <AddService /> : <Auth />} />
          <Route path="/edit-service/:id" element={isAdmin ? <EditService /> : <Auth />} />
          <Route path="/add-news" element={isAdmin ? <AddNews /> : <Auth />} />
          <Route path="/edit-news/:id" element={isAdmin ? <EditNews /> : <Auth />} />
          <Route path="/contact-requests" element={isAdmin ? <ContactRequests /> : <Auth />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default AppRouter
