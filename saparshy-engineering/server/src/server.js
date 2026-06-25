const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')

dotenv.config()

const authRoutes = require('./routes/authRoutes')
const serviceRoutes = require('./routes/serviceRoutes')
const newsRoutes = require('./routes/newsRoutes')
const contactRequestRoutes = require('./routes/contactRequestRoutes')
const errorMiddleware = require('./middlewares/errorMiddleware')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))

app.use('/api/auth', authRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/requests', contactRequestRoutes)

app.use(errorMiddleware)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
