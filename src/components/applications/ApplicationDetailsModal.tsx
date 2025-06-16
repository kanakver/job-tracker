import { format } from 'date-fns';
import { X } from 'lucide-react';

interface Application {
  _id: string;
  company: string;
  role: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected' | 'Accepted';
  appliedDate: string;
  notes?: string;
}

interface ApplicationDetailsModalProps {
  application: Application | null;
  onClose: () => void;
}

const statusColors = {
  Applied: 'bg-blue-100 text-blue-800',
  Interview: 'bg-yellow-100 text-yellow-800',
  Offer: 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800',
  Accepted: 'bg-purple-100 text-purple-800',
};

export default function ApplicationDetailsModal({
  application,
  onClose,
}: ApplicationDetailsModalProps) {
  if (!application) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-900">
            Application Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Company</h3>
            <p className="mt-1 text-gray-600">{application.company}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Role</h3>
            <p className="mt-1 text-gray-600">{application.role}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Status</h3>
            <span
              className={`mt-1 px-2 inline-flex text-sm leading-5 font-semibold rounded-full ${
                statusColors[application.status]
              }`}
            >
              {application.status}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Applied Date</h3>
            <p className="mt-1 text-gray-600">
              {format(new Date(application.appliedDate), 'MMMM d, yyyy')}
            </p>
          </div>
          {application.notes && (
            <div>
              <h3 className="text-lg font-medium text-gray-900">Notes</h3>
              <p className="mt-1 text-gray-600 whitespace-pre-wrap">
                {application.notes}
              </p>
            </div>
          )}
        </div>
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
} 