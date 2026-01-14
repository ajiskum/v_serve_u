import { MobileFrame } from '@/app/components/MobileFrame';
import { Card } from '@/app/components/Card';
import { StatusBadge } from '@/app/components/StatusBadge';
import { useState } from 'react';
import { useFirebase } from '@/app/context/FirebaseContext';

interface WorkerDashboardScreenProps {
  onSelectRequest: (requestId: string) => void;
  onResumeJob: (requestId: string) => void;
}

export function WorkerDashboardScreen({ onSelectRequest, onResumeJob }: WorkerDashboardScreenProps) {
  const { currentUser, getRequestsForWorker } = useFirebase();
  const [isAvailable, setIsAvailable] = useState(true);

  // Safely get requests for the current worker
  const allRequests = currentUser ? getRequestsForWorker(currentUser.id) : [];

  const pendingRequests = allRequests.filter(r => r.status === 'pending');
  // Requests that are active/ongoing
  const activeJobs = allRequests.filter(r => ['accepted', 'user_started', 'in-progress', 'worker_completed'].includes(r.status));
  // Completed/Rejected history could be separate, for now maybe just list them or ignore
  const historyRequests = allRequests.filter(r => ['completed', 'rejected'].includes(r.status));

  return (
    <MobileFrame>
      <div className="min-h-[607px] bg-[#F7F8FC]">
        {/* Header */}
        <div className="bg-[#1A2238] text-white p-6 rounded-b-3xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-white mb-1">Worker Dashboard</h2>
              <p className="text-[#9DAAF2] text-sm">{currentUser?.name || 'Worker'}</p>
            </div>
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="bg-white/10 rounded-xl p-4 flex items-center justify-between">
            <div>
              <h4 className="text-white mb-1">Availability Status</h4>
              <p className="text-[#9DAAF2] text-sm">
                {isAvailable ? 'You are visible to users' : 'You are not receiving requests'}
              </p>
            </div>
            <button
              onClick={() => setIsAvailable(!isAvailable)}
              className={`relative w-14 h-8 rounded-full transition-colors ${isAvailable ? 'bg-[#4CAF50]' : 'bg-gray-400'
                }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${isAvailable ? 'translate-x-7' : 'translate-x-1'
                  }`}
              />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">

          {/* Active Jobs Section */}
          {activeJobs.length > 0 && (
            <div>
              <h3 className="text-[#2E2E2E] mb-3 font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Active Jobs
              </h3>
              <div className="space-y-3">
                {activeJobs.map(request => (
                  <Card key={request.id} onClick={() => onResumeJob(request.id)} className="p-4 border border-green-100 bg-green-50/30">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-bold text-[#1A2238]">{request.userName}</h4>
                        <span className="text-sm text-gray-500">{request.userVillage}</span>
                      </div>
                      <StatusBadge status={request.status} />
                    </div>
                    <div className="text-sm space-y-1">
                      <p className="text-[#2E2E2E] font-medium">{request.serviceType}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">{request.description.split(' (Time:')[0]}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Pending Requests Section */}
          <div>
            <h3 className="text-[#2E2E2E] mb-3 font-semibold">
              New Requests ({pendingRequests.length})
            </h3>
            {/* ... (existing pending requests code) ... */}
            <div className="space-y-3">
              {pendingRequests.length === 0 ? (
                <div className="text-center py-8 bg-white rounded-xl border border-dashed border-gray-300">
                  <p className="text-gray-400 text-sm">No new requests yet.</p>
                </div>
              ) : (pendingRequests.map((request) => (
                <Card key={request.id} onClick={() => onSelectRequest(request.id)} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#9DAAF2] bg-opacity-20 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-[#1A2238] font-medium">{request.userName}</h4>
                        <p className="text-xs text-[#2E2E2E] opacity-70">{request.userVillage}</p>
                      </div>
                    </div>
                    <StatusBadge status={request.status} />
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Service:</span>
                      <span className="font-medium text-[#1A2238]">{request.serviceType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Time:</span>
                      <span className="font-medium text-[#1A2238]">{request.description.match(/Time: (.*)\)/)?.[1] || 'Flexible'}</span>
                    </div>
                    <div className="mt-1 pt-1 border-t border-gray-100">
                      <p className="text-gray-500 line-clamp-2">{request.description.split(' (Time:')[0]}</p>
                    </div>
                  </div>
                </Card>
              )))}
            </div>
          </div>

          {/* History Section */}
          <div>
            <h3 className="text-[#2E2E2E] mb-3 font-semibold mt-4 text-sm opacity-80">
              Past Jobs ({historyRequests.length})
            </h3>
            <div className="space-y-3">
              {historyRequests.map((request) => (
                <Card key={request.id} onClick={() => onResumeJob(request.id)} className="p-4 opacity-80 grayscale-[0.3]">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-[#1A2238]">{request.userName}</h4>
                      <span className="text-xs text-gray-500">{new Date(request.date).toLocaleDateString()}</span>
                    </div>
                    <StatusBadge status={request.status} />
                  </div>
                  <div className="mb-2">
                    <p className="text-xs text-[#2E2E2E] line-clamp-1">{request.description.split(' (Time:')[0]}</p>
                  </div>
                  {request.rating && (
                    <div className="text-xs bg-yellow-50 text-yellow-700 p-2 rounded mt-2">
                      Rated: {request.rating} ⭐ "{request.feedback}"
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>

        </div>
      </div>
    </MobileFrame>
  );
}
