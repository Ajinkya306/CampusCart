import { useEffect, useState } from "react";

import axios from "axios";

import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import { Navigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import { Link } from "react-router-dom";

import toast from "react-hot-toast";

export default function MyListings() {

  const { user } =
    useContext(AuthContext);

  const [products, setProducts] =
    useState([]);

  const [deletingId, setDeletingId] =
    useState(null);

  if (!user) {

    return <Navigate to="/login" />;

  }

  useEffect(() => {

    fetchMyProducts();

  }, []);

  const fetchMyProducts =
    async () => {

      try {

        const response =

          await axios.get(

            `https://campuscart-5wbx.onrender.com/api/products/user/${user.email}`

          );

        setProducts(

          response.data || []

        );

      } catch (error) {

        console.log(error);

      }

    };

  const deleteProduct =
    async (id) => {

      const confirmDelete =

        window.confirm(

          "Are you sure you want to permanently delete this product?"

        );

      if (!confirmDelete)
        return;

      try {

        setDeletingId(id);

        await axios.delete(

          `https://campuscart-5wbx.onrender.com/api/products/${id}`,

          {

            data: {

              sellerEmail:
                user.email,

            },

          }

        );

        fetchMyProducts();

        toast.success(
          "Product Deleted"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Delete Failed"
        );

      } finally {

        setDeletingId(null);

      }

    };

  return (

    <div className="bg-slate-100 min-h-screen">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-16">

        <h1 className="text-5xl font-bold text-gray-800 mb-12">

          My Listings

        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {
            products?.map(
              (product) => (

                <div
                  key={product._id}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl"
                >

                  <img

                    loading="lazy"

                    src={
                      product.images?.[0]
                      ?.replace(
                        "/upload/",
                        "/upload/f_auto,q_auto,w_800/"
                      )
                    }

                    alt={product.title}

                    className="w-full h-64 object-cover"

                  />

                  <div className="p-6">

                    <h2 className="text-2xl font-bold text-gray-800">

                      {product.title}

                    </h2>

                    <p className="text-blue-700 text-3xl font-bold mt-3">

                      ₹{product.price}

                    </p>

                    <Link
                      to={`/edit-product/${product._id}`}
                    >

                      <button
                        className="mt-4 w-full bg-blue-700 text-white py-4 rounded-2xl hover:bg-blue-800 transition-all"
                      >

                        Edit Product

                      </button>

                    </Link>

                    <button

                      onClick={() =>
                        deleteProduct(
                          product._id
                        )
                      }

                      className="mt-6 w-full bg-red-500 text-white py-4 rounded-2xl hover:bg-red-600 transition-all"

                    >

                      {
                        deletingId === product._id

                        ? "Deleting..."

                        : "Delete Product"
                      }

                    </button>

                  </div>

                </div>

              )
            )
          }

        </div>

      </div>

    </div>

  );

}