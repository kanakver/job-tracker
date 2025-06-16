'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session?.user?.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="text-gray-700 hover:text-gray-900"
              >
                Dashboard
              </button>
              <button
                onClick={() => router.push('/api/auth/signout')}
                className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Users Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Users</h2>
              <div className="space-y-4">
                {/* User list will go here */}
                <p className="text-gray-500">No users found.</p>
              </div>
            </div>

            {/* Job Applications Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">All Job Applications</h2>
              <div className="space-y-4">
                {/* Job applications list will go here */}
                <p className="text-gray-500">No job applications found.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 