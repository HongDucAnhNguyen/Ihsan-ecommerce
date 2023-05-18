import Review from "@/models/Review";
const handler = async (req, res) => {
  try {
    const { productId } = req.query;
    if (req.method === "GET") {
      const allReviewsOfProduct = await Review.find({ productId: productId });
      return res.status(200).json(allReviewsOfProduct);
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
