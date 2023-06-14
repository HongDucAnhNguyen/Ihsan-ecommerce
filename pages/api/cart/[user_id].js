import User from "@/models/User";
import Product from "@/models/Product";
import { authorize } from "@/actions/middleware/accountAuthorize";
const handler = async (req, res) => {
  try {
    const { user_id } = req.query; //get userid
    authorize(req, res, user_id);
    if (req.method === "GET") {
      //getting all items currently in cart
      const user = await User.findById(user_id);
      const itemsInCart = user.itemsInCart;
      if (itemsInCart.length === 0) {
        return res.status(200).json([]);
      }
      //get items in cart with the data of the productObjects
      const itemsInCartPromises = itemsInCart.map(async (item) => {
        const {
          imgUrl,
          title,
          description,
          price,
          maxQuantityPerPurchase,
          availableStock,
          isOnSale,
          salePrice,
        } = await getProduct(item.itemId);
        return {
          // _id: item._id,
          itemId: item.itemId,
          imgUrl,
          title,
          description,
          price,
          maxQuantityPerPurchase,
          availableStock,
          isOnSale,
          salePrice,
          isSelectedForCheckOut: item.isSelectedForCheckOut,
        };
      });
      const itemsInCartData = await Promise.all(itemsInCartPromises);
      return res.status(200).json(itemsInCartData);
    } else if (req.method === "PATCH") {
      //adding item to cart
      const productId = req.body; //just string
      //find user by id, add productid to itemsincart array
      const user = await User.findById(user_id);
      const itemExists = user.itemsInCart.find(
        (item) => item.itemId === productId
      );
      if (itemExists) {
        return res.status(401).json({
          messageTitle: "Existing Item",
          message: "product already in cart",
        });
      } else if (user.itemsInCart.length === 10) {
        return res.status(401).json({
          messageTitle: "Cart Limit Reached",
          message: "Cart capacity is limited to 10 items per purchase",
        });
      }
      await User.findByIdAndUpdate(
        user_id,
        {
          $push: {
            itemsInCart: { itemId: productId, isSelectedForCheckOut: true },
          },
        },
        { new: true }
      );
      const {
        imgUrl,
        title,
        description,
        price,
        maxQuantityPerPurchase,
        isOnSale,
        salePrice,
      } = await getProduct(productId);

      console.log("added item to cart");
      return res.status(200).json({
        // _id: user.itemsInCart[user.itemsInCart.length - 1]._id,
        itemId: productId,
        imgUrl,
        title,
        description,
        price,
        maxQuantityPerPurchase,
        isOnSale,
        salePrice,
        isSelectedForCheckOut: true,
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
