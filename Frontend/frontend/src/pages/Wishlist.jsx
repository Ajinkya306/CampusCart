import { useEffect, useState } from "react";

import axios from "axios";

import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import { Navigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import ProductCard from "../components/ProductCard";

export default function Wishlist() {

  const { user } =
    useContext(AuthContext);

  const [products, setProducts] =
    useState([]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist =
    async () => {

      try {

        const response =
          await axios.get(
            `http://localhost:5000/api/products/wishlist/user/${user.phoneNumber}`
          );

        setProducts(response.data);

      } catch (error) {

        console.log(error);

      }
    };

  return (

    <div className="bg-slate-100 min-h-screen">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-16">

        <h1 className="text-5xl font-bold text-gray-800 mb-12">
          Wishlist
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

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

      </div>

    </div>
  );
}