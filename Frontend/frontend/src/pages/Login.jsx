import { useState } from "react";

import {
  auth,
} from "../services/firebase";

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import {
  useNavigate,
} from "react-router-dom";

export default function Login() {

  const [phone, setPhone] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const navigate =
    useNavigate();

  const setupRecaptcha =
    () => {

      if (
        !window.recaptchaVerifier
      ) {

        window.recaptchaVerifier =
          new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {
              size: "invisible",
            }
          );
      }
    };

  const sendOTP =
    async () => {

      try {

        setupRecaptcha();

        const appVerifier =
          window.recaptchaVerifier;

        const formattedPhone =
          `+91${phone}`;

        const confirmation =
          await signInWithPhoneNumber(
            auth,
            formattedPhone,
            appVerifier
          );

        window.confirmationResult =
          confirmation;

        alert("OTP Sent");

      } catch (error) {

        console.log(error);

        alert(error.message);
      }
    };

  const verifyOTP =
    async () => {

      try {

        await window.confirmationResult.confirm(
          otp
        );

        alert(
          "Login Successful"
        );

        navigate("/");

      } catch (error) {

        console.log(error);

        alert(
          "Invalid OTP"
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

          <input
            type="text"
            placeholder="Enter 10 digit phone number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="w-full border border-slate-300 p-4 rounded-2xl bg-white text-black"
          />

          <button
            onClick={sendOTP}
            className="w-full bg-blue-700 text-white py-4 rounded-2xl text-lg hover:bg-blue-800 transition-all"
          >
            Send OTP
          </button>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value)
            }
            className="w-full border border-slate-300 p-4 rounded-2xl bg-white text-black"
          />

          <button
            onClick={verifyOTP}
            className="w-full bg-gradient-to-r from-blue-700 to-purple-700 text-white py-4 rounded-2xl text-lg hover:opacity-90 transition-all"
          >
            Verify OTP
          </button>

        </div>

        <div id="recaptcha-container"></div>

      </div>

    </div>
  );
}