import User from "@/models/User";
import Product from "@/models/Product";
import { authorize } from "@/actions/middleware/accountAuthorize";
const handler = async (req, res) => {
  try {
    const { userId } = req.query; //get userid
    authorize(req, res, userId);
    if (req.method === "GET") {
      //getting all items currently in cart
      const user = await User.findById(userId);
      const itemsToCheckOut = user.itemsToCheckOut;
      if (itemsToCheckOut.length === 0) {
        return res.status(200).json([]);
      }
      //get items in cart with the data of the productObjects
      const itemsToCheckOutPromises = itemsToCheckOut.map(async (item) => {
        const { imgUrl, title, description, price, isOnSale, salePrice } =
          await getProduct(item.itemId);
        return {
          // _id: item._id,
          itemId: item.itemId,
          imgUrl,
          title,
          description,
          price,
          isOnSale,
          salePrice,
          quantity: item.quantity,
        };
      });
      const itemsToCheckOutData = await Promise.all(itemsToCheckOutPromises);
      return res.status(200).json(itemsToCheckOutData);
    } else if (req.method === "PATCH") {
      //adding item to cart
      const { itemId, quantity } = req.body; //just string
      //find user by id, add productid to itemsToCheckOut array
      const user = await User.findById(userId);
      const itemExists = user.itemsToCheckOut.find(
        (item) => item.itemId === itemId
      );
      if (itemExists) {
        return res
          .status(401)
          .json({ message: "product already selected to checkout" });
      }
      await User.findByIdAndUpdate(
        userId,
        { $push: { itemsToCheckOut: { itemId: itemId, quantity: quantity } } },
        { new: true }
      );
      const { imgUrl, title, description, price, isOnSale, salePrice } =
        getProduct(itemId);

      console.log("added item to check out");
      return res.status(200).json({
        imgUrl,
        title,
        description,
        price,
        isOnSale,
        salePrice,
        itemId: itemId,
        quantity: quantity,
        // _id: user.itemsToCheckOut[user.itemsToCheckOut.length - 1]._id,
      });
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
