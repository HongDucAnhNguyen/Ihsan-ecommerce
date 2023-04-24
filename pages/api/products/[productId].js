import connectMongo from "@/database/db";
import Product from "@/models/Product";

const handler = async (req, res) => {
  try {
    connectMongo()
    if (req.method === "PUT" || req.method === "PATCH") {
      const updatedData = req.body;
      const { productId } = req.query;
      const productsOnSale = await Product.findByIdAndUpdate(
        productId,
        updatedData,
        { new: true }
      );
      console.log("updated product successfully");
      return res.status(200).json(productsOnSale);
    }
    if (req.method === "DELETE") {
      const { productId } = req.query;
      await Product.findByIdAndDelete(productId);
      console.log("deleted product successfully");
      return res.status(200).end();
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong with the server" });
  }
};
export default handler;
