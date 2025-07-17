import AuthForm from '@/components/AuthForm'

export default function Home() {
  return (
    <div>
      <AuthForm isLogin={true} />
      <div className="mt-4 text-center">
        <p>Don't have an account?</p>
        <a href="#" className="text-blue-500 underline">Sign Up</a>
      </div>
    </div>
  )
}