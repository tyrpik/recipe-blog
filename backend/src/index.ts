import express from 'express'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'

dotenv.config()

const app = express()

app.use(express.json())

app.use('/auth', authRoutes)
app.use('/users', userRoutes)

app.get('/', (req, res) => {
  res.json({
    message: 'API działa'
  })
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})