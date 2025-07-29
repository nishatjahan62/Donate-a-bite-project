import { useEffect, useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const RequestCharityRole = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [existingRequest, setExistingRequest] = useState(null);

  useEffect(() => {
    axiosSecure.get(`/charity-role-request/${user.email}`).then((res) => {
      setExistingRequest(res.data);
    });
  }, [user.email, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      email: user.email,
      organization: form.organization.value,
      mission: form.mission.value,
      transactionId: "manual-testing",
      amount: 0,
      date: new Date(),
      status: "Pending",
    };
    try {
      await axiosSecure.post("/charity-role-request", data);
      alert("Charity role requested!");
      form.reset();
    } catch (error) {
      console.error(error);
      alert("Request failed.");
    }
  };

  if (existingRequest?.status) {
    return (
      <p>
        You already requested charity role. Status: {existingRequest.status}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <h2 className="text-2xl font-bold mb-2">Request Charity Role</h2>
      <input
        type="text"
        value={user.displayName}
        readOnly
        className="input input-bordered w-full"
      />
      <input
        type="email"
        value={user.email}
        readOnly
        className="input input-bordered w-full"
      />
      <input
        name="organization"
        placeholder="Organization Name"
        className="input input-bordered w-full"
        required
      />
      <textarea
        name="mission"
        placeholder="Mission Statement"
        className="textarea textarea-bordered w-full"
        required
      />
      <button type="submit" className="btn btn-primary">
        Submit Request
      </button>
    </form>
  );
};

export default RequestCharityRole;
