import { useEffect, useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseUserRole from "../../../Hooks/UseUserRole";
import UserIcon from "../../../assets/userIcon.png";

const MyProfile = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const { role, roleLoading } = UseUserRole();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => setProfile(res.data))
        .catch((err) => console.error(err));
    }
  }, [user, axiosSecure]);

  if (roleLoading || !profile) return <p>Loading...</p>;

  // Shared wrapper card
  const Card = ({ title, children }) => (
    <div className="flex justify-center items-center p-6 mt-10 lg:mt-20">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center mb-4 text-primary">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );

  // 🟢 USER (general)
  if (role === "user") {
    return (
      <Card title="My Profile">
        <div className="flex justify-center mb-4">
          <img
            src={profile.photoURL || UserIcon}
            alt={profile.name}
            className="w-28 h-28 rounded-full border-4 border-secondary"
          />
        </div>
        <div className="space-y-2 text-center">
          <p className="text-lg font-semibold text-secondary">{profile.name}</p>
          <p className="text-gray-600 dark:text-gray-300">{profile.email}</p>
          <p className="text-gray-700 dark:text-gray-400">
            <strong className="text-primary">Joined:</strong>{" "}
            {new Date(profile.createdAt).toLocaleDateString()}
          </p>
        </div>
      </Card>
    );
  }

  // 🟠 RESTAURANT
  if (role === "restaurant") {
    return (
      <Card title="Restaurant Profile">
        <div className="flex justify-center mb-4">
          <img
            src={profile.logo || profile.photoURL || UserIcon}
            alt={profile.restaurantName || profile.name}
            className="w-28 h-28 rounded-full border-4 border-secondary"
          />
        </div>
        <div className="space-y-2 text-center">
          <p className="text-lg font-semibold text-secondary">
            {profile.restaurantName || profile.name}
          </p>
          <p className="text-gray-600 dark:text-gray-300">{profile.email}</p>
          <p className="text-gray-700 dark:text-gray-400">
            <strong className="text-primary">Role:</strong> Restaurant
          </p>
          {profile.address && (
            <p className="text-gray-700 dark:text-gray-400">
              <strong className="text-primary">Address:</strong> {profile.address}
            </p>
          )}
          {profile.contact && (
            <p className="text-gray-700 dark:text-gray-400">
              <strong className="text-primary">Contact:</strong> {profile.contact}
            </p>
          )}
        </div>
      </Card>
    );
  }

  // 🟣 CHARITY
  if (role === "charity") {
    return (
      <Card title="Charity Profile">
        <div className="flex justify-center mb-4">
          <img
            src={profile.logo || profile.photoURL || UserIcon}
            alt={profile.charityName || profile.name}
            className="w-28 h-28 rounded-full border-4 border-secondary"
          />
        </div>
        <div className="space-y-2 text-center">
          <p className="text-lg font-semibold text-secondary">
            {profile.charityName || profile.name}
          </p>
          <p className="text-gray-600 dark:text-gray-300">{profile.email}</p>
          <p className="text-gray-700 dark:text-gray-400">
            <strong className="text-primary">Role:</strong> Charity
          </p>
          {profile.mission && (
            <p className="text-gray-700 dark:text-gray-400 italic">
              “{profile.mission}”
            </p>
          )}
          {profile.contact && (
            <p className="text-gray-700 dark:text-gray-400">
              <strong className="text-primary">Contact:</strong> {profile.contact}
            </p>
          )}
        </div>
      </Card>
    );
  }

  // 🔴 ADMIN
  if (role === "admin") {
    return (
      <Card title="Admin Profile">
        <div className="flex justify-center mb-4">
          <img
            src={profile.photoURL || UserIcon}
            alt={profile.name}
            className="w-28 h-28 rounded-full border-4 border-secondary"
          />
        </div>
        <div className="space-y-2 text-center">
          <p className="text-lg font-semibold text-secondary">{profile.name}</p>
          <p className="text-gray-600 dark:text-gray-300">{profile.email}</p>
          <p className="text-gray-700 dark:text-gray-400">
            <strong className="text-primary">Role:</strong> Admin
          </p>
          {profile.lastLogin && (
            <p className="text-gray-700 dark:text-gray-400">
              <strong className="text-primary">Last Login:</strong>{" "}
              {new Date(profile.lastLogin).toLocaleString()}
            </p>
          )}
        </div>
      </Card>
    );
  }

  return null; // fallback
};

export default MyProfile;
