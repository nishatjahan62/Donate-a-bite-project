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

  // Sign In
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign Out
  const logOut = () => {
    localStorage.removeItem("access-token"); // remove JWT on logout
    return signOut(auth);
  };

  // Update User
  const updateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  // Google SignIn
  const googleProvider = new GoogleAuthProvider();
  const SignInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // 🔹 Observer: fetch fresh JWT whenever user changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser?.email) {
        try {
          const res = await fetch(
            "https://assignment-12-server-one-eosin.vercel.app/jwt",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: currentUser.email }),
            }
          );

          const data = await res.json();

          if (data.token) {
            localStorage.setItem("access-token", data.token);
            console.log(" New JWT generated and stored!");
          } else {
            localStorage.removeItem("access-token");
            console.warn(" No token returned from backend.");
          }
        } catch (err) {
          localStorage.removeItem("access-token");
          console.error("JWT fetch failed:", err);
        }
      } else {
        localStorage.removeItem("access-token");
      }
    });

    return () => unsubscribe();
  }, []);

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
