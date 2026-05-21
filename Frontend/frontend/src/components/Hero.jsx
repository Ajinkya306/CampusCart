import { motion } from "framer-motion";

export default function Hero({

  search,
  setSearch,

}) {
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
          <div
            className="
            flex items-center
            w-full
            max-w-md
            rounded-full
            border border-white/30
            bg-white/80
            backdrop-blur-md
            px-6
            py-3
            shadow-lg
            transition-all
            duration-300
            focus-within:shadow-2xl
            "
            >
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
              w-full
              bg-transparent
              text-black
              outline-none
              placeholder:text-black
              "
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10 max-w-5xl mx-auto">

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 text-center shadow-xl">

            <p className="text-blue-100 text-sm">
              Active Listings
            </p>

            <h2 className="text-4xl font-black text-white mt-2">
              2K+
            </h2>

          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 text-center shadow-xl">

            <p className="text-blue-100 text-sm">
              Students Connected
            </p>

            <h2 className="text-4xl font-black text-white mt-2">
              15K+
            </h2>

          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 text-center shadow-xl">

            <p className="text-blue-100 text-sm">
              Colleges
            </p>

            <h2 className="text-4xl font-black text-white mt-2">
              100+
            </h2>

          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 text-center shadow-xl">

            <p className="text-blue-100 text-sm">
              Cities
            </p>

            <h2 className="text-4xl font-black text-white mt-2">
              20+
            </h2>

          </div>

        </div>

        
      </motion.div>
    </section>
  );
}