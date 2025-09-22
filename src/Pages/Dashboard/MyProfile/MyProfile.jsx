import { useEffect, useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UserIcon from "../../../assets/userIcon.png";

const MyProfile = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => setProfile(res.data))
        .catch((err) => console.error(err));
    }
  }, [user, axiosSecure]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="flex justify-center items-center p-6 mt-10 lg:mt-20">
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 border"
        style={{ borderColor: "var(--color-secondary)" }}
      >
        {/* Heading */}
        <h2
          className="text-2xl font-bold text-center mb-4"
          style={{ color: "var(--color-primary)" }}
        >
          My Profile
        </h2>

        {/* Image */}
        <div className="flex justify-center mb-4">
          <img
            src={profile.photoURL || UserIcon}
            alt={profile.name}
            className="w-28 h-28 rounded-full border-4"
            style={{ borderColor: "var(--color-secondary)" }}
          />
        </div>

        {/* Details */}
        <div className="space-y-2 text-center">
          <p
            className="text-lg font-semibold"
            style={{ color: "var(--color-secondary)" }}
          >
            {profile.name}
          </p>
          <p className="text-gray-600">{profile.email}</p>
          {profile.role && (
            <p className="text-gray-700">
              <strong style={{ color: "var(--color-primary)" }}>Role:</strong>{" "}
              {profile.role}
            </p>
          )}
          <p className="text-gray-700">
            <strong style={{ color: "var(--color-primary)" }}>Joined:</strong>{" "}
            {new Date(profile.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
