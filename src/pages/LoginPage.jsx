import React from 'react'
import { GalleryVerticalEnd } from 'lucide-react'
import { LoginForm } from '@/components/login-form'
import BackgroundImage from '@/assets/background-img.png'
import CarmelLogo from '@/assets/carmel-logo.png'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    if (email === 'admin@gmail.com' && password === 'admin') {
      alert('Login successful');
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <div className="flex justify-center mb-4">
              <img src={CarmelLogo} alt="Carmel Logo" className="h-16 w-16" />
            </div>
            <LoginForm onLogin={handleLogin} />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={BackgroundImage}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}

export default LoginPage