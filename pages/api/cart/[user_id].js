import User from "@/models/User";
import Product from "@/models/Product";
const handler = async (req, res) => {
  try {
    const { user_id } = req.query; //get userid
    if (req.method === "GET") {
      const user = await User.findById(user_id);
      const itemsInCart = user.itemsInCart;
      if (itemsInCart.length === 0) {
        return res.status(200).json({ message: "cart is empty" });
      }
      //get items in cart with the data of the productObjects
      const itemsInCartPromises = itemsInCart.map((itemId) => {
        return getProduct(itemId);
      });
      const itemsInCartData = await Promise.all(itemsInCartPromises);
      return res.status(200).json(itemsInCartData);
    } else if (req.method === "PATCH") {
      const productId = req.body; //just string
      //find user by id, add productid to itemsincart array
      const user = await User.findById(user_id);
      const itemExists = user.itemsInCart.find((item) => item === productId);
      if (itemExists) {
        return res.status(401).json({ message: "product already in cart" });
      }
      const updatedUser = await User.findByIdAndUpdate(
        user_id,
        { $push: { itemsInCart: productId } },
        { new: true }
      );
      const itemsInCartPromises = updatedUser.itemsInCart.map((itemId) => {
        return getProduct(itemId);
      });
      const itemsInCartData = await Promise.all(itemsInCartPromises);
      console.log("added item to cart");
    } else {
      return res.status(404).json({ message: "Invalid Method" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "something went wrong with the server" });
  }
};
export default handler;

const getProduct = async (productId) => {
  try {
    const product = await Product.findById(productId);
    return product;
  } catch (error) {
    console.log(error);
  }
};
