import { useState } from 'react'
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'

const API_URL = 'http://localhost:8000/api/v1'

export function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    verificationCode: ''
  })
  const [activeTab, setActiveTab] = useState('login')
  const [error, setError] = useState('')
  const [showVerification, setShowVerification] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (showVerification) {
      // Handle verification code submission
      try {
        console.log('Submitting verification:', {
          username: formData.username,
          code: formData.verificationCode
        });
        const response = await fetch(`${API_URL}/auth/confirm`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username,
            code: formData.verificationCode,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.detail || 'Verification failed')
        }

        setShowVerification(false)
        setActiveTab('login')
        setError('Email verified successfully! Please login.')
        setFormData({ username: '', email: '', password: '', verificationCode: '' })
      } catch (err) {
        console.error('Error:', err)
        setError(err.message)
      }
      return
    }

    try {
      const endpoint = activeTab === 'login' ? '/auth/login' : '/auth/register'
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activeTab === 'login' 
          ? {
              username: formData.username,
              password: formData.password,
            }
          : {
              username: formData.username,
              email: formData.email,
              password: formData.password,
            }
        ),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Authentication failed')
      }

      if (activeTab === 'login') {
        localStorage.setItem('accessToken', data.access_token)
        localStorage.setItem('idToken', data.id_token)
        localStorage.setItem('refreshToken', data.refresh_token)
        navigate('/')
      } else {
        setShowVerification(true)
        setError('Registration successful! Please check your email for verification code.')
      }
    } catch (err) {
      console.error('Error:', err)
      setError(err.message)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-10 shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            dump.fun
          </h2>
        </div>

        {/* Tab buttons */}
        <div className="flex rounded-md bg-gray-100">
          <button
            type="button"
            onClick={() => {
              if (!showVerification) {
                setActiveTab('login')
                setFormData({ username: '', email: '', password: '', verificationCode: '' })
              }
            }}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium ${
              activeTab === 'login'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            } ${showVerification ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              if (!showVerification) {
                setActiveTab('register')
                setFormData({ username: '', email: '', password: '', verificationCode: '' })
              }
            }}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium ${
              activeTab === 'register'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            } ${showVerification ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className={`text-sm ${error.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!showVerification ? (
              <>
                <div>
                  <label htmlFor="username" className="mb-2 block text-left text-sm font-semibold text-gray-700">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>

                {activeTab === 'register' && (
                  <div>
                    <label htmlFor="email" className="mb-2 block text-left text-sm font-semibold text-gray-700">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required={activeTab === 'register'}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="password" className="mb-2 block text-left text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </>
            ) : (
              <div>
                <label htmlFor="verificationCode" className="mb-2 block text-left text-sm font-semibold text-gray-700">
                  Verification Code
                </label>
                <input
                  id="verificationCode"
                  name="verificationCode"
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter verification code from email"
                  value={formData.verificationCode}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-gray-900 hover:bg-gray-700"
            >
              {showVerification ? 'Verify Email' : (activeTab === 'login' ? 'Login' : 'Register')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 