import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { dummyInterviews } from '@/constants'
import InterviewCard from '@/components/InterviewCard'

const page = () => {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Practice with AI or Take Real AI Interviews from Top Recruiters</h2>
          <p className='text-lg'>
            Practice with AI, get instant feedback, and take real interviews from recruiters—all in one platform.
          </p>
          <Button asChild className='btn-primary max-sm:w-full px-10'>
            <Link href="/interview" >
            Start an Interview
            </Link>
          </Button>
        </div>
        <Image src="/robu.png" alt='robu' width={480} height={480} className='max-sm:hidden'  />
        

      </section>
        <section className='flex flex-col gap-6 mt-8' >
          <h2>Your Interviews</h2>
          <div className='interviews-section' >
            {dummyInterviews.map((interview)=>(
              <InterviewCard {...interview} key={interview.id}/>
            ))}
          
            {/* <p>You haven&apos;t taken any interviews yet</p> */}
              
          </div>
        </section>
        <section className='flex flex-col gap-6 mt-8' >
          <h2>Take an Interview</h2>
          <div className='interviews-section' >
            {dummyInterviews.map((interview)=>(
              <InterviewCard {...interview} key={interview.id}/>
            ))}
            {/* <p>You haven&apos;t taken any interviews yet</p> */}

          </div>
        </section>
        
    </>
  )
}

export default page
