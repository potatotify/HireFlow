import React from 'react'

const page = async ({ searchParams }: { searchParams: { [key: string]: string } }) => {
  const interviewId = searchParams?.interviewId ?? null

  return (
    <div className="mx-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-8">
      <h1 className="mb-2 text-3xl font-bold">Generate Interview</h1>
      <p className="text-sm text-white/80 mb-4">Interview ID: {interviewId ?? 'N/A'}</p>
      <p className="text-sm text-white/80">This page is reserved for AI generation workflows.</p>
    </div>
  )
}

export default page
