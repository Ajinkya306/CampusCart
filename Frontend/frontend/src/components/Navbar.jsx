import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-900">
          <FaShoppingCart />
          CampusCart
        </Link>

        <div className="flex gap-4">
          <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}