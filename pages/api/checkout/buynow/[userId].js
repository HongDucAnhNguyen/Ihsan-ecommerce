import Product from "@/models/Product";
import User from "@/models/User";

const handler = async (req, res) => {
  try {
    const { userId } = req.query; //get userid

    if (req.method === "PATCH" || req.method === "PUT") {
      const { productId, quantity } = req.body;
      await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            itemsToCheckOut: [{ itemId: productId, quantity: quantity }],
          },
        },
        { new: true }
      );
      const productToBuyNow = await Product.findById(productId);
      const { imgUrl, title, price, isOnSale, salePrice } =
        productToBuyNow;
      return res.status(200).json([
        {
          itemId: productId,
          imgUrl,
          title,
          description,
          price,
          isOnSale,
          salePrice,
          quantity: quantity,
        },
      ]);
    } else return res.status(405).json({ message: "Invalid Method" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong with the servewr" });
  }
};
export default handler;
