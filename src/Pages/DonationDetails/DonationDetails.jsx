import React, { useState } from "react";
import { useLoaderData } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../Shared/Button/Button";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { FaRegCommentDots } from "react-icons/fa6";
import Swal from "sweetalert2";
import UseAuth from "../../Hooks/UseAuth";

const DonationDetails = () => {
  const donation = useLoaderData();
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = UseAuth();

  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Reviews query
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", donation._id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${donation._id}`);
      return res.data;
    },
  });

  // Save to favorites
  const saveToFavorites = useMutation({
    mutationFn: async () => {
      return axiosSecure.post("/favorites", {
        donationId: donation._id,
        userEmail: user.email,
      });
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Saved!",
        text: "Donation has been added to your favorites.",
        confirmButtonColor: "var(--color-primary)",
      });
    },
  });

  // Request donation
  const requestDonation = useMutation({
    mutationFn: async (formData) => axiosSecure.post("/requests", formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["requests"]);
      Swal.fire({
        icon: "success",
        title: "Request Submitted!",
        text: "Your donation request has been sent successfully.",
        confirmButtonColor: "var(--color-secondary)",
      });
      setShowRequestModal(false);
    },
  });

  // Add review
  const addReview = useMutation({
    mutationFn: async (formData) => axiosSecure.post("/reviews", formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", donation._id]);
      Swal.fire({
        icon: "success",
        title: "Thank you!",
        text: "Your review has been submitted.",
        confirmButtonColor: "var(--color-primary)",
      });
      setShowReviewModal(false);
    },
  });

  // confirm pick up
  const { data: request } = useQuery({
    queryKey: ["request", donation._id, user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/requests/by-donation/${donation._id}?email=${user.email}`
      );
      return res.data[0]; // assuming one request per user per donation
    },
  });

  const confirmPickup = useMutation({
    mutationFn: async (requestId) => {
      return axiosSecure.patch(`/requests/${requestId}`, {
        status: "Picked Up",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["request", donation._id, user.email]);
      Swal.fire({
        icon: "success",
        title: "Confirmed!",
        text: "Donation has been marked as Picked Up.",
        confirmButtonColor: "var(--color-primary)",
      });
    },
  });

  return (
    <div
      className="max-w-5xl py-5 lg:py-10 mx-auto p-6 border border-secondary rounded-2xl shadow-2xl mt-10 sm:mt-20
                    bg-white dark:bg-black text-black dark:text-gray-200"
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left - Image */}
        <div className="flex-1">
          <img
            src={donation.image}
            alt={donation.title}
            className="w-full h-80 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Right - Details */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-primary)]">
            {donation.title}
          </h2>
          <p className="mt-2 dark:text-gray-300">{donation.description}</p>
          <hr className="mt-2 border-dashed border-secondary dark:border-gray-600" />
          <p className="mt-2 font-semibold">Food Type: {donation.foodType}</p>
          <p className="mt-1 font-semibold">Quantity: {donation.quantity}</p>
          <p className="mt-1 font-semibold">
            Pickup Time: {new Date(donation.pickupTime).toLocaleString()}
          </p>
          <p className="mt-1 font-semibold">Status: {donation.status}</p>
          <hr className="mt-2 border-dashed border-secondary dark:border-gray-600" />
          <div className="mt-2">
            <h3 className="text-lg lg:text-xl font-bold text-[var(--color-primary)]">
              Restaurant Info
            </h3>
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {donation.restaurant?.name}
            </p>
            <p>
              <span className="font-semibold">Location:</span>{" "}
              {donation.restaurant?.location}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-2">
            <Button
              size="sm"
              label=" Save to Favorites"
              onClick={() => saveToFavorites.mutate()}
            />
            <Button
              size="md"
              label=" Request Donation"
              onClick={() => setShowRequestModal(true)}
            />
            <Button
              size="md"
              label="Add Review"
              onClick={() => setShowReviewModal(true)}
            />
            {request?.status === "Accepted" && (
              <Button
                label="Confirm Pickup"
                color="secondary"
                onClick={() => confirmPickup.mutate(request._id)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10">
        <h3 className="text-2xl text-[var(--color-primary)] font-bold mb-4 flex items-center gap-2">
          <FaRegCommentDots className="text-[var(--color-secondary)]" />
          Reviews
        </h3>

        {reviews.length === 0 ? (
          <p className="dark:text-gray-400">No reviews yet.</p>
        ) : (
          reviews.map((r, idx) => (
            <div
              key={idx}
              className="border-b py-2 border-gray-300 dark:border-gray-700"
            >
              <p className="font-semibold">{r.reviewerName}</p>
              <p>{r.description}</p>
              <p>Rating: ⭐{r.rating}</p>
            </div>
          ))
        )}
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center ">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-2xl border-3 border-secondary  w-96 text-black dark:text-gray-200">
            <h2 className="text-3xl text-primary font-bold mb-4">
              Request Donation
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                requestDonation.mutate({
                  donationId: donation._id,
                  donationTitle: donation.title,
                  restaurantName: donation.restaurant?.name,
                  charityName: user.displayName,
                  charityEmail: user.email,
                  description: form.description.value,
                  pickupTime: form.pickupTime.value,
                  status: "Pending",
                });
              }}
            >
              <input
                type="text"
                value={donation.title}
                readOnly
                className="border p-2 mb-2 w-full rounded bg-gray-100 dark:bg-gray-800"
              />
              <input
                type="text"
                value={donation.restaurant?.name}
                readOnly
                className="border p-2 mb-2 w-full rounded bg-gray-100 dark:bg-gray-800"
              />
              <input
                type="text"
                value={user.displayName}
                readOnly
                className="border p-2 mb-2 w-full rounded bg-gray-100 dark:bg-gray-800"
              />
              <input
                type="email"
                value={user.email}
                readOnly
                className="border p-2 mb-2 w-full rounded bg-gray-100 dark:bg-gray-800"
              />
              <textarea
                name="description"
                placeholder="Request description"
                className="border p-2 mb-2 w-full rounded bg-gray-100 dark:bg-gray-800"
                required
              />
              <input
                type="datetime-local"
                name="pickupTime"
                className="border p-2 mb-2 w-full rounded bg-gray-100 dark:bg-gray-800"
                required
              />
              <div className="flex gap-2">
                <Button label="Submit" type="submit" />
                <Button
                  label="Cancel"
                  onClick={() => setShowRequestModal(false)}
                  color="secondary"
                />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-96 text-black  shadow-2xl border-3 border-secondary  dark:text-gray-200">
            <h2 className="text-3xl text-primary font-bold mb-4">Add Review</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                addReview.mutate({
                  donationId: donation._id,
                  reviewerName: user.displayName,
                  description: form.description.value,
                  rating: form.rating.value,
                });
              }}
            >
              <textarea
                name="description"
                placeholder="Review description"
                className="border p-2 mb-2 w-full rounded bg-gray-100 dark:bg-gray-800"
                required
              />
              <input
                type="number"
                name="rating"
                placeholder="Rate 1-5"
                min="1"
                max="5"
                className="border p-2 mb-2 w-full rounded bg-gray-100 dark:bg-gray-800"
                required
              />
              <div className="flex gap-2">
                <Button label="Submit" type="submit" />
                <Button
                  label="Cancel"
                  onClick={() => setShowReviewModal(false)}
                  color="secondary"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationDetails;
