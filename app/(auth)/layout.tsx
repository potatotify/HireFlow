import { ReactNode } from "react"
import Image from "next/image"
import { Toaster } from "@/components/ui/sonner"

const authLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex h-dvh w-full items-center justify-center overflow-hidden bg-[url('/pattern.png')] bg-cover bg-center bg-no-repeat px-4 py-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-slate-950/45" />
      <Toaster />

      <div className="relative z-10 grid h-full w-full max-w-7xl items-center gap-8 lg:grid-cols-[1.35fr_minmax(0,460px)] lg:gap-12">
        <section className="relative hidden  rounded-[1.85rem] bg-gradient-to-br from-white/20 via-white/10 to-white/5 p-px shadow-[0_30px_80px_-35px_rgba(0,0,0,0.55)] backdrop-blur-sm lg:flex">
          <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/75 p-10">
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="absolute -left-20 top-8 h-40 w-40 rounded-full bg-violet-400/15 blur-3xl" />
            <div className="absolute -bottom-20 right-0 h-48 w-48 rounded-full bg-cyan-300/10 blur-3xl" />
            <div className="relative z-10 mx-auto flex w-fit rounded-[1.5rem] border border-white/10 bg-white/8  shadow-[0_14px_40px_-20px_rgba(0,0,0,0.45)]">
              <Image
                src="/logo.svg"
                alt="HireFlow"
                width={360}
                height={360}
                priority
                className="h-auto w-[22rem]  rounded-[1.1rem] object-contain drop-shadow-[0_10px_28px_rgba(0,0,0,0.25)]"
              />
            </div>
            <div className="mt-20 relative z-10 space-y-4 ">
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.34em] text-primary-200/90">
                Hiring, simplified
              </p>
              <h1 className="max-w-xl text-4xl font-semibold leading-[1.1] tracking-tight text-white xl:text-[2.75rem]">
                Interview platform for modern recruiting teams.
              </h1>
              <p className="max-w-xl text-sm leading-7 text-slate-300/90">
                HireFlow keeps onboarding, interviews, and talent tracking in one calm,
                focused space.
              </p>
            </div>
          </div>
        </section>

        <div className="flex w-full justify-center">{children}</div>
      </div>
    </div>
  )
}

export default authLayout
