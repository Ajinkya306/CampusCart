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

    <section className="max-w-7xl mx-auto px-6 py-14">

      <h2 className="text-4xl font-bold text-gray-800 mb-10">

        Browse Categories

      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

        {
          categoryData.map(
            (item, index) => (

              <div
                key={index}
                onClick={() =>
                  setCategory(item.name)
                }
                className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center justify-center gap-4 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >

                <div className="text-5xl text-blue-700">

                  {item.icon}

                </div>

                <p className="text-lg font-semibold text-gray-700 text-center">

                  {item.name}

                </p>

              </div>

            )
          )
        }

      </div>

    </section>
  );
}