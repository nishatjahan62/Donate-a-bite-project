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
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // Fetch profile from backend
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => {
          const p = res.data;
          setProfile(p);
          setFormData({
            name: p.name || "",
            photoURL: p.photoURL || "",
            address: p.address || "",
            contact: p.contact || "",
            mission: p.mission || "",
            restaurantName: p.restaurantName || "",
            charityName: p.charityName || "",
            lastLogin: p.lastLogin || "",
            createdAt: p.createdAt || "",
          });
        })
        .catch((err) => console.error(err));
    }
  }, [user, axiosSecure]);

  if (roleLoading || !profile) return <p>Loading...</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await axiosSecure.put(`/users/${user.email}`, formData);
      setProfile(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const Card = ({ title, children }) => (
    <div className="flex justify-center items-center p-6 mt-10 lg:mt-20">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center mb-4 text-primary">{title}</h2>
        {children}
      </div>
    </div>
  );

  // Helper for safe date formatting
  const formatDate = (date) => (date ? new Date(date).toLocaleDateString() : "N/A");

  // Shared image display
  const ProfileImage = ({ src, alt }) => (
    <div className="flex justify-center mb-4">
      <img
        src={src || UserIcon}
        alt={alt}
        className="w-28 h-28 rounded-full border-4 border-secondary"
      />
    </div>
  );

  // Edit form for inline editing
  const EditForm = () => (
    <div className="space-y-3">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />
      <input
        type="text"
        name="photoURL"
        placeholder="Photo URL"
        value={formData.photoURL}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />
      {role === "restaurant" && (
        <>
          <input
            type="text"
            name="restaurantName"
            placeholder="Restaurant Name"
            value={formData.restaurantName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </>
      )}
      {role === "charity" && (
        <>
          <input
            type="text"
            name="charityName"
            placeholder="Charity Name"
            value={formData.charityName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            name="mission"
            placeholder="Mission"
            value={formData.mission}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </>
      )}
      <input
        type="text"
        name="contact"
        placeholder="Contact"
        value={formData.contact}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />
      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={() => setIsEditing(false)}
          className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded bg-primary text-white"
        >
          Save
        </button>
      </div>
    </div>
  );

  // Profile display for non-edit mode
  const ProfileView = () => (
    <div className="space-y-2 text-center">
      {role === "user" && <p className="text-lg font-semibold text-secondary">{profile.name}</p>}
      {role === "admin" && <p className="text-lg font-semibold text-secondary">{profile.name}</p>}
      {role === "restaurant" && (
        <p className="text-lg font-semibold text-secondary">{profile.restaurantName}</p>
      )}
      {role === "charity" && (
        <p className="text-lg font-semibold text-secondary">{profile.charityName}</p>
      )}

      <p className="text-gray-600 dark:text-gray-300">{profile.email}</p>

      {/* Role info */}
      {role !== "user" && (
        <p className="text-gray-700 dark:text-gray-400">
          <strong className="text-primary">Role:</strong>{" "}
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </p>
      )}

      {/* Optional fields */}
      {role === "restaurant" && profile.address && (
        <p className="text-gray-700 dark:text-gray-400">
          <strong className="text-primary">Address:</strong> {profile.address}
        </p>
      )}
      {profile.contact && (
        <p className="text-gray-700 dark:text-gray-400">
          <strong className="text-primary">Contact:</strong> {profile.contact}
        </p>
      )}
      {role === "charity" && profile.mission && (
        <p className="text-gray-700 dark:text-gray-400 italic">“{profile.mission}”</p>
      )}
      {role === "admin" && profile.lastLogin && (
        <p className="text-gray-700 dark:text-gray-400">
          <strong className="text-primary">Last Login:</strong>{" "}
          {new Date(profile.lastLogin).toLocaleString()}
        </p>
      )}
      {role === "user" && profile.createdAt && (
        <p className="text-gray-700 dark:text-gray-400">
          <strong className="text-primary">Joined:</strong>{" "}
          {formatDate(profile.createdAt)}
        </p>
      )}

      <button
        onClick={() => setIsEditing(true)}
        className="mt-4 px-4 py-2 bg-primary text-white rounded"
      >
        Edit
      </button>
    </div>
  );

  return (
    <Card title={`${role.charAt(0).toUpperCase() + role.slice(1)} Profile`}>
      <ProfileImage
        src={formData.photoURL || profile.photoURL}
        alt={
          profile.name ||
          profile.restaurantName ||
          profile.charityName ||
          "Profile Image"
        }
      />
      {isEditing ? <EditForm /> : <ProfileView />}
    </Card>
  );
};

export default MyProfile;
