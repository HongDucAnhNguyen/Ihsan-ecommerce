import { serialize } from "cookie";

const handler = async (req, res) => {
  try {
    if (req.method !== "GET") {
      return res.status(403).json({ message: "only GET method allowed" });
    }
    res.setHeader(
      "Set-Cookie",
      serialize("token", "", {
        maxAge: -1,
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      })
    );
    console.log("cookies cleared");
    res.status(200).end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "something went wrong with the server" });
  }
};
export default handler;
