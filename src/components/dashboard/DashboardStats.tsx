'use client';

import { useState, useEffect } from 'react';

interface Stats {
  total: number;
  applied: number;
  interviewing: number;
  offers: number;
}

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    applied: 0,
    interviewing: 0,
    offers: 0,
  });

  useEffect(() => {
    // TODO: Fetch stats from API
    // For now, using dummy data
    setStats({
      total: 12,
      applied: 8,
      interviewing: 3,
      offers: 1,
    });
  }, []);

  const statCards = [
    {
      name: 'Total Applications',
      value: stats.total,
      color: 'bg-blue-500',
    },
    {
      name: 'Applied',
      value: stats.applied,
      color: 'bg-yellow-500',
    },
    {
      name: 'Interviewing',
      value: stats.interviewing,
      color: 'bg-green-500',
    },
    {
      name: 'Offers',
      value: stats.offers,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => (
        <div
          key={stat.name}
          className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
        >
          <dt>
            <div className={`absolute rounded-md ${stat.color} p-3`}>
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">
              {stat.name}
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
          </dd>
        </div>
      ))}
    </div>
  );
} 