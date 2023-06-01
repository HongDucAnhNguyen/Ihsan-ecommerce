import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const handler = async (req, res) => {
  try {
    const { productId } = req.query;

    if (req.method === "PATCH" || req.method === "PUT") {
      const { title, price, description, imgUrl } = req.body;
      const productRetrieved = await stripe.products.retrieve(productId);
      const priceRetrieved = await stripe.prices.retrieve(
        productRetrieved.default_price
      );
      if (price !== priceRetrieved.unit_amount) {
        await stripe.prices.update(priceRetrieved.id, {
          active: false, // Set the old price as inactive
        });
        const newPrice = await stripe.prices.create({
          product: productId,
          unit_amount: price * 100,
          currency: "cad",
        });
        await stripe.products.update(productId, {
          default_price: newPrice.id,
        });
      }

      const updatedStripeProduct = await stripe.products.update(productId, {
        name: title,
        description: description,
        images: [imgUrl],
      });
      console.log("product updated in stripe");
      return res.status(200).json(updatedStripeProduct);
    } else if (req.method === "DELETE") {
      await stripe.products.del(productId);
      console.log("product removed from stripe");
      return res.status(200).end();
    } else return res.status(405).json({ message: "Invalid method" });
  } catch (error) {
    console.log(error);
  }
};
export default handler;
