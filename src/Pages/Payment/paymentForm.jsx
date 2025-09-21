import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import UseAuth from "../../Hooks/UseAuth";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get data from RequestCharityRole
  const { organizationName, missionStatement, amount, purpose } =
    location.state || {};

  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    // 🔹 Show confirmation first
    const confirm = await Swal.fire({
      title: "Confirm Payment",
      text: `Are you sure you want to pay $${amount} for Charity Role Request?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Pay",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return; // stop if cancelled

    setProcessing(true);

    try {
      // 1️⃣ Create Payment Intent
      const { data } = await axiosSecure.post("/create-payment-intent", {
        amount,
      });
      const clientSecret = data.clientSecret;

      // 2️⃣ Confirm Payment
      const card = elements.getElement(CardElement);
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: {
              name: user?.displayName || "Anonymous",
              email: user?.email || "unknown",
            },
          },
        });

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        // 3️⃣ Save Transaction
        await axiosSecure.post("/transactions", {
          email: user?.email,
          amount,
          transactionId: paymentIntent.id,
          purpose,
        });

        // 4️⃣ Save Charity Request
        await axiosSecure.post("/charity-request", {
          email: user?.email,
          organizationName,
          missionStatement,
          transactionId: paymentIntent.id,
          amount,
        });

        // 🔹 Show success after confirm
        Swal.fire({
          title: "Paid",
          text: "Your charity role request has been submitted and is pending admin approval.",
          icon: "Success",
          showConfirmButton: false,
          timer: 3000,
        });

        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-[--color-secondary]">
          Complete Your Payment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="p-3 border rounded-xl bg-gray-50">
            <CardElement options={{ style: { base: { fontSize: "17px" } } }} />
          </div>

          {error && <p className="text-red-500 mt-3">{error}</p>}

          <button
            type="submit"
            disabled={!stripe || processing}
            className="w-full bg-primary hover:bg-primary/90 text-white text-xl py-3 rounded-xl font-semibold shadow-md transition disabled:opacity-50 cursor-pointer"
          >
            {processing ? "Processing..." : `Pay $${amount}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
