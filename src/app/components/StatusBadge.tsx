interface StatusBadgeProps {
  status: 'pending' | 'accepted' | 'rejected' | 'in-progress' | 'completed';
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
    'in-progress': {
      label: 'In Progress',
      className: 'bg-[#9DAAF2] text-white',
    },
    completed: {
      label: 'Completed',
      className: 'bg-[#4CAF50] text-white',
    },
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-4 py-2 rounded-full ${config.className}`}>
      {config.label}
    </span>
  );
}
