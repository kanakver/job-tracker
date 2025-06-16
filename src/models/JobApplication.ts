import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Applied', 'Interviewing', 'Offered', 'Rejected', 'Accepted'],
    default: 'Applied',
  },
  appliedDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true,
});

const JobApplication = mongoose.models.JobApplication || mongoose.model('JobApplication', jobApplicationSchema);

export default JobApplication; 