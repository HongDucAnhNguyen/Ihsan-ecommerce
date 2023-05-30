import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const productData = req.body;
      const newStripeProduct = await stripe.products.create({
        id: productData.id,
        default_price_data: {
          currency: "cad",

          unit_amount: productData.isOnSale
            ? productData.salePrice * 100
            : productData.price * 100,
        },
        name: productData.title,
        description: productData.description,
        images: [productData.imgUrl],
      });
      console.log("added a product in stripe");
      return res.status(200).json(newStripeProduct);
    } else return res.status(405).json({ message: "invalid method" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error creating product in Stripe" });
  }
};
export default handler;
