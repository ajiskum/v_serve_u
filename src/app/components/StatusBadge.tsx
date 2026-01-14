interface StatusBadgeProps {
  status: 'pending' | 'accepted' | 'rejected' | 'user_started' | 'in-progress' | 'worker_completed' | 'completed';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    pending: {
      label: 'Pending',
      className: 'bg-[#F4DB7D] text-[#2E2E2E]',
    },
    accepted: {
      label: 'Accepted',
      className: 'bg-[#9DAAF2] text-white',
    },
    rejected: {
      label: 'Rejected',
      className: 'bg-[#E8E8E8] text-[#2E2E2E]',
    },
    'user_started': {
      label: 'User Started',
      className: 'bg-blue-100 text-blue-600',
    },
    'in-progress': {
      label: 'In Progress',
      className: 'bg-blue-500 text-white',
    },
    'worker_completed': {
      label: 'Worker Done',
      className: 'bg-green-100 text-green-600',
    },
    completed: {
      label: 'Completed',
      className: 'bg-[#4CAF50] text-white',
    },
  };

  const config = statusConfig[status] || statusConfig.pending; // Fallback to avoid crash

  return (
    <span className={`inline-flex items-center px-4 py-2 rounded-full ${config.className}`}>
      {config.label}
    </span>
  );
}
