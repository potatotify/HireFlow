'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/actions/auth.action';
import { getInterviewById, getFeedbackCandidatesForInterview } from '@/lib/actions/general.action';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

interface CandidateFeedback {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  totalScore: number;
  createdAt: string;
}

const AnalysisPage = () => {
  const params = useParams();
  const router = useRouter();
  const interviewId = params.id as string;
  
  const [candidates, setCandidates] = useState<CandidateFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Get current user
        const currentUser = await getCurrentUser();
        if (!currentUser) {
          router.push('/sign-in');
          return;
        }

        // Get interview details
        const interview = await getInterviewById(interviewId);
        if (!interview) {
          setError('Interview not found');
          router.push('/');
          return;
        }

        // Check if current user is the interview creator
        if (interview.userId !== currentUser.id) {
          router.push('/');
          return;
        }

        // Get all feedback for this interview
        const feedbackList = await getFeedbackCandidatesForInterview(interviewId);
        
        // Sort by totalScore in descending order
        const sortedCandidates = feedbackList.sort((a, b) => b.totalScore - a.totalScore);

        setCandidates(sortedCandidates);
      } catch (err) {
        console.error('Error loading analysis data:', err);
        setError('Failed to load analysis data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [interviewId, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading analysis...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Interview Analysis</h1>
        <p className="text-gray-600">Ranking of candidates based on feedback scores</p>
      </div>

      {candidates.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-600">No candidates have completed the interview yet.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {candidates.map((candidate, index) => (
            <Card key={candidate.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-bold text-lg">
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{candidate.userName}</h3>
                      <p className="text-gray-600">{candidate.userEmail}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Submitted: {new Date(candidate.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600">
                      {candidate.totalScore}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Score</p>
                  </div>

                  <Link
                    href={`/interview/${interviewId}/feedback/${candidate.userId}`}
                  >
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      View Feedback
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnalysisPage;
