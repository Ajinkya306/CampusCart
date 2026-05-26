import {
  signInWithPopup,
} from "firebase/auth";

import {
  auth,
  googleProvider,
} from "../services/firebase";

import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import axios from "axios";

export default function Login() {

  const navigate =
    useNavigate();

  // GOOGLE LOGIN

  const handleGoogleLogin =
    async () => {

      try {

        const result =

          await signInWithPopup(
            
            auth,
            googleProvider
          );
        
        console.log(result.user);
        
        const user =
          result.user;

        const response =

          await axios.post(

            "https://campuscart-5wbx.onrender.com/api/auth/token",

            {

              email:
                user.email,

            }

          );

        localStorage.setItem(

          "campusToken",

          response.data.token

        );

        localStorage.setItem(

          "campusUser",

          JSON.stringify({

            name:
              user.displayName,

            email:
              user.email,

            photo:
              user.photoURL,

            uid:
              user.uid,

          })

        );

        toast.success(
          "Login Successful"
        );

        navigate("/");

      } catch (error) {

        console.log(error);

        toast.error(
          "Google Login Failed"
        );

      }

    };

  return (

    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-purple-700 flex items-center justify-center p-6">

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-xl">

        <h1 className="text-5xl font-bold text-blue-900 text-center mb-10">
          CampusCart
        </h1>

        <div className="space-y-6">

          <button

            onClick={
              handleGoogleLogin
            }

            className="
            w-full
            bg-white
            border
            border-gray-300
            py-4
            rounded-2xl
            flex
            items-center
            justify-center
            gap-4
            text-lg
            font-semibold
            hover:bg-gray-100
            transition-all
            "

          >

            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="Google"
              className="w-6 h-6"
            />

            Continue with Google

          </button>

        </div>

      </div>

    </div>

  );

}