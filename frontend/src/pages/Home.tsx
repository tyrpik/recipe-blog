import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div style={styles.container}>
      <h1>Recipe Blog</h1>
      <p>Witaj w aplikacji do przepisów 🍲</p>

      <Link to="/login">
        <button style={styles.button}>Log in</button>
      </Link>
    </div>
  )
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px',
  },
  button: {
    padding: '10px 20px',
    cursor: 'pointer',
  },
}