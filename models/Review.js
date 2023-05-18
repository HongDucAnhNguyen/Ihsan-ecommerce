import mongoose from "mongoose";
const ReviewSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);
const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);
export default Review;
