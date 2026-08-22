import mongoose from 'mongoose';

const artworkSchema = new mongoose.Schema(
  {
    uploaderId: mongoose.Schema.Types.ObjectId,
    imageUrl: String,
    feedback: [{ userId: String, text: String }]
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Artwork', artworkSchema);