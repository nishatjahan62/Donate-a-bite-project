import { useEffect, useState } from "react";

import { Link } from "react-router";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const Favorites = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axiosSecure.get(`/favorites/${user.uid}`).then(res => setFavorites(res.data));
  }, [axiosSecure, user.uid]);

  const handleRemove = async (id) => {
    try {
      await axiosSecure.delete(`/favorites/${id}`);
      setFavorites(favorites.filter(item => item._id !== id));
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Favorite Donations</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map(fav => (
          <div key={fav._id} className="card bg-base-100 shadow-xl">
            <figure><img src={fav.image} alt="Donation" className="h-48 w-full object-cover" /></figure>
            <div className="card-body">
              <h3 className="card-title">{fav.title}</h3>
              <p><strong>Restaurant:</strong> {fav.restaurantName}, {fav.location}</p>
              <p><strong>Status:</strong> {fav.status}</p>
              <p><strong>Quantity:</strong> {fav.quantity}</p>
              <div className="card-actions justify-between mt-2">
                <Link to={`/donations/${fav.donationId}`} className="btn btn-primary btn-sm">Details</Link>
                <button onClick={() => handleRemove(fav._id)} className="btn btn-error btn-sm">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
