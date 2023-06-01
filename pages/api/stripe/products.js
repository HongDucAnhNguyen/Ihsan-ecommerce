import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { id, title, isOnSale, salePrice, price, description, imgUrl } =
        req.body;
      const newStripeProduct = await stripe.products.create({
        id: id,
        default_price_data: {
          currency: "cad",
          //unit amounts come in cents
          unit_amount: isOnSale ? salePrice * 100 : price * 100,
        },
        
        name: title,
        description: description,
        images: [imgUrl],
      });
      console.log("added a product in stripe");
      return res.status(200).json(newStripeProduct);
    } else if (req.method === "GET") {
    } else return res.status(405).json({ message: "invalid method" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error creating product in Stripe" });
  }
};
export default handler;
