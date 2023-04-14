import connectMongo from "@/database/db";
import User from "@/models/User";

const handler = async (req, res) => {
  try {
    connectMongo();
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests allowed" });
      return;
    }
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      console.log("User already exists");
      return res
        .status(403)
        .json({ message: "a User with this username already exists" });
    }
    const newUser = await User.create({
      username: username,
      password: password, //no hashing yet
    });
    console.log(newUser);
    return res.status(200).json({ result: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json("something went wrong with the server");
  }
};

export default handler;
