import {
  FaLaptop,
  FaBook,
  FaBed,
  FaTools,
  FaTshirt,
  FaHeartbeat,
} from "react-icons/fa";

const categories = [
  {
    name: "Electronics",
    icon: <FaLaptop />,
  },
  {
    name: "Books",
    icon: <FaBook />,
  },
  {
    name: "Hostel",
    icon: <FaBed />,
  },
  {
    name: "Engineering",
    icon: <FaTools />,
  },
  {
    name: "Fashion",
    icon: <FaTshirt />,
  },
  {
    name: "Medical",
    icon: <FaHeartbeat />,
  },
];

export default function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-gray-800 mb-10">
        Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center justify-center hover:-translate-y-2 transition-all duration-300 cursor-pointer"
          >
            <div className="text-4xl text-blue-700 mb-4">
              {category.icon}
            </div>

            <h3 className="font-semibold text-gray-700">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}