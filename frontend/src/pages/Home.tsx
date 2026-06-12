import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

type Recipe = {
  id: number
  title: string
  description?: string
  instructions: string
  category?: {
    name: string
  }
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    async function load() {
      const res = await fetch('http://localhost:3000/recipes')
      const data = await res.json()
      setRecipes(data)
    }

    load()
  }, [])

  return (
    <div>
      {/* NAVBAR */}
      <header style={styles.nav}>
        <div>Recipe Blog</div>

        <Link to="/login">
          <button>Log in</button>
        </Link>
      </header>

      {/* MAIN */}
      <main style={styles.main}>
        <h2>Latest recipes</h2>

        {recipes.length === 0 ? (
          <p>No recipes yet 🍽️</p>
        ) : (
          <div style={styles.grid}>
            {recipes.map((r) => (
              <div key={r.id} style={styles.card}>
                <h3>{r.title}</h3>
                <p>{r.description}</p>

                <small>
                  Category: {r.category?.name ?? 'No category'}
                </small>

                <p style={{ marginTop: 10 }}>
                  {r.instructions.slice(0, 80)}...
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px 24px',
    borderBottom: '1px solid #ddd',
  },
  main: {
    padding: 24,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: 16,
  },
  card: {
    border: '1px solid #ddd',
    padding: 16,
    borderRadius: 8,
  },
}