'use client';

import { useState, useEffect } from 'react';

interface StatusCount {
  status: string;
  count: number;
  color: string;
}

export default function ApplicationStatus() {
  const [statusCounts, setStatusCounts] = useState<StatusCount[]>([]);

  useEffect(() => {
    // TODO: Fetch status counts from API
    // For now, using dummy data
    setStatusCounts([
      { status: 'Applied', count: 8, color: 'bg-yellow-500' },
      { status: 'Interview', count: 3, color: 'bg-blue-500' },
      { status: 'Offer', count: 1, color: 'bg-green-500' },
      { status: 'Rejected', count: 2, color: 'bg-red-500' },
    ]);
  }, []);

  const total = statusCounts.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="mt-4">
      <div className="space-y-4">
        {statusCounts.map((item) => (
          <div key={item.status}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`h-4 w-4 rounded-full ${item.color}`} />
                <span className="ml-2 text-sm font-medium text-gray-900">
                  {item.status}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {item.count}
              </span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
              <div
                className={`h-2 rounded-full ${item.color}`}
                style={{
                  width: `${(item.count / total) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-right text-sm text-gray-500">
        Total Applications: {total}
      </div>
    </div>
  );
} 