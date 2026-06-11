import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [navigate])

  return (
    <div>
      <h1>Dashboard</h1>
      <p>You are logged in! 🎉</p>
    </div>
  )
}