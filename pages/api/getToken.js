import { parse } from "cookie";
const handler = async (req, res) => {
  try {
    //get the token from cookies
    const cookies = parse(req.headers.cookie || "");
    const token = cookies?.token;
    return res.status(200).json(token ? token : "");
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong with the server" });
  }
};
export default handler;
