import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, required: true },
  cafeId: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

ReviewSchema.index({ cafeId: 1 });

ReviewSchema.index({ cafeId: 1, createdAt: -1 });

const ReviewModel =
  mongoose.models.Review || mongoose.model("Review", ReviewSchema);

export default ReviewModel;
