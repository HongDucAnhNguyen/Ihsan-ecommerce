import Product from "@/models/Product";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { productCategory } = req.query;
      const productsOnSale = await Product.find({
        $and: [
          {
            isOnSale: true,
          },
          { category: productCategory },
        ],
      });
      return res.status(200).json(productsOnSale);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong with the server" });
  }
};
export default handler;
