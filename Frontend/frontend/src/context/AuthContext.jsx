import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../services/firebase";

export const AuthContext =
  createContext();

export default function AuthProvider({
  children,
}) {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [darkMode, setDarkMode] =
    useState(false);

  useEffect(() => {

    const savedTheme =
      localStorage.getItem(
        "darkMode"
      );

    if (savedTheme === "true") {
      setDarkMode(true);
      document.body.classList.add(
        "dark"
      );
    }

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {

          setUser(currentUser);

          setLoading(false);

        }
      );

    return () => unsubscribe();

  }, []);

  const toggleDarkMode = () => {

    const newMode = !darkMode;

    setDarkMode(newMode);

    localStorage.setItem(
      "darkMode",
      newMode
    );

    if (newMode) {

      document.body.classList.add(
        "dark"
      );

    } else {

      document.body.classList.remove(
        "dark"
      );

    }
  };

  return (

    <AuthContext.Provider
      value={{
        user,
        darkMode,
        toggleDarkMode,
      }}
    >

      {!loading && children}

    </AuthContext.Provider>
  );
}