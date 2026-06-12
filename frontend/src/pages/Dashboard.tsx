import Sidebar from '../components/Sidebar'

export default function Dashboard() {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
      }}
    >
      <Sidebar />

      <main style={{ padding: 24 }}>
        <h1>Dashboard</h1>
      </main>
    </div>
  )
}