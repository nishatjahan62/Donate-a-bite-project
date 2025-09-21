import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";

const RequestCharityRole = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();

  const [organizationName, setOrganizationName] = useState("");
  const [missionStatement, setMissionStatement] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    try {
      // Create payment intent using axios hook
      const { data: clientSecretData } = await axiosSecure.post("/create-payment-intent", {
        amount: 25,
      });

      const card = elements.getElement(CardElement);
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecretData.clientSecret,
        { payment_method: { card } }
      );

      if (error) {
        alert(error.message);
        return;
      }

      // Payment succeeded, submit charity role request
      if (paymentIntent.status === "succeeded") {
        await axiosSecure.post("/charity-request", {
          email: user.email,
          organizationName,
          missionStatement,
          transactionId: paymentIntent.id,
          amount: 25,
        });

        setSubmitted(true);
        alert("Charity role request submitted successfully!");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };

  if (submitted)
    return <p className="p-5">Your charity role request is pending approval.</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Request Charity Role</h2>
      <form onSubmit={handlePayment} className="space-y-4">
        <div>
          <label>Name</label>
          <input type="text" value={user.name} readOnly className="input input-bordered w-full" />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={user.email} readOnly className="input input-bordered w-full" />
        </div>
        <div>
          <label>Organization Name</label>
          <input
            type="text"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label>Mission Statement</label>
          <textarea
            value={missionStatement}
            onChange={(e) => setMissionStatement(e.target.value)}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>
        <div>
          <label>Card Details</label>
          <CardElement className="p-2 border rounded" />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Pay $25 & Submit
        </button>
      </form>
    </div>
  );
};

export default RequestCharityRole;
