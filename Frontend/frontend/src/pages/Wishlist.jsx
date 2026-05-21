import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import ProductCard from "../components/ProductCard";

import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import {
  Navigate,
} from "react-router-dom";

export default function Wishlist() {

  const { user } =
    useContext(AuthContext);

  const [products, setProducts] =
    useState([]);

  useEffect(() => {

    if (user) {

      fetchWishlist();

    }

  }, [user]);

  const fetchWishlist =
    async () => {

      try {

        const response =
          await axios.get(
            `https://campuscart-5wbx.onrender.com/api/products/wishlist/user/${user.phoneNumber}`
          );

        setProducts(response.data);

      } catch (error) {

        console.log(error);

      }
    };

  if (!user) {

    return <Navigate to="/login" />;
  }

  return (

    <div className="bg-slate-100 min-h-screen">

      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="flex items-center justify-between mb-10">

          <h1 className="text-5xl font-black text-gray-800">

            Wishlist

          </h1>

          <p className="text-gray-500 text-lg">

            {
              products.length
            } Saved Products

          </p>

        </div>

        {
          products.length === 0 ? (

            <div className="bg-white rounded-3xl shadow-xl p-20 text-center">

              <h2 className="text-3xl font-bold text-gray-700">

                No Saved Products

              </h2>

              <p className="text-gray-500 mt-4 text-lg">

                Save products to view them here later.

              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {
                products.map(
                  (product) => (

                    <ProductCard
                      key={product._id}
                      product={product}
                    />

                  )
                )
              }

            </div>

          )
        }

      </section>

      <Footer />

    </div>
  );
}