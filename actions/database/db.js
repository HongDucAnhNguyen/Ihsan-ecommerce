const connectMongo = async () => {
  try {
    await fetch("/api/connectDB");
  } catch (error) {
    console.log(error);
  }
};
export default connectMongo;
