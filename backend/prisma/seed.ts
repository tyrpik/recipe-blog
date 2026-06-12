import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const breakfast = await prisma.category.create({
    data: { name: 'Breakfast' },
  })

  const dinner = await prisma.category.create({
    data: { name: 'Dinner' },
  })

  const user = await prisma.user.findFirst()

  if (!user) return

  await prisma.recipe.create({
    data: {
      title: 'Pancakes',
      description: 'Easy fluffy pancakes',
      instructions: 'Mix ingredients and fry on pan.',
      authorId: user.id,
      categoryId: breakfast.id,
      ingredients: {
        create: [
          { name: 'Flour', quantity: 200, unit: 'g' },
          { name: 'Milk', quantity: 300, unit: 'ml' },
          { name: 'Eggs', quantity: 2 },
        ],
      },
    },
  })

  await prisma.recipe.create({
    data: {
      title: 'Pasta Carbonara',
      description: 'Classic Italian dish',
      instructions: 'Cook pasta and mix with sauce.',
      authorId: user.id,
      categoryId: dinner.id,
      ingredients: {
        create: [
          { name: 'Pasta', quantity: 200, unit: 'g' },
          { name: 'Eggs', quantity: 2 },
          { name: 'Bacon', quantity: 100, unit: 'g' },
        ],
      },
    },
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
  })