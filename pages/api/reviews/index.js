import Review from "@/models/Review";
const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const reviewData = req.body;
      console.log(reviewData);
      //if user already commented on product
      const existingComment = await Review.findOne({
        $and: [
          {
            userId: reviewData.userId,
          },
          { productId: reviewData.productId },
        ],
      });
      
      if (existingComment) {
        return res.status(415).json({ message: "can only comment once" });
      }
      const newReview = await Review.create(reviewData);
      return res.status(200).json(newReview);
    } else {
      return res.status(204).json({ message: "Invalid method" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "something went wrong with the server" });
  }
};
export default handler;
