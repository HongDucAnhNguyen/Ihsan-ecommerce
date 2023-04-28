import connectMongo from "@/database/db";
import User from "@/models/User";
import bcrypt from "bcrypt";
const handler = async (req, res) => {
  try {
    const { userId } = req.query;

    if (req.method === "DELETE") {
      console.log(userId);
      await User.findByIdAndDelete(userId);
      console.log("account deleted successfully");
      return res.status(200).json({ message: "account deleted successfully" });
    }
    if (req.method === "PUT" || req.method === "PATCH") {
      const updatedUserData = req.body;
      const hashedPassword = await bcrypt.hash(updatedUserData.password, 10);
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { ...updatedUserData, password: hashedPassword },
        { new: true }
      );
      console.log("updated user account");
      return res.status(200).json({
        result: {
          result: { username: updatedUser.username, id: updatedUser._id },
        },
        message: "account updated successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "something went wrong with the server" });
  }
};
export default handler;
