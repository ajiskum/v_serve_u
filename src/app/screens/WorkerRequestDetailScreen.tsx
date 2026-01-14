import { MobileFrame } from '@/app/components/MobileFrame';
import { Button } from '@/app/components/Button';
import { useFirebase } from '@/app/context/FirebaseContext';
import { Toaster, toast } from 'sonner';

interface WorkerRequestDetailScreenProps {
  requestId: string;
  onAccept: () => void;
  onReject: () => void;
  onBack: () => void;
}

export function WorkerRequestDetailScreen({
  requestId,
  onAccept,
  onReject,
  onBack
}: WorkerRequestDetailScreenProps) {
  const { requests, updateRequestStatus } = useFirebase();

  const request = requests.find(r => r.id === requestId);

  if (!request) {
    return (
      <MobileFrame title="Request Details" showBack onBack={onBack}>
        <div className="flex items-center justify-center min-h-[607px] text-gray-500">
          Loading request details...
        </div>
      </MobileFrame>
    );
  }

  const handleAccept = async () => {
    await updateRequestStatus(requestId, 'accepted');
    toast.success('Request accepted');
    onAccept();
  };

  const handleReject = async () => {
    await updateRequestStatus(requestId, 'rejected');
    toast.error('Request rejected');
    onReject();
  };

  // Extract Preferred Time from description if present
  const preferredTime = request.description.match(/Time: (.*)\)/)?.[1] || "Flexible";
  const cleanDescription = request.description.split(' (Time:')[0];

  return (
    <MobileFrame title="Request Details" showBack onBack={onBack}>
      <div className="min-h-[607px] bg-[#F7F8FC] p-6">
        {/* User Info */}
        <div className="bg-white rounded-2xl p-5 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-[#9DAAF2] bg-opacity-20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <h3 className="text-[#1A2238]">{request.userName}</h3>
              <div className="flex items-center gap-1 text-sm text-[#2E2E2E] opacity-70">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{request.userVillage}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-[#2E2E2E] opacity-70">Service</span>
              <span className="text-[#1A2238]">{request.serviceType}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-[#2E2E2E] opacity-70">Preferred Time</span>
              <span className="text-[#1A2238]">{preferredTime}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-[#2E2E2E] opacity-70">Requested On</span>
              <span className="text-[#1A2238]">{new Date(request.date).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Work Description */}
        <div className="bg-white rounded-2xl p-5 mb-6">
          <h4 className="text-[#1A2238] mb-2">Work Description</h4>
          <p className="text-[#2E2E2E]">{cleanDescription}</p>
        </div>

        {/* Actions */}
        {request.status === 'pending' && (
          <div className="space-y-3">
            <Button variant="accent" className="w-full" size="lg" onClick={handleAccept}>
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Accept Request</span>
              </div>
            </Button>
            <Button variant="outline" className="w-full" size="lg" onClick={handleReject}>
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                <span>Reject Request</span>
              </div>
            </Button>
          </div>
        )}
      </div>
    </MobileFrame>
  );
}
