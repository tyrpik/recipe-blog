import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import recipeRoutes from './routes/recipes.js'

dotenv.config()

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))

app.use(express.json())

app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/recipes', recipeRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'API działa' })
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})