import { useState } from 'react'
import { login } from '../api/auth'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      const res = await login({
        emailOrPhone: email,
        password,
      })

      localStorage.setItem('token', res.token)

      navigate('/dashboard')
    } catch (err) {
      alert('Błąd logowania')
    }
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2>Log in</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button style={styles.button}>Login</button>
      </form>
    </div>
  )
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f5f5f5',
  },
  card: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    padding: '24px',
    background: 'white',
    borderRadius: '12px',
    width: '300px',
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
  },
  button: {
    padding: '10px',
    cursor: 'pointer',
    background: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
  },
}