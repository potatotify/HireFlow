import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

enum callstatus{
    INACTIVE='INACTIVE',
    ACTIVE='ACTIVE',
    CONNECTING='CONNECTING',
    FINISHED='FINISHED',
}

const Agent = ({ userName, userId, type }: { userName: string; userId: string; type: string }) => {
    const isSpeaking=true;
    const CallStatus=callstatus.FINISHED;
    const messages=[
        'whats up',
        'how are you doing?',
    ]
    const lastMessage=messages[messages.length-1];
  return (
    <>
    <div className="call-view" >
        <div className="card-interviewer">
            <div className="avatar">
                <Image src="/ai-avatar.png" alt="Vapi" width={65} height={54} className="object-cover"/>
                {isSpeaking && <span className="animate-speak" />}

            </div>
            <h3>AI Interviewer</h3>

        </div>

        <div className="card-border">
            <div className="card-content" >
                <Image src="/user-image.png" alt="User" width={540} height={540} className=" rounded-full object-cover size-[145px]"/>
                <h3>{userName}</h3>


            </div>


        </div>

    </div>
    {messages.length>0&&(
        <div className="transcript-border">
            <div className="transcript">
                <p key={lastMessage} className={cn('transition-opactity duration-500 opacity-0','animate-fadeIn opacity-100')} >
                    {lastMessage}
                </p>
            </div>
        </div> 

    )}


    <div className="w-full flex justify-center">
        {CallStatus!='ACTIVE'?(
            <button className="btn-call relative" >
                <span className={cn('absolute animate-ping rounded-full opacity-75',CallStatus!='CONNECTING'&'hidden')} />
             

                <span>
                    {CallStatus=='INACTIVE'||CallStatus=='FINISHED'?'Call':'...'}

                </span>

            </button>    


        ):(
            <button className="btn-disconnect" >
                End Call
            </button>
        )}
    </div>
    </>
  )
}

export default Agent
