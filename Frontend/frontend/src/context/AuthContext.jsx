import {

  createContext,

  useEffect,

  useState,

} from "react";

import {

  signOut,

  onAuthStateChanged,

} from "firebase/auth";

import { auth }

from "../services/firebase";

export const AuthContext =

  createContext();

export default function AuthProvider({

  children,

}) {

  const [user, setUser] =

    useState(null);

  const [loading, setLoading] =

    useState(true);

  // const [darkMode, setDarkMode] =

  //   useState(false);

  /* FIREBASE AUTH STATE */

  useEffect(() => {

    const unsubscribe =

      onAuthStateChanged(

        auth,

        (currentUser) => {

          if (currentUser) {

            const formattedUser = {

              name:
                currentUser.displayName,

              email:
                currentUser.email,

              photo:
                currentUser.photoURL,

              uid:
                currentUser.uid,

            };

            setUser(
              formattedUser
            );

            localStorage.setItem(

              "campusUser",

              JSON.stringify(
                formattedUser
              )

            );

          } else {

            setUser(null);

            localStorage.removeItem(
              "campusUser"
            );

          }

          setLoading(false);

        }

      );

    return () =>
      unsubscribe();

  }, []);

  /* DARK MODE */

  useEffect(() => {

    const savedDarkMode =

      JSON.parse(

        localStorage.getItem(
          "darkMode"
        )

      );

    if (savedDarkMode) {

      setDarkMode(true);

      document.body.classList.add(
        "dark"
      );

    }

  }, []);

  const toggleDarkMode = () => {

    const newMode =
      !darkMode;

    setDarkMode(newMode);

    localStorage.setItem(

      "darkMode",

      JSON.stringify(newMode)

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

  /* LOGOUT */

  const logout = async () => {

    try {

      await signOut(auth);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <AuthContext.Provider

      value={{

        user,

        setUser,

        darkMode,

        toggleDarkMode,

        logout,

      }}

    >

      {

        !loading && children

      }

    </AuthContext.Provider>

  );

}