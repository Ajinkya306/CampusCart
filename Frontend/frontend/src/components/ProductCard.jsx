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

  console.log(user);

  const navigate =
    useNavigate();

  // const isWishlisted =

  //   product.wishlistUsers?.includes(
  //     user?.email
  //   );

  // const toggleWishlist =
  //   async (e) => {

  //     e.preventDefault();

  //     if (!user) {

  //       navigate("/login");

  //       return;
  //     }

  //     try {

  //       const response =

  //         await axios.put(

  //           `https://campuscart-5wbx.onrender.com/api/products/wishlist/${product._id}`,

  //           {

  //             userEmail:
  //             user.email,

  //           }

  //         );

  //       console.log(
  //         response.data
  //       );

  //       toast.success(
  //         "Wishlist Updated"
  //       );

  //     } catch (error) {

  //       console.log(error);

  //       toast.error(
  //         "Wishlist Failed"
  //       );

  //     }
  //   };

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
            scale: 1.02,
          }}

          className="
          bg-white
          rounded-3xl
          overflow-hidden
          shadow-lg
          hover:shadow-2xl
          transition-all
          duration-300
          hover:-translate-y-1
          "

        >

          {/* IMAGE SECTION */}

          <div className="relative">

            <img

              loading="lazy"

              src={
                product.images?.[0]
                ?.replace(
                  "/upload/",
                  "/upload/f_auto,q_auto,w_800/"
                )
              }

              alt={product.title}

              className="
              w-full
              h-48 sm:h-56 lg:h-60
              object-cover
              "

            />

            {/* QUICK VIEW BUTTON */}

            <button

              onClick={(e) => {

                e.preventDefault();

                setShowModal(true);

              }}

              className="
              absolute
              top-3
              right-3
              bg-white
              p-2.5
              rounded-full
              shadow-lg
              hover:scale-110
              transition-all
              "

            >

              <FaEye className="text-blue-700 text-sm sm:text-base" />

            </button>

            {/* CATEGORY + CONDITION */}

            <div className="absolute top-3 left-3 flex flex-col gap-2">

              <span className="bg-blue-700 text-white px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-lg">

                {product.category}

              </span>

              <span

                className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-lg ${
                  product.condition === "New"
                  ? "bg-green-500 text-white"
                  : "bg-yellow-400 text-black"
                }`}

              >

                {product.condition}

              </span>

            </div>

            {/* NEW BADGE */}

            {
              new Date(product.createdAt)

                >

              new Date(
                Date.now() -
                3 * 24 * 60 * 60 * 1000
              ) && (

                <span className="
                absolute
                bottom-3
                left-3
                bg-red-500
                text-white
                px-3
                py-1.5
                rounded-full
                text-[10px]
                sm:text-xs
                font-black
                shadow-xl
                animate-pulse
                ">

                  NEW

                </span>

              )
            }

          </div>

          {/* CONTENT */}

          <div className="p-4 sm:p-5">

            <h2 className="text-lg sm:text-xl font-bold text-gray-800 line-clamp-1">

              {product.title}

            </h2>

            <p className="text-blue-700 text-xl sm:text-2xl font-black mt-2">

              ₹{product.price}

            </p>

            <p className="text-gray-500 mt-2 text-sm sm:text-base line-clamp-1">

              {product.city}

            </p>

            {/* WISHLIST BUTTON

            <button

              onClick={toggleWishlist}

              className={`

              mt-4
              w-full
              py-3
              rounded-2xl
              transition-all
              text-sm
              sm:text-base
              font-semibold

              ${

                isWishlisted

                ? "bg-red-100 text-red-700 hover:bg-red-200"

                : "bg-slate-200 text-gray-800 hover:bg-slate-300"

              }

              `}

            >

              {
                isWishlisted
                ? "Remove Product"
                : "Save Product"
              }

            </button> */}

            {/* CONTACT BUTTON */}

            <button

              onClick={handleContact}

              className="
              mt-4
              w-full
              bg-gradient-to-r
              from-blue-700
              to-purple-700
              text-white
              py-3
              rounded-2xl
              hover:opacity-90
              transition-all
              text-sm
              sm:text-base
              font-semibold
              "

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