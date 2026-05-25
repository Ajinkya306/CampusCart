import { Link } from "react-router-dom";

import toast from "react-hot-toast";

import {
  FaShoppingCart,
  FaPlus,
  FaMoon,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";

import { signOut } from "firebase/auth";

import { auth } from "../services/firebase";





export default function Navbar() {

  const { user } =
  useContext(AuthContext);

  const [menuOpen, setMenuOpen] =
    useState(false);



  // const {
  //   user,
  //   darkMode,
  //   toggleDarkMode,
  // } = useContext(AuthContext);

  const handleLogout = async () => {

    try {

      await signOut(auth);

      toast.success("Logged Out");

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* LOGO */}

        <Link to="/">

          <div className="flex flex-col leading-none">

            <div className="flex items-center gap-3 text-3xl font-bold text-blue-900">

              <FaShoppingCart />

              <span>

                CampusCart

              </span>

            </div>

            <span className="text-[14px] text-blue-900 font-bold ml-auto pr-1 tracking-[1px]">

              Buy • Sell • Rent

            </span>

          </div>

        </Link>

        {/* DESKTOP MENU */}

        <div className="hidden md:flex items-center gap-4">

          {/* <button
            onClick={toggleDarkMode}
            className="bg-slate-200 text-black px-4 py-3 rounded-2xl hover:bg-slate-300 transition-all"
          >

            <FaMoon />

          </button> */}

          {/* <Link
            to="/wishlist"
            className="bg-slate-200 text-gray-800 px-5 py-3 rounded-2xl hover:bg-slate-300 transition-all"
          >

            Wishlist

          </Link> */}

          <Link
            to="/profile"
            className="bg-slate-200 text-gray-800 px-5 py-3 rounded-2xl hover:bg-slate-300 transition-all"
          >

            Profile

          </Link>

          <Link
            to="/add-product"
            className="bg-gradient-to-r from-blue-700 to-purple-700 text-white px-5 py-3 rounded-2xl flex items-center gap-2 hover:opacity-90 transition-all"
          >

            <FaPlus />

            Sell Product

          </Link>

          {
            user ? (

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-3 rounded-2xl hover:bg-red-600 transition-all"
              >

                Logout

              </button>

            ) : (

              <Link
                to="/login"
                className="bg-blue-700 text-white px-5 py-3 rounded-2xl hover:bg-blue-800 transition-all"
              >

                Login

              </Link>

            )
          }

        </div>

        {/* MOBILE MENU BUTTON */}

        <button
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          className="md:hidden text-3xl text-blue-900"
        >

          {
            menuOpen
            ? <FaTimes />
            : <FaBars />
          }

        </button>

        

      </div>

      {/* MOBILE MENU */}

      {
        menuOpen && (

          <div className="md:hidden bg-white border-t px-6 py-6 flex flex-col gap-4 shadow-xl">

            {/* <button
              onClick={toggleDarkMode}
              className="bg-slate-200 text-black py-3 rounded-2xl"
            >

              Dark Mode

            </button>

            <Link
              to="/wishlist"
              className="bg-slate-200 text-center py-3 rounded-2xl"
              onClick={() =>
                setMenuOpen(false)
              }
            >

              Wishlist

            </Link> */}

            <Link
              to="/profile"
              className="bg-slate-200 text-center py-3 rounded-2xl"
              onClick={() =>
                setMenuOpen(false)
              }
            >

              Profile

            </Link>

            <Link
              to="/add-product"
              className="bg-gradient-to-r from-blue-700 to-purple-700 text-white text-center py-3 rounded-2xl"
              onClick={() =>
                setMenuOpen(false)
              }
            >

              Sell Product

            </Link>

            {
              user ? (

                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white py-3 rounded-2xl"
                >

                  Logout

                </button>

              ) : (

                <Link
                  to="/login"
                  className="bg-blue-700 text-white text-center py-3 rounded-2xl"
                >

                  Login

                </Link>

              )
            }

          </div>

        )
      }

    </nav>
  );
}