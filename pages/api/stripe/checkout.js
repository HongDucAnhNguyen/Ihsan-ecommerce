import User from "@/models/User";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY /**stripe api key */);
const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const userId = req.body;
      const user = await User.findById(userId);
      const itemsToCheckOut = user.itemsToCheckOut;
      const stripeItemsPromises = itemsToCheckOut.map(
        async (itemToCheckOut) => {
          const stripeProductRetrieved = await stripe.products.retrieve(
            itemToCheckOut.itemId
          );
         
          if (stripeProductRetrieved) {
            return {
              priceId: stripeProductRetrieved.default_price,
              quantity: itemToCheckOut.quantity,
            };
          }
        }
      );
      const stripeItemsPromisesData = await Promise.all(stripeItemsPromises);
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: stripeItemsPromisesData.map((item) => ({
          price: item.priceId,
          quantity: item.quantity,
        })),
        mode: "payment",
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}`,
      });
      return res.status(200).json(session.url);
    } catch (err) {
      return res.status(err.statusCode || 500).json({message: err.message});
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
export default handler;
