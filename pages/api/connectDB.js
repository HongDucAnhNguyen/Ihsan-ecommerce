import mongoose from "mongoose";

const handler = async (req, res) => {
  try {
    if (req.method !== "GET") {
      return res.status(403).json({ message: "Method not supported" });
    }
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      //if already connected.
      console.log("already connected to mongo");
      return res
        .status(200)
        .json({ message: "Connection already established" });
    }
    await mongoose.connect(process.env.MONGODB_URI_IHSAN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connection established");
    return res.status(200).json({ message: "Connection established" });
  } catch (error) {
    console.log("connection error: " + error);
  }
};
export default handler;
