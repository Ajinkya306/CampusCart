import { motion } from "framer-motion";

import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import { useNavigate, Link } from "react-router-dom";

import axios from "axios";

export default function ProductCard({
  product,
}) {

  const { user } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const toggleWishlist =
  async (e) => {

    e.preventDefault();

    if (!user) {

      navigate("/login");

      return;
    }

    try {

      await axios.put(
        `http://localhost:5000/api/products/wishlist/${product._id}`,
        {
          userPhone:
            user.phoneNumber,
        }
      );

      alert(
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

    <Link to={`/product/${product._id}`}>

      <motion.div
        whileHover={{ scale: 1.03 }}
        className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
      >

        <img
          src={product.images?.[0]}
          alt={product.title}
          className="w-full h-60 object-cover"
        />

        <div className="p-5">

          <h2 className="text-xl font-bold text-gray-800 ">
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
            className="mt-5 w-full bg-slate-200 text-gray-800  py-3 rounded-2xl hover:bg-slate-300 transition-all"
          >
            Save Product
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
  );
}