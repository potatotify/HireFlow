import Link from "next/link"
import Image from "next/image"

import {ReactNode} from 'react'
import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import {Button} from '@/components/ui/button'
import {signOut} from '@/lib/actions/auth.action'
import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/lib/actions/auth.action";
const rootlayout = async ({children}:{children:ReactNode}) => {
  
  const isUserAuthenticated=await isAuthenticated();
  if(!isUserAuthenticated){
    redirect('/sign-in');
  }
  const User=await getCurrentUser();
  
  return (
    <div className="root-layout">
      <Navbar user={User} />
      {children}
    </div>
  )
}

export default rootlayout
