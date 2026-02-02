import express from "express";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔍 Debug (TEMPORARY – helps beginners)
console.log("KEY ID:", process.env.RAZORPAY_KEY_ID ? "Loaded" : "Missing");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: 1 * 100, // rupees → paise
      currency: "INR",
      receipt: "order_" + Date.now(), // UNIQUE ORDER ID
    });
  

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Order creation failed" });
  }
});

app.listen(5000, () => {
  console.log("✅ Backend running on http://localhost:5000");
});
