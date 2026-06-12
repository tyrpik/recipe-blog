export async function getMe() {
  const token = localStorage.getItem('token')

  const res = await fetch('/api/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch user')
  }

  return res.json()
}