"use client"
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { interviewer } from '@/constants'
import { createFeedback } from '@/lib/actions/general.action'


enum callstatus{
    INACTIVE='INACTIVE',
    ACTIVE='ACTIVE',
    CONNECTING='CONNECTING',
    FINISHED='FINISHED',
}

const Agent = ({ userName, userId, type, interviewId, questions, visibility  }: AgentProps) => {
    const router = useRouter();
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [callStatus, setCallStatus] = useState<callstatus>(callstatus.INACTIVE);
    const [messages, setMessages] = useState<SavedMessage[]>([]);
    
    const vapiRef = useRef<any>(null);
    
    
    useEffect(() => {
    const onCallStart = () => {
      setCallStatus(callstatus.ACTIVE);
    };

    const onCallEnd = () => {
      setCallStatus(callstatus.FINISHED);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };
    

    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };

    const onError = (error: Error) => {
      console.log("Error:", error);
    };

    let mounted = true;
    import('@/lib/vapi.sdk')
      .then((mod) => {
        if (!mounted) return;
        vapiRef.current = mod.vapi;
        if (!vapiRef.current) return;
        vapiRef.current.on("call-start", onCallStart);
        vapiRef.current.on("call-end", onCallEnd);
        vapiRef.current.on("message", onMessage);
        vapiRef.current.on("speech-start", onSpeechStart);
        vapiRef.current.on("speech-end", onSpeechEnd);
        vapiRef.current.on("error", onError);
      })
      .catch((err) => console.error('failed to load vapi sdk', err));

    return () => {
      mounted = false;
      if (vapiRef.current) {
        try {
          vapiRef.current.off("call-start", onCallStart);
          vapiRef.current.off("call-end", onCallEnd);
          vapiRef.current.off("message", onMessage);
          vapiRef.current.off("speech-start", onSpeechStart);
          vapiRef.current.off("speech-end", onSpeechEnd);
          vapiRef.current.off("error", onError);
        } catch (e) {
          // ignore cleanup errors
        }
      }
    };
  }, []);

    const handleGenerateFeedback=async(message:SavedMessage[])=>{
      console.log('generate feedback here');
      //generate server action that genereates feedback and returns the feedback id
      const {success,feedbackId:id}= await createFeedback({
        interviewId:interviewId!,
        userId:userId!,
        transcript:messages,
      })

      if(success&&id){
        router.push(`/interview/${interviewId}/feedback`);
      }else{
        console.log('failed to generate feedback');
        router.push('/');
      }
    }

    useEffect(() => {
    if (callStatus === callstatus.FINISHED) {
      if (type === "generate") {
        router.push("/");
      }else{
        handleGenerateFeedback(messages);
      }

      
      
    }
    }, [messages,callStatus,router,type,userId]);

    const handleCall = async () => {
    setCallStatus(callstatus.CONNECTING);

      try {
        if (!vapiRef.current) {
          const mod = await import('@/lib/vapi.sdk');
          vapiRef.current = mod.vapi;
        }

        if (type === "generate") {
          await vapiRef.current.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!, {
            variableValues: {
              visibility: visibility,
              username: userName,
              userid: userId,
              
            },
          }
          
        )
        console.log("visbility is sent as", visibility);
        ;
        } else {
          const formattedQuestions = questions?.map((question) => `- ${question}`).join('\n') ?? '';

          await vapiRef.current.start(interviewer, {
            variableValues: {
              questions: formattedQuestions,
            },
          });
        }
      } catch (err) {
        console.error('vapi start error', err);
        setCallStatus(callstatus.FINISHED);
    }
  };

  const handleDisconnect = () => {
    setCallStatus(callstatus.FINISHED);
    try {
      vapiRef.current?.stop();
    } catch (err) {
      console.error('vapi stop error', err);
    }
  };
  const latestMessage = messages.length > 0 ? messages[messages.length - 1].content : "";
  const isCallInactiveorFinished = callStatus === callstatus.INACTIVE || callStatus === callstatus.FINISHED;



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
                <p key={latestMessage} className={cn('transition-opactity duration-500 opacity-0','animate-fadeIn opacity-100')} >
                    {latestMessage}
                </p>
            </div>
        </div> 

    )}


    <div className="w-full flex justify-center">
        {callStatus!==callstatus.ACTIVE?(
          <button onClick={handleCall} className="btn-call relative" >
                <span className={cn('absolute animate-ping rounded-full opacity-75', callStatus !== callstatus.CONNECTING && 'hidden')} />
             

                <span>
                    {isCallInactiveorFinished ? 'Call' : '...'}

                </span>

            </button>    


        ):(
          <button onClick={handleDisconnect} className="btn-disconnect" >
                End Call
            </button>
        )}
    </div>
    </>
  )
}

export default Agent
