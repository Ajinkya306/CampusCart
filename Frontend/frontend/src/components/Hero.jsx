import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-700 text-white py-28 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-5xl mx-auto text-center"
      >
        <h1 className="text-6xl font-extrabold leading-tight">
          CampusCart
        </h1>

        <p className="mt-6 text-2xl text-blue-100">
          Everything Students Need
        </p>

        <div className="mt-10 flex justify-center">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full max-w-2xl px-6 py-4 rounded-2xl text-black outline-none shadow-2xl"
          />
        </div>
      </motion.div>
    </section>
  );
}