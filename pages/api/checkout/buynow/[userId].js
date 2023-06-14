import User from "@/models/User";

const handler = async (req, res) => {
  try {
    const { userId } = req.query; //get userid
   
    if (req.method === "PATCH" || req.method === "PUT") {
      const { productId, quantity } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            itemsToCheckOut: [{ itemId: productId, quantity: quantity }],
          },
        },
        { new: true }
      );
      return res.status(200).json(updatedUser.itemsToCheckOut);
    } else return res.status(405).json({ message: "Invalid Method" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong with the servewr" });
  }
};
export default handler;
