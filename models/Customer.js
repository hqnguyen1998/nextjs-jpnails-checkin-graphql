import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';

const Schema = mongoose.Schema;

mongoose.plugin(slug);

const CustomerSchema = new Schema({
  first_name: {
    type: String,
    trim: true,
    required: [true, 'Required First Name'],
  },
  last_name: {
    type: String,
    trim: true,
    required: [true, 'Required Last Name'],
  },
  phone: {
    type: String,
    trim: true,
    required: [true, 'Required Phone Number'],
    unique: [true, 'Phone number is already existed'],
  },
  checkIn: [
    {
      type: Schema.Types.ObjectId,
      ref: 'CheckIn',
    },
  ],
  created_date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Customer ||
  mongoose.model('Customer', CustomerSchema);
