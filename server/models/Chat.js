import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  text: String,
  senderId: String,
  createdAt: { type: Date, default: Date.now },
});

const chatSchema = new mongoose.Schema({
  postId: { type: String, required: true },
  sellerId: { type: String, required: true },
  buyerId: { type: String, required: true },
  messages: [messageSchema],
});

export default mongoose.model('Chat', chatSchema);
