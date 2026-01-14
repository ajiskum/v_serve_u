import { MobileFrame } from '@/app/components/MobileFrame';
import { StatusBadge } from '@/app/components/StatusBadge';
import { Button } from '@/app/components/Button';
import { motion } from 'framer-motion';
import { useFirebase } from '@/app/context/FirebaseContext';
import { TrackingTimeline } from '@/app/components/TrackingTimeline';
import { RatingModal } from '@/app/components/RatingModal';
import { useState } from 'react';
import { toast } from 'sonner';

interface RequestStatusScreenProps {
  status: 'pending' | 'accepted' | 'rejected' | 'user_started' | 'in-progress' | 'worker_completed' | 'completed';
  onBack: () => void;
  requestId?: string;
  onBookAgain?: (workerId: string) => void;
}

export function RequestStatusScreen({ status: initialStatus, onBack, requestId, onBookAgain }: RequestStatusScreenProps) {
  const { updateRequestStatus, rateRequest, requests } = useFirebase();
  const [showRating, setShowRating] = useState(false);

  // Find the actual request from the list (since we have real-time sync)
  const realRequest = requests.find(r => r.id === requestId);

  // Use real status if available, otherwise prop
  const status = realRequest?.status || initialStatus;

  // Fallback for loading or error
  const request = realRequest ? {
    service: realRequest.serviceType,
    workerName: realRequest.workerName,
    workerVillage: 'Village',
    preferredTime: realRequest.description.match(/Time: (.*)\)/)?.[1] || new Date(realRequest.date).toLocaleDateString(),
    description: realRequest.description.split(' (Time:')[0],
    requestedOn: new Date(realRequest.date).toLocaleString(),
    rating: realRequest.rating,
  } : {
    service: 'Service Request',
    workerName: 'Loading...',
    workerVillage: '...',
    preferredTime: '...',
    description: 'Fetching details...',
    requestedOn: '...'
  };

  const statusMessages = {
    pending: 'Your request has been sent to the worker. Waiting for response...',
    accepted: 'Worker has accepted! When they arrive, please click "Worker Arrived" to start.',
    rejected: 'Worker is not available. Please try another worker.',
    'user_started': 'You started the job. Waiting for worker to confirm start...',
    'in-progress': 'Work is currently in progress.',
    'worker_completed': 'Worker has marked job as done. Please verify and pay.',
    completed: 'Work has been completed successfully!',
  };

  const handleStartJob = async () => {
    if (requestId) {
      await updateRequestStatus(requestId, 'user_started');
    }
  };

  const handleVerify = async () => {
    if (requestId) {
      await updateRequestStatus(requestId, 'completed');
    }
  };

  const handleRatingSubmit = async (rating: number, feedback: string) => {
    if (requestId) {
      await rateRequest(requestId, rating, feedback);
      toast.success('Thank you for your feedback!');
      setShowRating(false);
    }
  };

  return (
    <MobileFrame title="Request Status" showBack onBack={onBack}>
      <div className="min-h-[607px] bg-[#F7F8FC] p-6 relative">

        {/* Timeline Component */}
        <TrackingTimeline status={status} />

        {/* Worker Info Card */}
        <motion.div
          className="bg-white rounded-2xl p-6 mb-4 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-[#1A2238] mb-1">{request.service}</h3>
              <p className="text-sm text-[#2E2E2E] opacity-70">ID: {requestId || '...'}</p>
            </div>
            <StatusBadge status={status} />
          </div>

          <div className="bg-gradient-to-r from-[#F7F8FC] to-transparent rounded-xl p-4 mb-4">
            <p className="text-[#2E2E2E] text-center text-sm">{statusMessages[status]}</p>
          </div>

          <div className="border-t border-gray-100 pt-4 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-[#9DAAF2] bg-opacity-20 rounded-full flex items-center justify-center text-xl">
                👤
              </div>
              <div>
                <h4 className="text-[#1A2238]">{request.workerName}</h4>
                <p className="text-sm text-[#2E2E2E] opacity-70">{request.workerVillage}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div><span className="text-[#2E2E2E] opacity-70">Preferred Time:</span> <span className="ml-2 text-[#1A2238]">{request.preferredTime}</span></div>
            <div><span className="text-[#2E2E2E] opacity-70">Description:</span> <p className="text-[#1A2238] mt-1">{request.description}</p></div>
            <div><span className="text-[#2E2E2E] opacity-70">Requested On:</span> <span className="ml-2 text-[#1A2238]">{request.requestedOn}</span></div>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="space-y-3 pb-8">
          {status === 'accepted' && (
            <Button onClick={handleStartJob} variant="primary" className="w-full" size="lg">
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></svg>
                <span>Worker Arrived - Start Job</span>
              </div>
            </Button>
          )}

          {status === 'worker_completed' && (
            <Button onClick={handleVerify} variant="accent" className="w-full" size="lg">Verify & Pay</Button>
          )}

          {(status === 'accepted' || status === 'in-progress' || status === 'user_started') && (
            <Button variant="outline" className="w-full" size="lg">
              Call Worker
            </Button>
          )}

          {status === 'rejected' && (
            <Button variant="secondary" className="w-full" size="lg" onClick={onBack}>Find Another Worker</Button>
          )}

          {status === 'completed' && (
            <div className="space-y-3">
              {!request.rating ? (
                <Button variant="accent" className="w-full" size="lg" onClick={() => setShowRating(true)}>Rate Worker</Button>
              ) : (
                <div className="text-center p-3 bg-green-50 text-green-700 rounded-lg">
                  You rated this {request.rating} stars ⭐
                </div>
              )}

              <Button variant="outline" className="w-full" size="lg" onClick={() => {
                if (realRequest && onBookAgain) onBookAgain(realRequest.workerId);
              }}>Book Again</Button>
            </div>
          )}
        </div>

        <RatingModal
          isOpen={showRating}
          onClose={() => setShowRating(false)}
          onSubmit={handleRatingSubmit}
          workerName={request.workerName}
        />
      </div>
    </MobileFrame>
  );
}