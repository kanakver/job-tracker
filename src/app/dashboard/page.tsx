import { Metadata } from 'next';
import DashboardStats from '@/components/dashboard/DashboardStats';
import RecentApplications from '@/components/dashboard/RecentApplications';
import ApplicationStatus from '@/components/dashboard/ApplicationStatus';

export const metadata: Metadata = {
  title: 'Dashboard | Job Application Tracker',
  description: 'Track your job applications and manage your job search',
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          
          {/* Stats Overview */}
          <div className="mt-8">
            <DashboardStats />
          </div>

          {/* Main Content */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Recent Applications */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">Recent Applications</h2>
                <RecentApplications />
              </div>
            </div>

            {/* Application Status */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">Application Status</h2>
                <ApplicationStatus />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 