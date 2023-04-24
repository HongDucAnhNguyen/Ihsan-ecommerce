import Product from "@/models/Product";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const productsOnSale = await Product.find({ isOnSale: true });
      return res.status(200).json(productsOnSale);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong with the server" });
  }
};
export default handler;
