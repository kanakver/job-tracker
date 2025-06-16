'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ApplicationsTable from '@/components/applications/ApplicationsTable';
import ApplicationDetailsModal from '@/components/applications/ApplicationDetailsModal';
import JobApplicationForm from '@/components/applications/JobApplicationForm';
import StatusFilter from '@/components/applications/StatusFilter';
import DateSorter from '@/components/applications/DateSorter';

interface Application {
  _id: string;
  company: string;
  role: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected' | 'Accepted';
  appliedDate: string;
  notes?: string;
}

export default function ApplicationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetchApplications();
    }
  }, [session]);

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/applications');
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleCreate = async (data: Omit<Application, '_id'>) => {
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await fetchApplications();
        setIsFormOpen(false);
      }
    } catch (error) {
      console.error('Error creating application:', error);
    }
  };

  const handleUpdate = async (data: Application) => {
    try {
      const response = await fetch(`/api/applications/${data._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await fetchApplications();
        setIsFormOpen(false);
      }
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return;

    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchApplications();
      }
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const filteredApplications = applications
    .filter((app) => statusFilter === 'all' || app.status === statusFilter)
    .sort((a, b) => {
      const dateA = new Date(a.appliedDate).getTime();
      const dateB = new Date(b.appliedDate).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Job Applications</h1>
        <button
          onClick={() => {
            setSelectedApplication(null);
            setIsFormOpen(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Application
        </button>
      </div>

      <div className="flex space-x-4 mb-6">
        <StatusFilter value={statusFilter} onChange={setStatusFilter} />
        <DateSorter value={sortOrder} onChange={setSortOrder} />
      </div>

      <ApplicationsTable
        applications={filteredApplications}
        onEdit={(app) => {
          setSelectedApplication(app);
          setIsFormOpen(true);
        }}
        onDelete={handleDelete}
        onView={(app) => {
          setSelectedApplication(app);
          setIsDetailsOpen(true);
        }}
      />

      {isFormOpen && (
        <JobApplicationForm
          application={selectedApplication}
          onSubmit={selectedApplication ? handleUpdate : handleCreate}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedApplication(null);
          }}
        />
      )}

      {isDetailsOpen && (
        <ApplicationDetailsModal
          application={selectedApplication}
          onClose={() => {
            setIsDetailsOpen(false);
            setSelectedApplication(null);
          }}
        />
      )}
    </div>
  );
} 