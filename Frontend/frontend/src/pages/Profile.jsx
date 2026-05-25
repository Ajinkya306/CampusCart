import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import { Navigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import { Link } from "react-router-dom";

import {
  FaBoxOpen,
  FaHeart,
  FaShoppingBag,
  FaPhoneAlt,
} from "react-icons/fa";

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

        {/* PROFILE HEADER */}

        <div className="bg-white rounded-3xl shadow-2xl p-10">

          <div className="flex flex-col md:flex-row md:items-center gap-8">

            {/* PROFILE CIRCLE */}

            <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-700 to-purple-700 flex items-center justify-center text-white text-5xl font-black shadow-xl">

              {
                user.email
                ?.slice(-2)
              }

            </div>

            {/* USER DETAILS */}

            <div>

              <h1 className="text-4xl font-black text-gray-800">

                {user?.name || "Student"}

              </h1>

              <p className="text-gray-500 mt-3 text-lg flex items-center gap-2">

                <FaPhoneAlt />

                {user.email}

              </p>

              <p className="text-gray-400 mt-2">

                Welcome back to CampusCart

              </p>

            </div>

          </div>

          {/* DASHBOARD CARDS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">

            {/* MY LISTINGS */}

            <Link to="/my-listings">

              <div className="bg-slate-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">

                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 text-3xl">

                  <FaBoxOpen />

                </div>

                <h2 className="text-3xl font-black text-blue-700 mt-6">

                  My Listings

                </h2>

                <p className="text-gray-500 mt-4 text-lg leading-relaxed">

                  Manage all products you uploaded on CampusCart.

                </p>

              </div>

            </Link>

            {/* WISHLIST */}

            {/* <Link to="/wishlist">

              <div className="bg-slate-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">

                <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700 text-3xl">

                  <FaHeart />

                </div>

                <h2 className="text-3xl font-black text-purple-700 mt-6">

                  Wishlist

                </h2>

                <p className="text-gray-500 mt-4 text-lg leading-relaxed">

                  View and manage your saved favorite products.

                </p>

              </div>

            </Link> */}

            {/* PURCHASES */}

            <div className="bg-slate-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">

              <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-700 text-3xl">

                <FaShoppingBag />

              </div>

              <h2 className="text-3xl font-black text-indigo-700 mt-6">

                Purchases

              </h2>

              <p className="text-gray-500 mt-4 text-lg leading-relaxed">

                Future purchase history and order tracking section.

              </p>

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </div>
  );
}