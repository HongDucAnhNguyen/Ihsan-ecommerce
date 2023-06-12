import Product from "@/models/Product";
import Review from "@/models/Review";

const handler = async (req, res) => {
  try {
    const { productId } = req.query;
    if (req.method === "GET") {
      let ratingSum = 0;
      const allReviewsOfProduct = await Review.find({ productId: productId });
      if (allReviewsOfProduct.length === 0) {
        console.log("No reviews")
        return res.status(404).json({ message: "product has no reviews" });
      }
      allReviewsOfProduct.forEach((review) => {
        ratingSum += review.rating;
      });
      const averageRating = ratingSum / allReviewsOfProduct.length;
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { rating: averageRating },
        { new: true }
      );
      console.log("updated rating");

      return res.status(200).json(updatedProduct);
    } else return res.status(204).json({ message: "Invalid method" });
  } catch (error) {
    console.error("Error calculating average rating:", error);
    return res
      .status(500)
      .json({ message: "something went wrong with the server" });
  }
};
export default handler;
