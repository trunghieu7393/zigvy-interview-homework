'use client'
import { useState } from 'react'
import AuthForm from '@/components/AuthForm'

export default function Home() {
  const [isLogin, setIsLogin] = useState(true)

  const handleToggle = () => setIsLogin((prev) => !prev)

  return (
    <div>
      <AuthForm isLogin={isLogin} />
      <div className="mt-4 text-center">
        <p>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
        <button
          type="button"
          className="text-blue-500 underline"
          onClick={handleToggle}
        >
          {isLogin ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </div>
  )
}