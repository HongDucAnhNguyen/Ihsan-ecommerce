import Product from "@/models/Product";

const handler = async (req, res) => {
  try {
    const { productId } = req.query;
    if (req.method === "GET") {
      const productDetails = await Product.findById(productId);
      return res.status(200).json(productDetails);
    } else if (req.method === "PUT" || req.method === "PATCH") {
      const updatedData = req.body;

      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        updatedData,
        { new: true }
      );
      console.log("updated product successfully");
      return res.status(200).json(updatedProduct);
    } else if (req.method === "DELETE") {
      await Product.findByIdAndDelete(productId);
      console.log("deleted product successfully");
      return res.status(200).end();
    } else {
      return res.status(403).json({ message: "invalid request" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong with the server" });
  }
};
export default handler;
