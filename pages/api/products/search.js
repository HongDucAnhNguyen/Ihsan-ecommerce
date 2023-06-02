import connectMongo from "@/actions/database/db";
import Product from "@/models/Product";
const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { searchQuery } = req.query;
      //case insensitive
      const searchKey = new RegExp(searchQuery, "i");
      const productSearchResults = await Product.find({
        $or: [
          { title: { $regex: searchKey } },
          { description: { $regex: searchKey } },
          { category: { $regex: searchKey } },
          
        ],
      });
      return res.status(200).json(productSearchResults);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong with the server" });
  }
};
export default handler;
