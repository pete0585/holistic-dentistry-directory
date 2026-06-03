'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    })
    setSent(true)
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-forest mb-2">Check your email</h1>
        <p className="text-gray-500">Magic link sent to <strong>{email}</strong></p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl border border-ivory-dark shadow-sm p-8">
        <h1 className="text-xl font-bold text-forest mb-6">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@holisticdentalfinder.com"
            className="w-full px-4 py-3 rounded-xl border border-ivory-dark focus:outline-none focus:ring-2 focus:ring-forest text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-forest text-gold font-bold py-3 rounded-xl hover:bg-forest-light transition-colors disabled:opacity-60"
          >
            {loading ? 'Sending...' : 'Send Magic Link'}
          </button>
        </form>
      </div>
    </div>
  )
}
