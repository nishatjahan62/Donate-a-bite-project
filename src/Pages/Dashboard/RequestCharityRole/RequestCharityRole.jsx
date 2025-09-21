import { useNavigate } from "react-router";
import { useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import Button from "../../Shared/Button/Button";

const RequestCharityRole = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();

  const [organizationName, setOrganizationName] = useState("");
  const [missionStatement, setMissionStatement] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Navigate to payment page with all form data
    navigate("/dashboard/payment-form", {
      state: {
        name: user?.displayName || "Anonymous",
        email: user?.email,
        organizationName,
        missionStatement,
        amount: 25, // fixed payment
        purpose: "Charity Role Request",
      },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
      >
        <h2 className="text-3xl font-extrabold text-center mb-8 text-primary">
          Charity Role Request
        </h2>

        {/* User Name */}
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2">Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>

        {/* User Email */}
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>

        {/* Organization Name */}
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2">
            Organization Name
          </label>
          <input
            type="text"
            required
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter your organization name"
          />
        </div>

        {/* Mission Statement */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Mission Statement
          </label>
          <textarea
            required
            value={missionStatement}
            onChange={(e) => setMissionStatement(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Describe your mission..."
            rows="5"
          />
        </div>

        {/* Payment Amount */}
        <div className="mb-6 text-center">
          <p className="font-semibold text-lg">
            Payment Amount:{" "}
            <span className="text-[--color-primary] font-bold text-xl">
              $25
            </span>
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button type="submit" label="Pay" />
        </div>
      </form>
    </div>
  );
};

export default RequestCharityRole;
