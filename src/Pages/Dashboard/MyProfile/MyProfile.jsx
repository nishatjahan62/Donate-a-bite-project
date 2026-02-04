import { useEffect, useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseUserRole from "../../../Hooks/UseUserRole";
import UserIcon from "../../../assets/userIcon.png";
import Loading from "../../Loading/Loading";
import Swal from "sweetalert2";

/* Reusable Components for edit part  */
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

const ProfileImage = ({ photoURL }) => (
  <div className="flex justify-center mb-6">
    <img
      src={photoURL || UserIcon}
      alt="Profile"
      className="w-32 h-32 rounded-full border-4 border-secondary object-cover shadow-md"
      onError={(e) => (e.target.src = UserIcon)}
    />
  </div>
);

const ProfileView = ({
  profile,
  role,
  displayName,
  formatDate,
  onEdit,
}) => (
  <div className="text-center space-y-4">
    <p className="text-2xl font-bold text-secondary">{displayName}</p>
    <p className="text-gray-600 dark:text-gray-300">{profile.email}</p>

    {role !== "user" && (
      <p className="text-lg">
        <strong className="text-primary">Role:</strong>{" "}
        <span className="dark:text-white">
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </span>
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
      onClick={onEdit}
      className="mt-6 px-8 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition font-medium text-lg"
    >
      Edit Profile
    </button>
  </div>
);

// Edit From 
const EditForm = ({
  formData,
  role,
  onChange,
  onSave,
  onCancel,
  isSaving,
  hasChanges,
}) => (
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
        onChange={onChange}
        className="mt-1 w-full border rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Photo URL
      </label>
      <input
        type="url"
        name="photoURL"
        value={formData.photoURL}
        onChange={onChange}
        className="mt-1 w-full border rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none"
      />
    </div>
    {role === "restaurant" && (
      <>
        <input
          type="text"
          name="restaurantName"
          value={formData.restaurantName}
          onChange={onChange}
          placeholder="Restaurant Name"
          className="w-full border rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={onChange}
          placeholder="Address"
          className="w-full border rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white"
        />
      </>
    )}

    {role === "charity" && (
      <>
        <input
          type="text"
          name="charityName"
          value={formData.charityName}
          onChange={onChange}
          placeholder="Charity Name"
          className="w-full border rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white"
        />
        <textarea
          name="mission"
          rows={4}
          value={formData.mission}
          onChange={onChange}
          placeholder="Mission"
          className="w-full border rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white"
        />
      </>
    )}

    <input
      type="text"
      name="contact"
      value={formData.contact}
      onChange={onChange}
      placeholder="Contact"
      className="w-full border rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white"
    />
    {/* Action button for edit  */}
    <div className="flex justify-end gap-4 pt-6">
      <button
        onClick={onCancel}
        disabled={isSaving}
        className="px-6 py-2 rounded-lg bg-gray-300 dark:bg-gray-700"
      >
        Cancel
      </button>
      <button
        onClick={onSave}
        disabled={!hasChanges || isSaving}
        className="px-6 py-2 rounded-lg bg-primary text-white disabled:bg-gray-500"
      >
        {isSaving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  </div>
);

/*  Main Component of profile */

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
  });

  useEffect(() => {
    if (user?.email && !isEditing) {
      axiosSecure.get(`/users/${user.email}`).then((res) => {
        setProfile(res.data);
        setFormData(res.data);
      });
    }
  }, [user, axiosSecure, isEditing]);

  if (roleLoading || !profile) return <Loading />;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  //  Compare only editable fields
  const editableFields = [
    "name",
    "photoURL",
    "address",
    "contact",
    "mission",
    "restaurantName",
    "charityName",
  ];
  const hasChanges = editableFields.some(
    (field) => formData[field] !== profile[field]
  );

  // ✅ Always reset isSaving in finally
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await axiosSecure.put(`/users/${user.email}`, formData);
      Swal.fire("Success", "Profile updated", "success");
      setProfile(prev => ({ ...prev, ...formData }));
      setIsEditing(false);
    } catch (err) {
      Swal.fire(
  "Error",
  err.response?.data?.message || "Failed to update profile",
  "error"
);;
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString();

  const displayName =
    profile.name ||
    profile.restaurantName ||
    profile.charityName ||
    user?.displayName ||
    "User";

  return (
    <Card title={`${role.toUpperCase()} Profile`}>
      <ProfileImage photoURL={formData.photoURL} />

      {isEditing ? (
        <EditForm
          formData={formData}
          role={role}
          onChange={handleChange}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
          isSaving={isSaving}
          hasChanges={hasChanges}
        />
      ) : (
        <ProfileView
          profile={profile}
          role={role}
          displayName={displayName}
          formatDate={formatDate}
          onEdit={() => setIsEditing(true)}
        />
      )}
    </Card>
  );
};


export default MyProfile;
