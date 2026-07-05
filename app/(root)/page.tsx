import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { dummyInterviews } from '@/constants'
import InterviewCard from '@/components/InterviewCard'
import { getCurrentUser } from '@/lib/actions/auth.action'
import { getInterviewsByUserId } from '@/lib/actions/general.action'
import {getLatestInterviews} from '@/lib/actions/general.action'

const page = async () => {
  const user = await getCurrentUser();
  // const userInterviews= await getInterviewsByUserId(user?.id!);
  const[userInterviews,latestInterviews] =await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({userId:user?.id!}),
  ]);

  
console.log("current user:", user);
console.log("user id:", user?.id);
console.log("latest interviews", latestInterviews);
  



  const hasPastInterviews = (userInterviews?.length ?? 0) > 0;
  const hasUpcomingInterviews = (latestInterviews?.length ?? 0) > 0;







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
            Build an Interview
            </Link>
          </Button>
        </div>
        <Image src="/robu.png" alt='robu' width={480} height={480} className='max-sm:hidden'  />
        

      </section>
        <section className='flex flex-col gap-6 mt-8' >
          <h2>Your Interviews</h2>
          <div className='interviews-section' >
            {
              hasPastInterviews? (
                userInterviews?.map((interview)=>(
                  <InterviewCard{...interview} key={interview.id}/>
                ))
              ):(
                <p>You haven&apos;t generated any interviews yet</p>     
                )
              

            } 
          
            
              
          </div>
        </section>
        <section className='flex flex-col gap-6 mt-8' >
          <h2>Take an Interview</h2>
          <div className='interviews-section' >
            {
              hasUpcomingInterviews? (
                latestInterviews?.map((interview)=>(
                  <InterviewCard 
                  key={interview.id}
                  userId={user?.id!}
                  id={interview.id}
                  role={interview.role}
                  type={interview.type}
                  techstack={interview.techstack}
                  createdAt={interview.createdAt}
                  
                  />
                ))
              ):(
                <p>There are no more Interviews available at the moment.</p>     
                )
              

            }
          </div>
        </section>
        
    </>
  )
}

export default page
