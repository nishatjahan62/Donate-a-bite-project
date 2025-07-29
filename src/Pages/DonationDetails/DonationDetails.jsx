import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import UseAuth from "../../Hooks/UseAuth";
import toast from "react-hot-toast";
import axios from "axios";
import Button from "../Button/Button";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const DonationDetails = () => {
  const { user } = UseAuth();
  const userId = user?.uid;
  const axiosSecure = UseAxiosSecure();
  const [isFavorite, setIsFavorite] = useState(false);
  const [userData, setUserData] = useState({});
  const [requests, setRequests] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const {
    _id,
    title,
    description,
    foodType,
    quantity,
    image,
    status,
    pickupTime,
    restaurant = {},
  } = useLoaderData();

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`).then((res) => {
        setUserData(res.data);
      });
    }
  }, [user?.email, axiosSecure]);

  useEffect(() => {
    axiosSecure.get(`/requests/${_id}`).then((res) => setRequests(res.data));
  }, [_id, axiosSecure]);

  useEffect(() => {
    axiosSecure.get(`/reviews/${_id}`).then((res) => setReviews(res.data));
  }, [_id, axiosSecure]);

  // Handle   favorites
  const handleFavorite = async () => {
    if (!userId) {
      toast.error("Please log in to save this donation to favorites.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/favorites", {
        userId,
        donationId: _id,
      });

      if (response.status === 201) {
        setIsFavorite(true);
        toast.success("Saved to favorites!");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Already in favorites.");
        setIsFavorite(true);
      } else {
        console.error(error);
        toast.error("Failed to save favorite.");
      }
    }
  };

  const handleConfirmPickup = async (requestId) => {
    try {
      await axiosSecure.patch(`/requests/${requestId}`, {
        status: "Picked Up",
      });
      toast.success("Pickup confirmed!");

      const res = await axiosSecure.get(`/requests/${_id}`);
      setRequests(res.data);
    } catch (err) {
      toast.error("Failed to confirm pickup.");
      console.error(err);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const reviewData = {
      donationId: _id,
      reviewerName: userData.name,
      reviewerRole: userData.role,
      description: form.description.value,
      rating: Number(form.rating.value),
      createdAt: new Date(),
    };

    try {
      await axiosSecure.post("/reviews", reviewData);
      toast.success("Review submitted!");
      setShowReviewModal(false);
      form.reset();
      const res = await axiosSecure.get(`/reviews/${_id}`);
      setReviews(res.data);
    } catch (err) {
      toast.error("Failed to submit review.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 nunito">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row items-center justify-center">
        <div className="md:w-1/2">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover rounded-t-3xl md:rounded-tr-none md:rounded-l-3xl"
          />
        </div>

        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div className="space-y-4 text-gray-800 dark:text-gray-100">
            <h2 className="text-4xl font-bold text-primary poppins">{title}</h2>
            <p className="text-lg leading-relaxed">{description}</p>

            <div className="text-base space-y-1">
              <p>
                <span className="font-semibold">Food Type:</span> {foodType}
              </p>
              <p>
                <span className="font-semibold">Quantity:</span> {quantity}
              </p>
              <p>
                <span className="font-semibold">Restaurant:</span>{" "}
                {restaurant.name} - {restaurant.location}
              </p>
              <p>
                <span className="font-semibold">Pickup Time:</span> {pickupTime}
              </p>
            </div>

            <span
              className={`inline-block mt-4 px-4 py-1 rounded-full font-semibold text-sm tracking-wide ${
                status === "Available"
                  ? "bg-green-100 text-green-700"
                  : status === "Requested"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              Status: {status}
            </span>
          </div>

          <Button
            onClick={handleFavorite}
            className={`mt-4 px-4 py-2 rounded-lg text-white font-semibold ${
              isFavorite ? "bg-gray-500" : "bg-primary hover:bg-primary"
            }`}
            disabled={isFavorite}
            label={isFavorite ? "Added to Favorites" : "Add to Favorites"}
          />

          {/*   Request Donation */}
          {userData.role === "charity" && (
            <>
              <button
                onClick={() =>
                  document.getElementById("request_modal").showModal()
                }
                className="btn btn-primary mt-4"
              >
                Request Donation
              </button>
            </>
          )}

          {/* Confirm Pickup  */}
          {userData.role === "charity" && requests.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Your Requests:</h3>
              <ul>
                {requests.map((req) => (
                  <li
                    key={req._id}
                    className="border p-3 mb-2 rounded flex justify-between items-center"
                  >
                    <div>
                      <p>
                        <strong>Status:</strong> {req.status}
                      </p>
                      <p>
                        <strong>Pickup Time:</strong> {req.pickupTime}
                      </p>
                    </div>
                    {req.status === "Accepted" && (
                      <button
                        onClick={() => handleConfirmPickup(req._id)}
                        className="btn btn-success"
                      >
                        Confirm Pickup
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Review Section */}
          <div className="mt-10">
            <h3 className="text-2xl font-bold mb-4">Reviews</h3>
            {reviews.length === 0 && (
              <p className="italic text-gray-500">No reviews yet.</p>
            )}
            <ul className="space-y-4 max-h-60 overflow-y-auto">
              {reviews.map((review) => (
                <li
                  key={review._id}
                  className="border rounded p-4 bg-gray-50 dark:bg-gray-800"
                >
                  <p className="font-semibold">
                    {review.reviewerName} ({review.reviewerRole})
                  </p>
                  <p>{review.description}</p>
                  <p>
                    Rating:{" "}
                    <span className="font-bold text-yellow-500">
                      {"⭐".repeat(review.rating)}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
            <button
              className="btn btn-secondary mt-4"
              onClick={() => setShowReviewModal(true)}
            >
              Add Review
            </button>
          </div>
        </div>
      </div>

      {/* Request Donation Modal */}
      <dialog id="request_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Request This Donation</h3>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target;
              const requestData = {
                donationId: _id,
                donationTitle: title,
                restaurantName: restaurant.name,
                charityName: userData.name,
                charityEmail: userData.email,
                requestDescription: form.description.value,
                pickupTime: form.pickupTime.value,
              };

              try {
                await axiosSecure.post("/requests", requestData);
                toast.success("Request submitted!");
                form.reset();
                document.getElementById("request_modal").close();
                const res = await axiosSecure.get(`/requests/${_id}`);
                setRequests(res.data);
              } catch (err) {
                toast.error("Failed to submit request.");
                console.error(err);
              }
            }}
          >
            <div className="form-control mb-2">
              <input
                type="text"
                value={title}
                readOnly
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control mb-2">
              <input
                type="text"
                value={restaurant.name}
                readOnly
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control mb-2">
              <input
                type="text"
                value={userData.name}
                readOnly
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control mb-2">
              <input
                type="email"
                value={userData.email}
                readOnly
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control mb-2">
              <textarea
                name="description"
                placeholder="Why are you requesting this donation?"
                className="textarea textarea-bordered"
                required
              ></textarea>
            </div>
            <div className="form-control mb-4">
              <input
                type="datetime-local"
                name="pickupTime"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button
                type="button"
                onClick={() => document.getElementById("request_modal").close()}
                className="btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/*  Review Modal */}
      {showReviewModal && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Add Review</h3>
            <form onSubmit={handleReviewSubmit}>
              <div className="form-control mb-2">
                <input
                  type="text"
                  value={userData.name}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control mb-2">
                <textarea
                  name="description"
                  placeholder="Write your review here..."
                  className="textarea textarea-bordered"
                  required
                ></textarea>
              </div>
              <div className="form-control mb-4">
                <label className="block mb-1 font-semibold">
                  Rating (1 to 5):
                </label>
                <input
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowReviewModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default DonationDetails;
