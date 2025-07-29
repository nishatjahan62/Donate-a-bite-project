import { useEffect, useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";


const Profile = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axiosSecure
      .get(`/users/${user.email}`)
      .then((res) => setUserData(res.data));
  }, [user, axiosSecure]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <img
        src={userData.image}
        alt="Profile"
        className="w-24 h-24 rounded-full mb-4"
      />
      <p>
        <strong>Name:</strong> {userData.name}
      </p>
      <p>
        <strong>Email:</strong> {userData.email}
      </p>
      {userData.role && userData.role !== "user" && (
        <p>
          <strong>Role:</strong> {userData.role}
        </p>
      )}
    </div>
  );
};

export default Profile;
