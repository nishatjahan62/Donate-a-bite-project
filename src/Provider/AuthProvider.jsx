import { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../Firebase/FirebaseInit";
import AuthContext from "./AuthContext";

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   Sign Im
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   Sign Out
  const logOut = () => {
    return signOut(auth);
  };

  //   Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser?.email) {
        // Call your backend to get JWT using only the email
        fetch("http://localhost:5000/jwt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: currentUser.email }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.token) {
              localStorage.setItem("access-token", data.token);
            }
          })
          .catch((err) => {
            console.error("JWT fetch failed:", err);
          });
      } else {
        localStorage.removeItem("access-token");
      }
    });

    return () => unsubscribe();
  }, []);

  //   Update User
  const updateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  //   Google SignIn
  const googleProvider = new GoogleAuthProvider();
  const SignInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const authData = {
    createUser,
    signIn,
    logOut,
    user,
    setUser,
    loading,
    setLoading,
    updateUser,
    SignInWithGoogle,
  };
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
