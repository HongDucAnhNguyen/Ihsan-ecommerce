import Product from "@/models/Product";
const handler = async (req, res) => {
  try {
    const { userId } = req.query;

    if (req.method === "PATCH" || req.method === "PUT") {
      const productId = req.body;
      await Product.findByIdAndUpdate(
        productId,
        {
          $pull: {
            likes: userId,
          },
        },
        { new: true }
      );
      return res.status(200).end();
    } else return res.status(405).json({ message: "Invalid Method" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong with the server" });
  }
};
export default handler;
