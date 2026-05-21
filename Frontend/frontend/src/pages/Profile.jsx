import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import { Navigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import { Link } from "react-router-dom";

export default function Profile() {

  const { user } =
    useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (

    <div className="bg-slate-100 min-h-screen">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="bg-white rounded-3xl shadow-2xl p-10">

          <div className="flex items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-700 to-purple-700 flex items-center justify-center text-white text-4xl font-bold">

              {
                user.phoneNumber
                ?.slice(-2)
              }

            </div>

            <div>

              <h1 className="text-4xl font-bold text-gray-800">
                Student Account
              </h1>

              <p className="text-gray-500 mt-2">
                {user.phoneNumber}
              </p>

            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">

            <Link to="/my-listings">

              <div className="bg-slate-100 rounded-3xl p-8 shadow hover:scale-105 transition-all cursor-pointer">

                <h2 className="text-2xl font-bold text-blue-700">
                  My Listings
                </h2>

                <p className="text-gray-500 mt-3">
                  Manage products you uploaded.
                </p>

              </div>

            </Link>

            <Link to="/wishlist">

              <div className="bg-slate-100 rounded-3xl p-8 shadow hover:scale-105 transition-all cursor-pointer">

                <h2 className="text-2xl font-bold text-purple-700">
                  Wishlist
                </h2>

                <p className="text-gray-500 mt-3">
                  Saved products appear here.
                </p>

              </div>

            </Link>

            <div className="bg-slate-100 rounded-3xl p-8 shadow">

              <h2 className="text-2xl font-bold text-indigo-700">
                Purchases
              </h2>

              <p className="text-gray-500 mt-3">
                Future purchase history section.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}