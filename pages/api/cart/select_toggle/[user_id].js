import User from "@/models/User";
const handler = async (req, res) => {
  try {
    if (req.method !== "PATCH") {
      return res.status(405).json({ message: "Invalid method" });
    }

    //removing an item from cart (not actual erasing of data)
    const { user_id } = req.query;
    const { productId, selectedValue } = req.body;
    //security measures
    const user = await User.findById(user_id);
    const itemIsInCart = user.itemsInCart.find(
      (item) => item.itemId === productId
    );
    if (!itemIsInCart) {
      return res.status(204).json({ message: "item is not in cart" });
    }
    //update the user's cart
    const index = user.itemsInCart.findIndex(
      (item) => item.itemId === productId
    );
    if (index !== -1) {
      user.itemsInCart[index].isSelectedForCheckOut = selectedValue;

      await user.save(); // Save the updated user to the database
    }
    console.log("item selection updated");
    res.status(200).end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "something went wrong with the server" });
  }
};
export default handler;
