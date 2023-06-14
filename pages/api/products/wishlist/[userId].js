import Product from "@/models/Product";
const handler = async (req, res) => {
  try {
    const { userId } = req.query;

    if (req.method === "GET") {
      const allProducts = await Product.find();
      let usersWishList = [];
      allProducts.forEach((product) => {
        const existingUserId = product.likes.find(
          (user_id) => user_id === userId
        );
        if (existingUserId) {
          usersWishList.push({ _id: product._id, title: product.title });
        }
      });
      
      //list of products user has liked
      return res.status(200).json(usersWishList);
    } else if (req.method === "PATCH" || req.method === "PUT") {
      authorize(req,res,userId)
      const productId = req.body;
      const productRetrieved = await Product.findById(productId);
      const alreadyInWishList = productRetrieved.likes.find(
        (user_id) => user_id === userId
      );
      if (alreadyInWishList) {
        return res
          .status(404)
          .json({ message: "product already in wish list" });
      }
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
          $push: {
            likes: userId,
          },
        },
        { new: true }
      );
      return res
        .status(200)
        .json({ _id: updatedProduct._id, title: updatedProduct.title });
    } else return res.status(405).json({ message: "Invalid Method" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong with the server" });
  }
};
export default handler;
