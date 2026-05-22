import { motion } from "framer-motion";

import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import axios from "axios";

import {
  FaEye,
} from "react-icons/fa";

import QuickViewModal from "./QuickViewModal";

import toast from "react-hot-toast";

export default function ProductCard({
  product,
}) {

  const [showModal, setShowModal] =
    useState(false);

  const { user } =
    useContext(AuthContext);

  const navigate =
    useNavigate();

  const isWishlisted =

    product.wishlistUsers?.includes(
      user?.phoneNumber
    );

  const toggleWishlist =
    async (e) => {

      e.preventDefault();

      if (!user) {

        navigate("/login");

        return;
      }

      try {

        await axios.put(
          `https://campuscart-5wbx.onrender.com/api/products/wishlist/${product._id}`,
          {
            userPhone:
              user.phoneNumber,
          }
        );

        toast.success(
          "Wishlist Updated"
        );

      } catch (error) {

        console.log(error);

      }
    };

  const handleContact = (e) => {

    e.preventDefault();

    if (!user) {

      navigate("/login");

      return;
    }

    window.open(
      `https://wa.me/91${product.whatsapp}`,
      "_blank"
    );
  };

  return (

    <>

      <Link to={`/product/${product._id}`}>

        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
        >

          {/* IMAGE SECTION */}

          <div className="relative">

            <img
              loading="lazy"
              src={product.images?.[0]}
              alt={product.title}
              className="w-full h-60 object-cover"
            />

            {/* QUICK VIEW BUTTON */}

            <button
              onClick={(e) => {

                e.preventDefault();

                setShowModal(true);

              }}
              className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-all"
            >

              <FaEye className="text-blue-700" />

            </button>

            {/* CATEGORY + CONDITION BADGES */}

            <div className="absolute top-4 left-4 flex flex-col gap-2">

              <span className="bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">

                {product.category}

              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                  product.condition === "New"
                  ? "bg-green-500 text-white"
                  : "bg-yellow-400 text-black"
                }`}
              >

                {product.condition}

              </span>

            </div>

            {/* NEW PRODUCT BADGE */}

            {
              new Date(product.createdAt)

                >

              new Date(
                Date.now() -
                3 * 24 * 60 * 60 * 1000
              ) && (

                <span className="absolute bottom-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-xs font-black shadow-xl animate-pulse">

                  NEW

                </span>

              )
            }

          </div>

          {/* CONTENT */}

          <div className="p-5">

            <h2 className="text-xl font-bold text-gray-800 line-clamp-1">

              {product.title}

            </h2>

            <p className="text-blue-700 text-2xl font-bold mt-2">

              ₹{product.price}

            </p>

            <p className="text-gray-500 mt-2">

              {product.city}

            </p>

            <button
              onClick={toggleWishlist}
              className={`mt-5 w-full py-3 rounded-2xl transition-all ${
                isWishlisted
                ? "bg-red-100 text-red-700 hover:bg-red-200"
                : "bg-slate-200 text-gray-800 hover:bg-slate-300"
              }`}
            >

              {
                isWishlisted
                ? "Remove Product"
                : "Save Product"
              }

            </button>

            <button
              onClick={handleContact}
              className="mt-5 w-full bg-gradient-to-r from-blue-700 to-purple-700 text-white py-3 rounded-2xl hover:opacity-90 transition-all"
            >

              Contact Seller

            </button>

          </div>

        </motion.div>

      </Link>

      {/* QUICK VIEW MODAL */}

      {
        showModal && (

          <QuickViewModal
            product={product}
            onClose={() =>
              setShowModal(false)
            }
          />

        )
      }

    </>

  );
}