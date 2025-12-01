import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    cafeId: { type: Number, required: true },
  },
  { timestamps: true }
);

ReviewSchema.index({ cafeId: 1 });

ReviewSchema.index({ cafeId: 1, createdAt: -1 });

const ReviewModel =
  mongoose.models.Review || mongoose.model("Review", ReviewSchema);

export default ReviewModel;
