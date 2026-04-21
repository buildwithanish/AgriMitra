import { asyncHandler } from "../utils/asyncHandler.js";

export const checkout = asyncHandler(async (req, res) => {
  const plan = req.body.plan || "starter";
  const amount = req.body.amount || 99;

  res.json({
    success: true,
    data: {
      transactionId: `txn_${Date.now()}`,
      plan,
      amount,
      currency: "INR",
      status: "gateway-ready"
    },
    message: `Checkout request prepared for the \u20B9${amount}/month ${plan} plan. Connect Razorpay or Stripe credentials for live payment capture.`
  });
});
