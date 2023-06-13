import Product from "@/models/Product";
import Review from "@/models/Review";
import User from "@/models/User";

const handler = async (req, res) => {
  try {
    const { productId } = req.query;
    if (req.method === "GET") {
      const productDetails = await Product.findById(productId);
      return res.status(200).json(productDetails);
    } else if (req.method === "PUT" || req.method === "PATCH") {
      const updatedData = req.body;
      if (updatedData.availableStock === 0) {
        const allUsers = await User.find();
        allUsers.forEach((user) => {
          removeItemFromCheckOut(user, productId);
          removeItemFromCart(user, productId);
        });
      }
      if (updatedData.salePrice > updatedData.price) {
        return res.status(415).json({
          messageTitle: "Pricing Error",
          message: "sale price cannot exceed original price",
        });
      } else if (
        updatedData.maxQuantityPerPurchase > 1 &&
        updatedData.maxQuantityPerPurchase > updatedData.availableStock
      ) {
        return res.status(415).json({
          messageTitle: "Insufficient Stock",
          message: "max quantity per purchase cannot exceed available stock",
        });
      }
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
        removeItemFromCheckOut(user, productId);
        removeItemFromCart(user, productId);
      });

      await Product.findByIdAndDelete(productId);
      console.log("deleted product successfully");
      //removing the reviews corresponding to this product
      const allReviewsForProduct = await Review.find({
        productId: productId,
      });
      allReviewsForProduct.map(async (review) => {
        await Review.findByIdAndDelete(review._id);
      });
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
    const itemIsInCart = await user.itemsInCart.find(
      (item) => item.itemId === productId
    );
    if (itemIsInCart) {
      //update the user's cart
      await User.findByIdAndUpdate(
        user._id,
        { $pull: { itemsInCart: { itemId: productId } } },
        { new: true }
      );
    }
  } catch (error) {
    console.log(error);
  }
};
const removeItemFromCheckOut = async (user, productId) => {
  try {
    const itemIsInCart = await user.itemsForCheckOut.find(
      (item) => item.itemId === productId
    );
    if (itemIsInCart) {
      //update the user's cart
      await User.findByIdAndUpdate(
        user._id,
        { $pull: { itemsToCheckOut: { itemId: productId } } },
        { new: true }
      );
    }
  } catch (error) {
    console.log(error);
  }
};
