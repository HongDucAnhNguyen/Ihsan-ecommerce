import User from "@/models/User";
const handler = async (req, res) => {
  try {
    const { userId } = req.query;
    
    if (req.method === "PUT" || req.method === "PATCH") {
      const { productId, quantity } = req.body;
      const user = await User.findById(userId);
      // Find the index of the item to update
      const index = user.itemsToCheckOut.findIndex(
        (item) => item.itemId === productId
      );
      if (index !== -1) {
        user.itemsToCheckOut[index].quantity = quantity;
        await user.save(); // Save the updated user to the database
      }
      console.log("item quantity updated");
      res.status(200).end();
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "something went wrong with the server" });
  }
};
export default handler;
