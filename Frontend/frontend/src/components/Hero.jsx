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

          OLX for College Students

        </p>

        

        

      </motion.div>

    </section>

  );

}