import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: String,
    credits: Number
  },
  {
    timestamps: true
  }
);

export default mongoose.model('User', userSchema);