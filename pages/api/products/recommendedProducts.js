import Product from "@/models/Product";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const recommendedProducts = await Product.find({ rating: { $gte: 4 } });

      return res.status(200).json(recommendedProducts);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong with the server" });
  }
};
export default handler;
