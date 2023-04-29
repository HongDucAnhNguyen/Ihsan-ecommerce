import mongoose from "mongoose";
const connectMongo = async () => {
  try {
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      //if already connected.
      console.log("already connected to mongo");
      return mongoose.connection.asPromise();
    }
    await mongoose.connect(
      process.env.MONGODB_URI_IHSAN,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("connection established");
  } catch (error) {
    console.log("connection error: " + error);
  }
};
export default connectMongo;
