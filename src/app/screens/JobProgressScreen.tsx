import { MobileFrame } from '@/app/components/MobileFrame';
import { Button } from '@/app/components/Button';
import { StatusBadge } from '@/app/components/StatusBadge';
import { useState } from 'react';

interface JobProgressScreenProps {
  onBack: () => void;
}

export function JobProgressScreen({ onBack }: JobProgressScreenProps) {
  const [jobStatus, setJobStatus] = useState<'accepted' | 'in-progress' | 'completed'>('accepted');

  const job = {
    userName: 'Lakshmi',
    userVillage: 'Thanjavur',
    service: 'Electrical Wiring',
    description: 'Need to install new wiring for 3 rooms and fix existing switches',
    acceptedOn: '13 Jan 2026, 11:45 AM',
  };

  const handleStartJob = () => {
    setJobStatus('in-progress');
  };

  const handleEndJob = () => {
    setJobStatus('completed');
  };

  return (
    <MobileFrame title="Job Progress" showBack onBack={onBack}>
      <div className="min-h-[607px] bg-[#F7F8FC] p-6">
        {/* Status Header */}
        <div className="bg-white rounded-2xl p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#1A2238]">Job Status</h3>
            <StatusBadge status={jobStatus} />
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#4CAF50] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="w-0.5 h-full bg-[#4CAF50] my-1"></div>
              </div>
              <div className="flex-1 pb-4">
                <h4 className="text-[#1A2238]">Request Accepted</h4>
                <p className="text-sm text-[#2E2E2E] opacity-70">{job.acceptedOn}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  jobStatus === 'in-progress' || jobStatus === 'completed' 
                    ? 'bg-[#4CAF50]' 
                    : 'bg-gray-300'
                }`}>
                  {jobStatus === 'in-progress' || jobStatus === 'completed' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  ) : (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                </div>
                <div className={`w-0.5 h-full my-1 ${
                  jobStatus === 'completed' ? 'bg-[#4CAF50]' : 'bg-gray-300'
                }`}></div>
              </div>
              <div className="flex-1 pb-4">
                <h4 className="text-[#1A2238]">Work In Progress</h4>
                <p className="text-sm text-[#2E2E2E] opacity-70">
                  {jobStatus === 'in-progress' || jobStatus === 'completed' 
                    ? 'Job started' 
                    : 'Not started yet'}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  jobStatus === 'completed' ? 'bg-[#4CAF50]' : 'bg-gray-300'
                }`}>
                  {jobStatus === 'completed' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  ) : (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-[#1A2238]">Completed</h4>
                <p className="text-sm text-[#2E2E2E] opacity-70">
                  {jobStatus === 'completed' ? 'Job completed' : 'Pending'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="bg-white rounded-2xl p-5 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-[#9DAAF2] bg-opacity-20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div>
              <h4 className="text-[#1A2238]">{job.userName}</h4>
              <p className="text-sm text-[#2E2E2E] opacity-70">{job.userVillage}</p>
            </div>
          </div>
          <div className="text-sm">
            <span className="text-[#2E2E2E] opacity-70">Service:</span>
            <span className="ml-2 text-[#1A2238]">{job.service}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {jobStatus === 'accepted' && (
            <Button variant="accent" className="w-full" size="lg" onClick={handleStartJob}>
              Start Job
            </Button>
          )}
          
          {jobStatus === 'in-progress' && (
            <Button variant="accent" className="w-full" size="lg" onClick={handleEndJob}>
              End Job
            </Button>
          )}

          {jobStatus === 'completed' && (
            <div className="bg-[#4CAF50] bg-opacity-10 border-2 border-[#4CAF50] rounded-xl p-4 text-center">
              <p className="text-[#4CAF50]">Job completed successfully!</p>
            </div>
          )}

          <Button variant="outline" className="w-full" size="lg">
            <div className="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>Call User</span>
            </div>
          </Button>
        </div>
      </div>
    </MobileFrame>
  );
}
