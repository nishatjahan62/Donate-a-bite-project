import { useEffect, useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseUserRole from "../../../Hooks/UseUserRole";
import UserIcon from "../../../assets/userIcon.png";
import Loading from "../../Loading/Loading";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const { role, roleLoading } = UseUserRole();

  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    photoURL: "",
    address: "",
    contact: "",
    mission: "",
    restaurantName: "",
    charityName: "",
    lastLogin: "",
    createdAt: "",
  });

  // ✅ Prevents overwriting user input while editing
  useEffect(() => {
    if (user?.email && !isEditing) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => {
          const p = res.data || {};
          setProfile(p);
          setFormData({
            name: p.name ?? "",
            photoURL: p.photoURL ?? "",
            address: p.address ?? "",
            contact: p.contact ?? "",
            mission: p.mission ?? "",
            restaurantName: p.restaurantName ?? "",
            charityName: p.charityName ?? "",
            lastLogin: p.lastLogin ?? "",
            createdAt: p.createdAt ?? "",
          });
        })
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, [user, axiosSecure, isEditing]);

  if (roleLoading || !profile) return <Loading />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const originalEditable = {
    name: profile.name ?? "",
    photoURL: profile.photoURL ?? "",
    address: profile.address ?? "",
    contact: profile.contact ?? "",
    mission: profile.mission ?? "",
    restaurantName: profile.restaurantName ?? "",
    charityName: profile.charityName ?? "",
  };

  const currentEditable = {
    name: formData.name,
    photoURL: formData.photoURL,
    address: formData.address,
    contact: formData.contact,
    mission: formData.mission,
    restaurantName: formData.restaurantName,
    charityName: formData.charityName,
  };

  const hasChanges =
    JSON.stringify(currentEditable) !== JSON.stringify(originalEditable);

  const handleSave = async () => {
    if (!hasChanges) {
      Swal.fire("No changes", "You haven't modified anything.", "info");
      return;
    }

    setIsSaving(true);
    try {
      const res = await axiosSecure.put(`/users/${user.email}`, currentEditable);
      if (res.data?.modifiedCount > 0 || res.data?.success) {
        Swal.fire("Success!", "Profile updated.", "success");
        setProfile((prev) => ({ ...prev, ...currentEditable }));
        setIsEditing(false);
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Failed to save", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString() : "N/A";

  const displayName =
    profile.name ||
    profile.restaurantName ||
    profile.charityName ||
    user?.displayName ||
    "User";

  const Card = ({ title, children }) => (
    <div className="flex justify-center items-center p-6 mt-10 lg:mt-20">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border dark:border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );

  const ProfileImage = () => (
    <div className="flex justify-center mb-6">
      <img
        src={formData.photoURL || profile.photoURL || UserIcon}
        alt="Profile"
        className="w-32 h-32 rounded-full border-4 border-secondary object-cover shadow-md"
        onError={(e) => (e.target.src = UserIcon)}
      />
    </div>
  );

  const EditForm = () => (
    <div className="space-y-5">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 w-full border rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none"
          placeholder="Enter your name"
        />
      </div>

      {/* Photo URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Photo URL
        </label>
        <input
          type="url"
          name="photoURL"
          value={formData.photoURL}
          onChange={handleChange}
          className="mt-1 w-full border rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none"
          placeholder="https://example.com/photo.jpg"
        />
      </div>

      {/* Role-specific fields */}
      {role === "restaurant" && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Restaurant Name
            </label>
            <input
              type="text"
              name="restaurantName"
              value={formData.restaurantName}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </>
      )}

      {role === "charity" && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Charity Name
            </label>
            <input
              type="text"
              name="charityName"
              value={formData.charityName}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Mission
            </label>
            <textarea
              name="mission"
              value={formData.mission}
              onChange={handleChange}
              rows={4}
              className="mt-1 w-full border rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </>
      )}

      {/* Contact */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Contact
        </label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className="mt-1 w-full border rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none"
          placeholder="Phone / Email"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={() => {
            setIsEditing(false);
            setFormData({ ...formData, ...originalEditable });
          }}
          disabled={isSaving}
          className="px-6 py-2.5 rounded-lg bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving || !hasChanges}
          className={`px-6 py-2.5 rounded-lg text-white font-medium transition ${
            isSaving || !hasChanges
              ? "bg-gray-500"
              : "bg-primary hover:bg-secondary"
          }`}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );

  const ProfileView = () => (
    <div className="text-center space-y-4">
      <p className="text-2xl font-bold text-secondary">{displayName}</p>
      <p className="text-gray-600 dark:text-gray-300">{profile.email}</p>

      {role !== "user" && (
        <p className="text-lg">
          <strong className="text-primary">Role:</strong>{" "}
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </p>
      )}

      {role === "restaurant" && profile.address && (
        <p>
          <strong className="text-primary">Address:</strong> {profile.address}
        </p>
      )}

      {profile.contact && (
        <p>
          <strong className="text-primary">Contact:</strong> {profile.contact}
        </p>
      )}

      {role === "charity" && profile.mission && (
        <p className="italic text-gray-600 dark:text-gray-400">
          “{profile.mission}”
        </p>
      )}

      {profile.createdAt && (
        <p className="text-sm text-gray-500">
          Joined: {formatDate(profile.createdAt)}
        </p>
      )}

      <button
        onClick={() => setIsEditing(true)}
        className="mt-6 px-8 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition font-medium text-lg"
      >
        Edit Profile
      </button>
    </div>
  );

  return (
    <Card title={`${role.charAt(0).toUpperCase() + role.slice(1)} Profile`}>
      <ProfileImage />
      {/* ✅ Added key props to re-render properly */}
      {isEditing ? <EditForm key="edit" /> : <ProfileView key="view" />}
    </Card>
  );
};

export default MyProfile;
