
"use client"

import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import Image from 'next/image'
import { getInterviewCoverById } from '@/lib/utils'
import Link from 'next/link'
import { Button } from './ui/button'

import { getFeedbackCountByInterviewId } from '@/lib/actions/general.action'
import { toast } from 'sonner'

const RecruiterInterviewCard = ({ id, userId, role, type, techstack, createdAt }: InterviewCardProps) => {
  const [candidateCount, setCandidateCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCandidateCount = async () => {
      try {
        if (id) {
          const count = await getFeedbackCountByInterviewId(id)
          setCandidateCount(count)
        }
      } catch (error) {
        console.error('Error loading candidate count:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCandidateCount()
  }, [id])

  const normalizedType = /mix/gi.test(type) ? 'Mixed' : type
  const formattedDate = dayjs(createdAt || Date.now()).format('MMM D,YYYY')
  const coverImage = id ? getInterviewCoverById(id) : '/covers/default.png'

  const handleShareInterview = () => {
    navigator.clipboard.writeText(id!)
    toast.success('Interview code copied to clipboard!')
  }

  return (
    <div>
      <div className="card-border w-90 max-sm:w-full min-h-96">
        <div className="card-interview">
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
            <p className="badge-text">{normalizedType}</p>
          </div>
          <Image src={coverImage} alt="cover image" width={90} height={90} className="rounded-full object-fit size-22.5" />
          <h3 className="mt-5 capitalize">{role} Interview</h3>

          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <Image src="/calendar.svg" alt="calendar" width={22} height={22} />
              <p>{formattedDate}</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <p>{loading ? 'Loading...' : `${candidateCount} candidates`}</p>
            </div>
          </div>

          <div>
            <p className="line-clamp-2 mt-5">Private recruiter interview</p>
          </div>

          <div className="flex flex-row justify-between">
            
            <div className="flex gap-2">
              <Button type="button" className="btn-secondary" onClick={handleShareInterview}>
                Share
              </Button>
              <Button className="btn-secondary">
                <Link href={`/interview/${id}/analysis`}>Analysis</Link>
              </Button>
              <Button className="btn-primary">
                <Link href={`/interview/${id}`}>View</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecruiterInterviewCard
