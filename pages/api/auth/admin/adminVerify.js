import User from "@/models/User";
import bcrypt from "bcrypt";

const handler = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res
        .status(405)
        .json({ message: "only POST requests are allowed" });
    }
    const { username, password } = req.body;
    const { _id } = await User.findOne({ username: username });
    if (!_id) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    const existingUser = await User.findOne({
      $and: [
        {
          username: username,
        },
        {
          _id: _id,
        },
        { role: "admin" },
      ],
    });
    if (!existingUser) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    const passwordsMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordsMatch) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    return res.status(200).end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "something went wrong with the server" });
  }
};
export default handler;
