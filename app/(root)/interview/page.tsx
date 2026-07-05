import React from 'react'
import Agent from '@/components/Agent'
import { getCurrentUser } from '@/lib/actions/auth.action'
import { redirect } from 'next/navigation'
   
const page = async () => {
  const user = await getCurrentUser();
  
  if(!user){
    redirect('/login')
  }
  const userName = user.name;
  
  const userId = user.id;
  return (
    <>
        <h3>Interview Generation</h3>
        <Agent userName={userName} userId={userId} type="generate" />
    </>
  )
}

export default page
