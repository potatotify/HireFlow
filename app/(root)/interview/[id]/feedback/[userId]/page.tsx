import React from 'react';
import { getCurrentUser } from '@/lib/actions/auth.action';
import { getFeedbackByInterviewId, getInterviewById } from '@/lib/actions/general.action';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';
import { db } from '@/firebase/admin';

const page = async ({ params }: RouteParams) => {
  const { id, userId } = await params;
  
  // Get current user
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect('/sign-in');
  }

  // Get interview details
  const interview = await getInterviewById(id);
  if (!interview) {
    redirect('/');
  }

  // Check if current user is the interview creator
  if (interview.userId !== currentUser.id) {
    redirect('/');
  }

  // Get feedback for the specific candidate
  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: userId,
  });

  if (!feedback) {
    redirect('/');
  }

  // Get candidate details
  let candidateName = 'Unknown';
  let candidateEmail = 'Unknown';
  try {
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data() as any;
    if (userData) {
      candidateName = userData.name || 'Unknown';
      candidateEmail = userData.email || 'Unknown';
    }
  } catch (err) {
    console.error('Error fetching candidate details:', err);
  }

  return (
    <section className="section-feedback">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-4xl font-semibold">
            Feedback on the Interview -{" "}
            <span className="capitalize">{interview.role}</span> Interview
          </h1>
          <Link href={`/interview/${id}/analysis`}>
            <Button className="bg-gray-600 hover:bg-gray-700">
              Back to Analysis
            </Button>
          </Link>
        </div>

        <div className="text-lg text-gray-600">
          Candidate: <span className="font-semibold">{candidateName}</span> ({candidateEmail})
        </div>
      </div>

      <div className="flex flex-row justify-center">
        <div className="flex flex-row gap-5">
          {/* Overall Impression */}
          <div className="flex flex-row gap-2 items-center">
            <Image src="/star.svg" width={22} height={22} alt="star" />
            <p>
              Overall Impression:{" "}
              <span className="text-primary-200 font-bold">
                {feedback?.totalScore}
              </span>
              /100
            </p>
          </div>

          {/* Date */}
          <div className="flex flex-row gap-2">
            <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
            <p>
              {feedback?.createdAt
                ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <hr />

      <p>{feedback?.finalAssessment}</p>

      {/* Interview Breakdown */}
      <div className="flex flex-col gap-4">
        <h2>Breakdown of the Interview:</h2>
        {feedback?.categoryScores?.map((category, index) => (
          <div key={index}>
            <p className="font-bold">
              {index + 1}. {category.name} ({category.score}/100)
            </p>
            <p>{category.comment}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <h3>Strengths</h3>
        <ul>
          {feedback?.strengths?.map((strength, index) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <h3>Areas for Improvement</h3>
        <ul>
          {feedback?.areasForImprovement?.map((area, index) => (
            <li key={index}>{area}</li>
          ))}
        </ul>
      </div>

      <div className="buttons">
        <Button className="btn-secondary flex-1">
          <Link href="/" className="flex w-full justify-center">
            <p className="text-sm font-semibold text-primary-200 text-center">
              Back to dashboard
            </p>
          </Link>
        </Button>

        <Button className="btn-secondary flex-1">
          <Link
            href={`/interview/${id}/analysis`}
            className="flex w-full justify-center"
          >
            <p className="text-sm font-semibold text-primary-200 text-center">
              Back to Analysis
            </p>
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default page;
