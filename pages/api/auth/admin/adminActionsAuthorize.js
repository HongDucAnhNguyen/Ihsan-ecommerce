import User from "@/models/User";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const userId = req.body;
      
      const isAdmin = await User.findOne({
        $and: [
          {
            _id: userId,
          },
          { role: "admin" },
        ],
      });
      if (isAdmin) {
        console.log("nice youre admin");
        return res.status(200).end();
      } else return res.status(401).json({ message: "Unauthorized" });
    } else return res.status(405).json({ message: "Invalid method" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong with the server" });
  }
};
export default handler;
