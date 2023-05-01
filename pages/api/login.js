import { serialize } from "cookie";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const handler = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res
        .status(405)
        .json({ message: "only POST requests are allowed" });
    }
    const { username, password } = req.body;
    const existingUser = await User.findOne({
      username: username,
    });
    if (!existingUser) {
      console.log("invalid creds");
      return res.status(401).json({ message: "invalid username" });
    }
    const passwordsMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordsMatch) {
      return res.status(401).json({ message: "invalid password" });
    }
    const token = jwt.sign(
      { username: username, id: existingUser._id },
      process.env.JWT_KEY,
      { expiresIn: "4h" }
    );

    //config cookie options
    const cookieOptions = {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    };
    res.setHeader("Set-Cookie", serialize("token", token, cookieOptions));
    console.log("logged in");
    return res.status(200).json({
      result: { username: existingUser.username, id: existingUser._id },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "something went wrong with the server" });
  }
};
export default handler;
