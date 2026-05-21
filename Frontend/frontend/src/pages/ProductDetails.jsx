import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import axios from "axios";

import Navbar from "../components/Navbar";

export default function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {

    try {

      const response =
        await axios.get(
          `http://localhost:5000/api/products/${id}`
        );

      setProduct(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  if (!product) {
    return (
      <div className="text-center py-20 text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden">

          <div>
            <img
              src={product.images?.[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-10">

            <h1 className="text-5xl font-bold text-gray-800">
              {product.title}
            </h1>

            <p className="text-4xl text-blue-700 font-bold mt-6">
              ₹{product.price}
            </p>

            <div className="mt-8 space-y-4 text-lg text-gray-600">

              <p>
                <span className="font-semibold">
                  Category:
                </span>{" "}
                {product.category}
              </p>

              <p>
                <span className="font-semibold">
                  Condition:
                </span>{" "}
                {product.condition}
              </p>

              <p>
                <span className="font-semibold">
                  College:
                </span>{" "}
                {product.college}
              </p>

              <p>
                <span className="font-semibold">
                  City:
                </span>{" "}
                {product.city}
              </p>

            </div>

            <div className="mt-10">

              <h2 className="text-2xl font-bold mb-4">
                Description
              </h2>

              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>

            </div>

            <a
              href={`https://wa.me/91${product.whatsapp}`}
              target="_blank"
              className="block mt-10 bg-gradient-to-r from-blue-700 to-purple-700 text-white text-center py-5 rounded-2xl text-xl font-semibold"
            >
              Contact Seller
            </a>

          </div>

        </div>

      </div>

    </div>
  );
}