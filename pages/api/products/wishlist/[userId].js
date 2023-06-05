import Product from "@/models/Product";
const handler = async (req, res) => {
  try {
    const { userId } = req.query;

    if (req.method === "GET") {
      const allProducts = await Product.find();
      const usersWishList = allProducts.map((product) => {
        const existingUserId = product.likes.find(
          (user_id) => user_id === userId
        );
        if (existingUserId) {
          return product;
        }
      });
      //list of products user has liked
      return res.status(200).json(usersWishList);
    }
  } catch (error) {}
};
export default handler;
