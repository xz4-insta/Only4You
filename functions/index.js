const functions = require("firebase-functions");
const Razorpay = require("razorpay");
const cors = require("cors")({origin: true});

// ⚠️ PUT YOUR TEST KEYS HERE (ONLY LOCALLY)
const razorpay = new Razorpay({
  key_id: "rzp_test_SHVFTNzBwF1sz0",
  key_secret: "v6XrpR6RmkTDM68qrl3X38a8",
});

exports.createOrder = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const order = await razorpay.orders.create({
        amount: 9900, // ₹99
        currency: "INR",
      });

      res.status(200).json(order);
    } catch (error) {
      console.error("Order creation failed:", error);
      res.status(500).send("Order creation failed");
    }
  });
});
