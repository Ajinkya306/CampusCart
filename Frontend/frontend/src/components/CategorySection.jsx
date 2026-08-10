import {
  FaLaptop,
  FaBook,
  FaBed,
  FaTshirt,
  FaGamepad,
  FaBicycle,
  FaFootballBall,
  FaFlask,
  FaTools,
  FaBriefcase,
} from "react-icons/fa";

const categoryData = [

  {
    name: "Electronics",
    icon: <FaLaptop />,
  },

  {
    name: "Books",
    icon: <FaBook />,
  },

  {
    name: "Furniture",
    icon: <FaBed />,
  },

  {
    name: "Fashion",
    icon: <FaTshirt />,
  },

  {
    name: "Gaming",
    icon: <FaGamepad />,
  },

  {
    name: "Cycles",
    icon: <FaBicycle />,
  },

  {
    name: "Sports",
    icon: <FaFootballBall />,
  },

  {
    name: "Medical",
    icon: <FaFlask />,
  },

  {
    name: "Lab Equipment",
    icon: <FaTools />,
  },

  {
    name: "Internship",
    icon: <FaBriefcase />,
  },

];

export default function CategorySection({

  setCategory,

}) {

  return (

    <section className="max-w-7xl mx-auto px-6 py-16">

      <div className="text-center mb-12">

        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">

          Browse Categories

        </h2>

        <p className="text-gray-500 mt-4 text-lg">

          Choose a category to quickly explore products.

        </p>

      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">

        {

          categoryData.map(

            (item, index) => (

              <div

                key={index}

                onClick={() =>

                  setCategory(item.name)

                }

                className="

                  group

                  bg-gradient-to-br

                  from-blue-600

                  to-indigo-700

                  rounded-3xl

                  p-8

                  shadow-lg

                  hover:shadow-2xl

                  hover:-translate-y-2

                  hover:scale-105

                  transition-all

                  duration-300

                  cursor-pointer

                  text-center

                "

              >

                <div

                  className="

                    text-6xl

                    text-white

                    mb-6

                    flex

                    justify-center

                    transition-transform

                    duration-300

                    group-hover:scale-110

                  "

                >

                  {item.icon}

                </div>

                <p

                  className="

                    text-xl

                    font-bold

                    text-white

                  "

                >

                  {item.name}

                </p>

                <p

                  className="

                    mt-4

                    text-sm

                    text-blue-100

                    group-hover:translate-x-2

                    transition-all

                    duration-300

                  "

                >

                  Explore →

                </p>

              </div>

            )

          )

        }

      </div>

    </section>

  );

}