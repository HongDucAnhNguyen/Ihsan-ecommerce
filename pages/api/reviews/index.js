import Review from "@/models/Review";
const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const reviewData = req.body;
      const userAlreadyCommented = await Review.find({
        userId: reviewData.userId,
      });
      if (userAlreadyCommented) {
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
