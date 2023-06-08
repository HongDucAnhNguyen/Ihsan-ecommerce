import Review from "@/models/Review";
import User from "@/models/User";
import bcrypt from "bcrypt";
const handler = async (req, res) => {
  try {
    const { userId } = req.query;

    if (req.method === "DELETE") {
      console.log(userId);
      const userRetrieved = await User.findById(userId);
      if (userRetrieved.role === "admin") {
        return res.status(401).json({ message: "cannot delete admin account" });
      }
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
        {
          username: updatedUserData.newUsername,
          password: hashedNewPassword,
          role: existingUser.role,
        },
        { new: true }
      );
      //update the username displayed in user's reviews of products
      const reviewsFromUser = await Review.find({ userId: userId });
      reviewsFromUser.map(async (review) => {
        await Review.findByIdAndUpdate(
          review._id,
          { $set: { username: updatedUserData.newUsername } },
          { new: true }
        );
      });
      console.log("updated user account");
      return res.status(200).json({
        result: {
          result: {
            username: updatedUser.username,
            id: updatedUser._id,
            role: existingUser.role,
          },
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
