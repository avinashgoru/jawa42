import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    dealer: {
      type: String,
      trim: true,
    },
    model: {
      type: String,
      trim: true,
    },
    date: {
      type: String,
    },
    source: {
      type: String,
      default: 'Website Inquiry',
    },
    buildDetails: {
      color: String,
      wheels: String,
      exhaust: String,
      seat: String,
      mirrors: String,
      city: String,
      estimatedPrice: Number,
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Test Ride Scheduled', 'Converted', 'Closed'],
      default: 'New',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Lead || mongoose.model('Lead', leadSchema);
