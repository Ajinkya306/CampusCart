import { motion } from "framer-motion";

export default function Hero({

  search,

  setSearch,

  stats = {

    totalProducts: 0,

    totalUsers: 0,

    totalColleges: 0,

    totalCities: 0,

  },

}) {

  return (

    <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-purple-700 text-white overflow-hidden">

      <motion.div

        initial={{
          opacity: 0,
          y: 30,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 1,
        }}

        className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center"

      >

        {/* TITLE */}

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">

          CampusCart

        </h1>

        {/* SUBTITLE */}

        <p className="mt-6 text-lg sm:text-xl lg:text-2xl text-blue-100">

          Everything Students Need

        </p>

        {/* SEARCH BAR */}

        <div className="mt-10 flex justify-center">

          <div

            className="
            flex items-center
            w-full
            max-w-3xl
            rounded-full
            border border-white/20
            bg-white/90
            backdrop-blur-md
            px-4 sm:px-6
            py-3 sm:py-4
            shadow-2xl
            transition-all
            duration-300
            focus-within:scale-[1.01]
            "

          >

            <input

              type="text"

              placeholder="Search products, books, laptops..."

              value={search}

              onChange={(e) =>
                setSearch(e.target.value)
              }

              className="
              w-full
              bg-transparent
              text-black
              outline-none
              placeholder:text-gray-500
              text-sm sm:text-lg
              "

            />

          </div>

        </div>

        {/* STATS SECTION */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 max-w-6xl mx-auto">

          {/* ACTIVE LISTINGS */}

          <div

            className="
            bg-white/10
            backdrop-blur-xl
            border border-white/10
            rounded-3xl
            p-5 sm:p-7
            shadow-xl
            hover:scale-105
            transition-all
            duration-300
            "

          >

            <p className="text-blue-100 text-xs sm:text-sm">

              Active Listings

            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-2">

              {stats.totalProducts}+

            </h2>

          </div>

          {/* STUDENTS CONNECTED */}

          <div

            className="
            bg-white/10
            backdrop-blur-xl
            border border-white/10
            rounded-3xl
            p-5 sm:p-7
            shadow-xl
            hover:scale-105
            transition-all
            duration-300
            "

          >

            <p className="text-blue-100 text-xs sm:text-sm">

              Students Connected

            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-2">

              {stats.totalUsers}+

            </h2>

          </div>

          {/* COLLEGES */}

          <div

            className="
            bg-white/10
            backdrop-blur-xl
            border border-white/10
            rounded-3xl
            p-5 sm:p-7
            shadow-xl
            hover:scale-105
            transition-all
            duration-300
            "

          >

            <p className="text-blue-100 text-xs sm:text-sm">

              Colleges

            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-2">

              {stats.totalColleges}+

            </h2>

          </div>

          {/* CITIES */}

          <div

            className="
            bg-white/10
            backdrop-blur-xl
            border border-white/10
            rounded-3xl
            p-5 sm:p-7
            shadow-xl
            hover:scale-105
            transition-all
            duration-300
            "

          >

            <p className="text-blue-100 text-xs sm:text-sm">

              Cities

            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-2">

              {stats.totalCities}+

            </h2>

          </div>

        </div>

      </motion.div>

    </section>

  );

}