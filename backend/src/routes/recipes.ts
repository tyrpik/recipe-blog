import { Router } from 'express'
import { prisma } from '../lib/prisma.js'

const router = Router()

// GET all recipes
router.get('/', async (req, res) => {
  const recipes = await prisma.recipe.findMany({
    include: {
      category: true,
      ingredients: true,
    },
  })

  res.json(recipes)
})

export default router