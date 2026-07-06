import React from 'react'
import Agent from '@/components/Agent'
import { getCurrentUser } from '@/lib/actions/auth.action'
import { redirect } from 'next/navigation'

   
export default async function Page({ searchParams }:{ searchParams?: Promise<{ visibility?: string } > }) {
  const user = await getCurrentUser();
  const visibility = (await searchParams)?.visibility ?? 'public';

  if (!user) {
    redirect('/login');
    return null;
  }

  const userName = user.name;
  const userId = user.id;
  console.log("visibility is", visibility);

  return (
    <>
      <h3>Interview Generation</h3>
      <Agent userName={userName} userId={userId} type="generate" visibility={visibility} />
    </>
  );
}
