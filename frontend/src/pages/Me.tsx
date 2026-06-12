import { useEffect, useState } from 'react'
import { getMe } from '../api/users'
import Sidebar from '../components/Sidebar'

type User = {
  id: number
  username: string
  email: string
  phone?: string
  bio?: string
  createdAt: string
}

export default function Me() {
  const [user, setUser] =
    useState<User | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await getMe()
        setUser(data)
      } catch {
        alert('Błąd pobierania użytkownika')
      }
    }

    load()
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
      }}
    >
      <Sidebar />

      <main
        style={{
          padding: 24,
          flex: 1,
        }}
      >
        {!user ? (
          <div>Loading...</div>
        ) : (
          <>
            <h1>My profile</h1>

            <p>
              <b>ID:</b> {user.id}
            </p>

            <p>
              <b>Username:</b>{' '}
              {user.username}
            </p>

            <p>
              <b>Email:</b> {user.email}
            </p>

            <p>
              <b>Phone:</b>{' '}
              {user.phone || '-'}
            </p>

            <p>
              <b>Bio:</b>{' '}
              {user.bio || '-'}
            </p>

            <p>
              <b>Joined:</b>{' '}
              {new Date(
                user.createdAt
              ).toLocaleDateString()}
            </p>
          </>
        )}
      </main>
    </div>
  )
}