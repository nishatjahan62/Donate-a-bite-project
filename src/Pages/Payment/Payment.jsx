import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import RequestCharityRole from "../userdashbord/RequestCarityRole/RequestCharity";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <RequestCharityRole />
    </Elements>
  );
};

export default Payment;
