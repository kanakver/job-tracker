'use client';

interface StatusFilterProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

export default function StatusFilter({
  selectedStatus,
  onStatusChange,
}: StatusFilterProps) {
  const statuses = [
    'All',
    'Applied',
    'Interview',
    'Offer',
    'Rejected',
    'Accepted',
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => onStatusChange(status)}
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            selectedStatus === status
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
} 