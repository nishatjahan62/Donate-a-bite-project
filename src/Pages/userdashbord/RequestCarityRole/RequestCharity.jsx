import { useEffect, useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import toast from "react-hot-toast";


const RequestCharityRole = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [existingRequest, setExistingRequest] = useState(null);

  const amount = 25; // $25 fixed fee

  useEffect(() => {
    axiosSecure.get(`/charity-role-request/${user.email}`).then(res => setExistingRequest(res.data));
  }, [user.email,axiosSecure]);

  useEffect(() => {
    axiosSecure.post('/create-payment-intent', { amount }).then(res => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const orgName = form.organization.value;
    const mission = form.mission.value;

    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmError) {
      alert(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const requestData = {
        email: user.email,
        organization: orgName,
        mission: mission,
        transactionId: paymentIntent.id,
        amount,
        date: new Date(),
        status: "Pending",
      };

      // Save to DB
      await axiosSecure.post("/charity-role-request", requestData);
      toast.success("Charity Role Requested Successfully!");
      form.reset();
    }
  };

  if (existingRequest?.status) {
    return <p>You already requested charity role. Status: {existingRequest.status}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <h2 className="text-2xl font-bold mb-2">Request Charity Role</h2>
      <input value={user.displayName} readOnly className="input input-bordered w-full" />
      <input value={user.email} readOnly className="input input-bordered w-full" />
      <input name="organization" placeholder="Organization Name" className="input input-bordered w-full" required />
      <textarea name="mission" placeholder="Mission Statement" className="textarea textarea-bordered w-full" required />
      <CardElement className="p-2 border rounded" />
      <button type="submit" className="btn btn-primary mt-4" disabled={!stripe || !clientSecret}>
        Pay & Submit Request
      </button>
    </form>
  );
};


export default RequestCharityRole;
