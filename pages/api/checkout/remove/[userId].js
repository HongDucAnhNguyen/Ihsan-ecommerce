import User from "@/models/User";
const handler = async (req, res) => {
  try {
    if (req.method !== "PATCH") {
      return res.status(405).json({ message: "Invalid method" });
    }

    //removing an item from cart (not actual erasing of data)
    const { userId } = req.query;
    
    const productId = req.body;
    //security measures
    const user = await User.findById(userId);
    const itemIsInCheckOut = user.itemsToCheckOut.find(
      (item) => item.itemId === productId
    );
    if (!itemIsInCheckOut) {
      return res
        .status(404)
        .json({ message: "item is not selected for checkout" });
    }
    //update the user's cart
    await User.findByIdAndUpdate(
      userId,
      { $pull: { itemsToCheckOut: { itemId: productId } } },
      { new: true }
    );
    console.log("item removed from checkout");
    return res.status(200).end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "something went wrong with the server" });
  }
};
export default handler;
