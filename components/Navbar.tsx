"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {signOut} from '@/lib/actions/auth.action'
import {Button} from '@/components/ui/button'
import {getCurrentUser} from '@/lib/actions/auth.action'

export default  function Navbar({ user }: { user: any }) {
  const pathname = usePathname();
  

  return (
    <nav className="flex items-center justify-between p-4 ">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.svg" alt="HireFlow" width={38} height={32} />
        <h2 className="text-primary-100">HireFlow</h2>
      </Link>

      {pathname === "/" && (<>
        <h2 className="hidden sm:block text-md font-semibold text-foreground ">
          Welcome back, {user?.name || "User"}!
        </h2>
        <form action={signOut}>
          <Button className="text-red-500 hover:bg-red-50 hover:text-red-600" variant="outline" type="submit">Sign Out</Button>
        </form>
      </>
      )}
    </nav>
  );
}