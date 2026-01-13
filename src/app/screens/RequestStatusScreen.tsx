import { MobileFrame } from '@/app/components/MobileFrame';
import { StatusBadge } from '@/app/components/StatusBadge';
import { Button } from '@/app/components/Button';
import { motion } from 'framer-motion';

interface RequestStatusScreenProps {
  status: 'pending' | 'accepted' | 'rejected' | 'in-progress' | 'completed';
  onBack: () => void;
}

export function RequestStatusScreen({ status, onBack }: RequestStatusScreenProps) {
  const request = {
    service: 'Electrician',
    workerName: 'Ravi Kumar',
    workerVillage: 'Thanjavur',
    preferredTime: 'Today',
    description: 'Need to fix ceiling fan and install new switch board',
    requestedOn: '13 Jan 2026, 10:30 AM',
  };

  const statusMessages = {
    pending: 'Your request has been sent to the worker. Waiting for response...',
    accepted: 'Worker has accepted your request! You can now contact them.',
    rejected: 'Worker is not available. Please try another worker.',
    'in-progress': 'Work is currently in progress.',
    completed: 'Work has been completed successfully!',
  };

  const statusIcons = {
    pending: (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#F4DB7D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </motion.div>
    ),
    accepted: (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9DAAF2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </motion.div>
    ),
    rejected: (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
        transition={{ type: "spring" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E8E8E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      </motion.div>
    ),
    'in-progress': (
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9DAAF2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </motion.div>
    ),
    completed: (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </motion.div>
    ),
  };

  return (
    <MobileFrame title="Request Status" showBack onBack={onBack}>
      <motion.div
        className="min-h-[607px] bg-[#F7F8FC] p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Status Icon */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          {statusIcons[status]}
        </motion.div>

        {/* Status Card */}
        <motion.div
          className="bg-white rounded-2xl p-6 mb-4 shadow-lg"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <motion.h3
                className="text-[#1A2238] mb-1"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {request.service}
              </motion.h3>
              <motion.p
                className="text-sm text-[#2E2E2E] opacity-70"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Request ID: #12345
              </motion.p>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            >
              <StatusBadge status={status} />
            </motion.div>
          </div>

          <motion.div
            className="bg-gradient-to-r from-[#F7F8FC] to-transparent rounded-xl p-4 mb-4"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-[#2E2E2E] text-center">{statusMessages[status]}</p>
          </motion.div>

          {/* Worker Info */}
          <motion.div
            className="border-t border-gray-100 pt-4 mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                className="w-12 h-12 bg-[#9DAAF2] bg-opacity-20 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </motion.div>
              <div>
                <h4 className="text-[#1A2238]">{request.workerName}</h4>
                <p className="text-sm text-[#2E2E2E] opacity-70">{request.workerVillage}</p>
              </div>
            </div>
          </motion.div>

          {/* Request Details */}
          <motion.div
            className="space-y-3 text-sm"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <div>
              <span className="text-[#2E2E2E] opacity-70">Preferred Time:</span>
              <span className="ml-2 text-[#1A2238]">{request.preferredTime}</span>
            </div>
            <div>
              <span className="text-[#2E2E2E] opacity-70">Description:</span>
              <p className="text-[#1A2238] mt-1">{request.description}</p>
            </div>
            <div>
              <span className="text-[#2E2E2E] opacity-70">Requested On:</span>
              <span className="ml-2 text-[#1A2238]">{request.requestedOn}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, type: "spring" }}
        >
          {(status === 'accepted' || status === 'in-progress') && (
            <div className="space-y-3">
              <Button variant="accent" className="w-full" size="lg">
                <div className="flex items-center justify-center gap-2">
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </motion.svg>
                  <span>Call Worker</span>
                </div>
              </Button>
            </div>
          )}

          {status === 'rejected' && (
            <Button variant="secondary" className="w-full" size="lg">
              Find Another Worker
            </Button>
          )}

          {status === 'completed' && (
            <div className="space-y-3">
              <Button variant="accent" className="w-full" size="lg">
                Rate Worker
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                Book Again
              </Button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </MobileFrame>
  );
}