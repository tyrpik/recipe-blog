import { Link, useNavigate } from 'react-router-dom'

export default function Sidebar() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <aside
      style={{
        width: 240,
        padding: 24,
        borderRight: '1px solid #ddd',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <h2>Menu</h2>

      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          flex: 1,
        }}
      >
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/me">My profile</Link>
        <Link to="/">Home page</Link>
      </nav>

      <button
        onClick={handleLogout}
        style={{
          marginTop: 'auto',
          padding: 10,
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </aside>
  )
}