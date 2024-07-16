import 'dotenv/config';
import mongoose from 'mongoose';

const connectDB = async () => {
  return await mongoose.connect(process.env.MONGO_URI);
};

connectDB()
  .then(() => console.log('db connected'))
  .catch((e) => console.error(e));
