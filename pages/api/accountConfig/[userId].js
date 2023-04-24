import connectMongo from "@/database/db";
import User from "@/models/User";

const handler = async (req, res) => {
  try {
    connectMongo();
    const { userId } = req.query;
    if (req.method === "DELETE") {
      console.log(userId);
      await User.findByIdAndDelete(userId);
      console.log("account deleted successfully");
      return res.status(200).json({ message: "account deleted successfully" });
    }
    if (req.method === "PUT" || req.method === "PATCH") {
      const updatedUserData = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        updatedUserData,
        { new: true }
      );
      console.log("updated user account");
      return res.status(200).json(updatedUser);
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "something went wrong with the server" });
  }
};
export default handler;
