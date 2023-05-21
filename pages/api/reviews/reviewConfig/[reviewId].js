import Review from "@/models/Review";
const handler = async (req, res) => {
  try {
    const { reviewId } = req.query;
    if (req.method === "PATCH" || req.method === "PUT") {
      const updatedData = req.body;
      const updatedReview = await Review.findByIdAndUpdate(
        reviewId,
        updatedData,
        { new: true }
      );
      return res.status(200).json(updatedReview);
    } else if (req.method === "DELETE") {
      await Review.findByIdAndDelete(reviewId);
      return res.status(200).json({ message: "Deleted review successfully" });
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
