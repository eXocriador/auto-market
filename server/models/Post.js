import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    username: { type: String },
    title: { type: String, required: true },
    // text: {type: String, required: true},
    imgUrl: { type: String, default: "" }, 
    price: { type: Number, required: true },
    views: { type: Number, default: 0 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    fuel: { type: String, required: true },
    drive: {type: String, required: true },
    engine: { type: String, required: true },
    transmission: { type: String, required: true },
    mileage: { type: Number, required: true },
    numberPlate: { type: String },

  },
  { timestamps: true } // Включает createdAt и updatedAt автоматически
);

export default mongoose.model("Post", PostSchema);
