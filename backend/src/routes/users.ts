import { Router } from 'express'
import { prisma } from '../lib/prisma.js'
import { requireAuth, AuthRequest } from '../middleware/auth.js'

const router = Router()

// GET /users/me
router.get('/me', requireAuth, async (req: AuthRequest, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: {
      id: true,
      username: true,
      email: true,
      phone: true,
      bio: true,
      createdAt: true,
    },
  })

  if (!user) {
    return res.status(404).json({
      error: 'User not found',
    })
  }

  res.json(user)
})

export default router