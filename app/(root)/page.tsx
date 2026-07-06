import React from 'react'
import BuildInterviewButton from '@/components/BuildInterviewButton'
import Image from 'next/image'
import InterviewCard from '@/components/InterviewCard'
import RecruiterInterviewCard from '@/components/RecruiterInterviewCard'
import { getCurrentUser } from '@/lib/actions/auth.action'
import { getInterviewsByUserId } from '@/lib/actions/general.action'
import {getLatestInterviews} from '@/lib/actions/general.action'
import {joinInterview} from '@/lib/actions/general.action'
import { Button } from '@/components/ui/button'

const page = async () => {
  const user = await getCurrentUser();
  // const userInterviews= await getInterviewsByUserId(user?.id!);
  const[userInterviews,latestInterviews] =await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({userId:user?.id!}),
  ]);

  

  



  const publicUserInterviews = userInterviews?.filter((i)=>i.visibility==='public') ?? [];
  const publicLatestInterviews = latestInterviews?.filter((i)=>i.visibility==='public') ?? [];
  const privateUserInterviews = userInterviews?.filter((i)=>i.visibility==='private') ?? [];

  const hasPrivateInterviews = (privateUserInterviews?.length ?? 0) > 0;

  const hasPastInterviews = (publicUserInterviews?.length ?? 0) > 0;
  const hasUpcomingInterviews = (publicLatestInterviews?.length ?? 0) > 0;







  return (

    
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Practice with AI or Take Real AI Interviews from Top Recruiters</h2>
          <p className='text-lg'>
            Practice with AI, get instant feedback, and take real interviews from recruiters—all in one platform.
          </p>
          <div className='flex gap-6 max-sm:flex-col max-sm:w-full'>

            <BuildInterviewButton />
            <form className="flex gap-2 max-sm:flex-col max-sm:w-full" action={joinInterview}>
              <input required name="code" type="text" className='h-11 flex-1 rounded-xl border border-white/30 bg-white/10 px-4 text-white placeholder:text-gray-400 outline-none transition-colors focus:border-primary' placeholder="Enter Interview Code"/>
              <Button type="submit" className='btn-primary max-sm:w-full '>
                Join Interview
              </Button>
            </form>
          </div>
        </div>
        <Image src="/robu.png" alt='robu' width={480} height={480} className='max-sm:hidden'  />
        

      </section>
      {hasPrivateInterviews && (
        <section className="flex flex-col gap-6 mt-8">
          <h2>Recruiter Interviews</h2>
          <div className="interviews-section">
            {privateUserInterviews.map((interview) => (
              <RecruiterInterviewCard key={interview.id} {...interview} />
            ))}
          </div>
        </section>
      )}
        <section className='flex flex-col gap-6 mt-8' >
          <h2>Your Interviews</h2>
          <div className='interviews-section' >
            {
              hasPastInterviews? (
                publicUserInterviews?.map((interview)=>(
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
                publicLatestInterviews?.map((interview)=>(
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
