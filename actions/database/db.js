const connectMongo = async () => {
  try {
    await fetch("https://ihsan-ecommerce.vercel.app/api/connectDB");
    return;
  } catch (error) {
    console.log(error);
  }
};
export default connectMongo;
