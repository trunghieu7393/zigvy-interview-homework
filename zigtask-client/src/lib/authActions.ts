export async function signIn(email: string, password: string) {
  const res = await fetch('/api/auth/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) throw new Error('Sign in failed')
  const data = await res.json()
  console.log("🚀 ~ signIn ~ data:", data)
  document.cookie = `token=${data.token}; path=/`
  window.location.href = '/dashboard'
}

export async function signUp(email: string, password: string) {
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) throw new Error('Sign up failed')
  const data = await res.json()
  document.cookie = `token=${data.token}; path=/`
  window.location.href = '/dashboard'
}

export async function signOut(email: string, password: string) {
//   const res = await fetch('/api/auth/signup', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email, password }),
//   })

//   if (!res.ok) throw new Error('Sign up failed')
//   const data = await res.json()
//   document.cookie = `token=${data.token}; path=/`
//   window.location.href = '/dashboard'
return true
}