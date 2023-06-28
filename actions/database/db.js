const connectMongo = async () => {
  try {
    await fetch(`${process.env.BASE_APP_URL}/api/connectDB`);
  } catch (error) {
    console.log(error);
  }
};
export default connectMongo;
