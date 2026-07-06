'use client'

import React, { useState, useEffect } from 'react'
import {getCurrentUser} from '@/lib/actions/auth.action'
import {useSearchParams} from 'next/navigation'
const page = () => {
  const searchParams = useSearchParams();
  const visibility = searchParams.get('visibility') ?? 'public'
  console.log("visibility:", visibility)
  const [formData, setFormData] = useState({
    type: '',
    role: '',
    level: '',
    techstack: '',
    amount: '',
    userid: '',
    visibility
  })
  console.log("formData:", formData)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser()
      if (user?.id) {
        setFormData((prev) => ({ ...prev, userid: user.id }))
      }
    }
    fetchUser()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/vapi/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        
      })
      console.log("formData in handleSubmit:", formData)

      if (!response.ok) {
        throw new Error('Request failed')
      }

      setMessage('Interview created successfully.')
    } catch {
      setMessage('Failed to create interview. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    
      <div className="mx-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur">
        <h1 className="mb-2 text-3xl font-bold">Create Interview</h1>
        <p className="mb-8 text-sm text-white/70">
          Fill out the form to generate a new interview.
        </p>

        <form className="grid gap-5" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-white/80">Type</label>
            <input
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="e.g. technical"
              className="rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 outline-none transition placeholder:text-white/30 focus:border-cyan-400"
            />
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-white/80">Role</label>
              <input
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer"
                className="rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 outline-none transition placeholder:text-white/30 focus:border-cyan-400"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium text-white/80">Level</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 outline-none transition focus:border-cyan-400"
              >
                <option value="">Select level</option>
                <option value="entry">Entry</option>
                <option value="mid">Mid</option>
                <option value="senior">Senior</option>
              </select>
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-white/80">Tech Stack</label>
            <input
              name="techstack"
              value={formData.techstack}
              onChange={handleChange}
              placeholder="e.g. React, Next.js, TypeScript"
              className="rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 outline-none transition placeholder:text-white/30 focus:border-cyan-400"
            />
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-white/80">Amount</label>
              <input
                name="amount"
                type="number"
                min="1"
                max="10"
                value={formData.amount}
                onChange={handleChange}
                placeholder="e.g. 10"
                className="rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 outline-none transition placeholder:text-white/30 focus:border-cyan-400"
              />
            </div>

            
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Creating...' : 'Create Interview'}
          </button>

          {message ? <p className="text-sm text-white/80">{message}</p> : null}
        </form>
      </div>
    
  )
}

export default page
