import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-3xl overflow-hidden shadow-lg"
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-60 object-cover"
      />

      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800">
          {product.title}
        </h2>

        <p className="text-blue-700 text-2xl font-bold mt-2">
          ₹{product.price}
        </p>

        <p className="text-gray-500 mt-2">
          {product.city}
        </p>

        <button className="mt-5 w-full bg-gradient-to-r from-blue-700 to-purple-700 text-white py-3 rounded-2xl hover:opacity-90 transition-all">
          Contact Seller
        </button>
      </div>
    </motion.div>
  );
}