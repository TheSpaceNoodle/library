import mongoose, { Schema } from 'mongoose';
import { formatDate } from '../utils/index.js';

const BookInstanceSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
    default: 'Maintenance',
  },
  due_back: { type: Date, default: Date.now },
});

BookInstanceSchema.virtual('url').get(function () {
  return `/catalog/bookinstance/${this._id}`;
});

BookInstanceSchema.virtual('due_back_formatted').get(function () {
  return formatDate(this.due_back);
});

export default mongoose.model('BookInstance', BookInstanceSchema);
