import User from "@/models/User";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY /**stripe api key */);
const handler = async (req, res) => {
  if (req.method === "POST") {
    // const userId = req.body
    // const user = await User.findById(userId);
    // const itemsToCheckOut = user.itemsToCheckOut
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: "price_1NDatMGpf7AVBE7PGL32XKuo",
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
export default handler;
