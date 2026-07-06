"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const BuildInterviewButton: React.FC = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current) return
      if (e.target instanceof Node && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const [step, setStep] = useState<'chooseWho' | 'chooseHow'>('chooseWho')
  const [who, setWho] = useState<'me' | 'others' | null>(null)
  const [loadingCreate, setLoadingCreate] = useState(false)

  const handleWho = (sel: 'me' | 'others') => {
    setWho(sel)
    setStep('chooseHow')
  }

  const handleCreate = async (mode: 'manual' | 'ai') => {
    if (!who) return
    setLoadingCreate(true)
    try {
      const visibility = who === 'me' ? 'public' : 'private'
      const createdByAI = mode === 'ai'

      

      

      setOpen(false)
      // redirect: AI -> /generate, manual -> /create
      if (mode === 'ai') {
        router.push(`/interview/?visibility=${visibility}`)
      } else {
        router.push(`/create/?visibility=${visibility}`)
      }
    } catch (err) {
      console.error(err)
      setOpen(false)
    } finally {
      setLoadingCreate(false)
    }
  }

  return (
    <div className="relative" ref={ref}>
      <Button onClick={() => setOpen((o) => !o)} className="btn-primary max-sm:w-full px-10">
        Build an Interview
      </Button>

      {open && (
        <div className="absolute right-0 mt-2 bg-white/10 text-white rounded-lg shadow-lg p-2 z-50">
          {step === 'chooseWho' ? (
            <>
              <button onClick={() => handleWho('me')} className="w-full text-left px-3 py-2 rounded hover:bg-white/5">
                Practice (Open to all)
              </button>
              <button onClick={() => handleWho('others')} className="w-full text-left mt-1 px-3 py-2 rounded hover:bg-white/5">
                Recruiter (Private)
              </button>
            </>
          ) : (
            <>
              
              <button disabled={loadingCreate} onClick={() => handleCreate('manual')} className="w-full text-left px-3 py-2 rounded hover:bg-white/5">
                Create Manually
              </button>
              <button disabled={loadingCreate} onClick={() => handleCreate('ai')} className="w-full text-left mt-1 px-3 py-2 rounded hover:bg-white/5">
                Generate with AI
              </button>
              <button onClick={() => { setStep('chooseWho'); setWho(null) }} className="w-full text-left mt-2 px-3 py-2 rounded hover:bg-white/5">
                Back
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default BuildInterviewButton
