import Product from "@/models/Product";
const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const allProducts = await Product.find();
      return res.status(200).json(allProducts);
    } else if (req.method === "POST") {
      const productData = req.body;
      const newProduct = await Product.create(productData);
      console.log("created product successfully");
      return res.status(200).json(newProduct);
    } else {
      return res.status(403).json({ message: "invalid request" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "something went wrong with the server" });
  }
};
export default handler;
