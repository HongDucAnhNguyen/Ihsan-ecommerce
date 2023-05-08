import connectMongo from "@/actions/database/db";
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
      const existingUser = await User.findById(userId);
      const validPassword = await bcrypt.compare(
        updatedUserData.password,
        existingUser.password
      );
      if (!validPassword) {
        return res
          .status(403)
          .json({ message: "invalid password, update failed" });
      }
      //else, if authorized
      const hashedNewPassword = await bcrypt.hash(
        updatedUserData.newPassword,
        10
      );
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { username: updatedUserData.username, password: hashedNewPassword },
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
