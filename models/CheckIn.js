import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';

const Schema = mongoose.Schema;

mongoose.plugin(slug);

const CheckInSchema = new Schema({
  temperature: {
    type: String,
  },
  services: [
    {
      type: String,
    },
  ],
  date_checkIn: {
    type: String,
  },
  time_checkIn: {
    type: String,
  },
  tech_required: [
    {
      type: String,
    },
  ],
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.CheckIn ||
  mongoose.model('CheckIn', CheckInSchema);
