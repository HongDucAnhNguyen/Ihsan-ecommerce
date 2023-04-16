import { serialize } from "cookie";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const handler = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).send({ message: "Only POST requests allowed" });
    }
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      console.log("User already exists");
      return res
        .status(403)
        .json({ message: "a User with this username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: username,
      password: hashedPassword, //no hashing yet
    });

    const token = jwt.sign(
      { username: username, id: newUser._id },
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
    console.log(newUser);
    return res.status(200).json({ message: "account created" });
  } catch (error) {
    console.error(error);
    return res.status(500).json("something went wrong with the server");
  }
};

export default handler;
