import { Router } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma.js'
import { RegisterSchema, LoginSchema } from '../schemas/auth.js'

const router = Router()

// REGISTER
router.post('/register', async (req, res) => {
  const parsed = RegisterSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).json(parsed.error.flatten())
  }

  const { username, email, phone, password } = parsed.data

  const existing = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { phone }],
    },
  })

  if (existing) {
    return res.status(409).json({ error: 'User already exists' })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      username,
      email,
      phone,
      passwordHash,
    },
  })

  return res.json({
    id: user.id,
    username: user.username,
    email: user.email,
  })
})

// LOGIN
router.post('/login', async (req, res) => {
  const parsed = LoginSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).json(parsed.error.flatten())
  }

  const { emailOrPhone, password } = parsed.data

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    },
  })

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const valid = await bcrypt.compare(password, user.passwordHash)

  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: '1d' }
  )

  return res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  })
})

export default router