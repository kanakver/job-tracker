import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
  },
  role: {
    type: String,
    required: [true, 'Job role is required'],
    trim: true,
  },
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected', 'Accepted'],
    default: 'Applied',
  },
  appliedDate: {
    type: Date,
    required: [true, 'Applied date is required'],
    default: Date.now,
  },
  notes: {
    type: String,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
jobApplicationSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.JobApplication || mongoose.model('JobApplication', jobApplicationSchema); 