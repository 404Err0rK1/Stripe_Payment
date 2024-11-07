import express from "express";
import Stripe from "stripe";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 8000;
app.use(cors());
const DOMAIN_URL = process.env.DOMAIN_URL;

app.get("/", (req, res) => {
  res.send("Hello from Server");
});

app.post("/create-checkout-session", async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: "price_1PxNrmKMztBLVeWcS8sLcyxo",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${DOMAIN_URL}?success=true`,
    cancel_url: `${DOMAIN_URL}?canceled=true`,
  });

  res.redirect(303, session.url);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
