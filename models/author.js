import mongoose, { Schema } from 'mongoose';

import { formatDate } from '../utils/index.js';

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

AuthorSchema.virtual('name').get(function () {
  let fullName = '';

  if (this.first_name && this.family_name) {
    fullName = `${this.family_name}, ${this.first_name}`;
  }

  return fullName;
});

AuthorSchema.virtual('url').get(function () {
  return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual('lifespan').get(function () {
  let lifespan = '';

  if (this.date_of_birth) {
    lifespan = formatDate(this.date_of_birth);
  }

  lifespan += ' - ';

  if (this.date_of_death) {
    lifespan += formatDate(this.date_of_death);
  }

  return lifespan;
});

export default mongoose.model('Author', AuthorSchema);
