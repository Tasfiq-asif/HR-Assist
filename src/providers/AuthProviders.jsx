import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import PropTypes from "prop-types";
import axios from "axios";

import toast from "react-hot-toast";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //handle user Login
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google Sign-In Result:", result);

      if (!result || !result.user) {
        throw new Error("Failed to retrieve user data from Google sign-in.");
      }

      const user = result.user;
      const { email, displayName } = user;

      if (!email || !displayName) {
        throw new Error("Google user data is incomplete.");
      }

      console.log("Google User:", { email, displayName });

      // Fetch JWT from backend
      const token = await getToken(email);
      console.log("JWT Token:", token);

      // Save user data in the backend
      const userData = { email, name: displayName, role: "Employee" };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user`,
        userData,
        { withCredentials: true }
      );
      console.log("User registration response:", response.data);

      setUser(user);
      toast.success("Google sign-in successful!");

      return result; // Return the result
    } catch (error) {
      toast.error(error.message || "Google sign-in failed");
      console.error("Google sign-in error:", error);
      throw error; // Re-throw the error to be caught in the component
    } finally {
      setLoading(false);
    }
  };




  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
        withCredentials: true,
      });
      return await signOut(auth);
      // Returning the promise so it can be awaited elsewhere
    } catch (error) {
      toast.error("Logout failed");
      throw error; // Re-throw the error if needed for further handling
    } finally {
      setLoading(false); // Ensure loading is set to false after the process
    }
  };

  const updateUserProfile = (name) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      // Update both displayName and phoneNumber in the profile
      return updateProfile(currentUser, {
        displayName: name,
      });
    }
  };

  const getToken = async (email) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        { email },
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      toast.error("Failed to fetch JWT");
      throw error;
    }
  };


  //onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await getToken(currentUser.email);
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    resetPassword,
    logOut,
    updateUserProfile,
    setLoading,
  };

  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

AuthProviders.propTypes = {
  // Array of children.
  children: PropTypes.array,
};

export default AuthProviders;
