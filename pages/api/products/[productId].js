import Product from "@/models/Product";
import User from "@/models/User";

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
      const allUsers = await User.find(); //get all users
      allUsers.forEach((user) => {
        removeItemFromCart(user, productId);
      });

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

const removeItemFromCart = async (user, productId) => {
  try {
    const itemIsInCart = user.itemsInCart.find(
      (itemId) => itemId === productId
    );
    if (itemIsInCart) {
      //update the user's cart
      await User.findByIdAndUpdate(
        user._id,
        { $pull: { itemsInCart: productId } },
        { new: true }
      );
    }
    
  } catch (error) {
    console.log(error);
  }
};
