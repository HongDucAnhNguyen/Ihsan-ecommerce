const connectMongo = async () => {
  try {
    await fetch("http://localhost:3000/api/connectDB");
  } catch (error) {
    console.log(error);
  }
};
export default connectMongo;
