import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY /**stripe api key */);
const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: "price_1NDEuhGpf7AVBE7PM26XVtWF",
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `https://buy.stripe.com/test_fZe8zM2aIcs02qY144`,
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
