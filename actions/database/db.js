const connectMongo = async () => {
  try {
    await fetch(`${process.env.BASE_APP_URL}/api/connectDB`);
    return;
  } catch (error) {
    console.log(error);
  }
};
export default connectMongo;
