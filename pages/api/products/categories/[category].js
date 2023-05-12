import Product from "@/models/Product";

const handler = async (req, res) => {
  try {
    if (req.method !== "GET") {
      return res.status(403).json({ message: "invalid request" });
    }
    const { category } = req.query;
   
    const productsByCategory = await Product.find({ category: category });
    
    return res.status(200).json(productsByCategory);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong with the server" });
  }
};
export default handler;
