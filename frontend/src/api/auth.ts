export async function login(data) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  
    const text = await res.text()
    console.log("STATUS:", res.status)
    console.log("RESPONSE:", text)
  
    if (!res.ok) {
      throw new Error('Login failed')
    }
  
    return JSON.parse(text)
  }