import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import axios from "axios";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

export default function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  const [selectedImage, setSelectedImage] =
    useState("");

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

      setSelectedImage(
        response.data.images?.[0]
      );

    } catch (error) {

      console.log(error);

    }
  };

  const handleContact = () => {

    window.open(
      `https://wa.me/91${product.whatsapp}`,
      "_blank"
    );
  };

  if (!product) {

    return (

      <div className="text-center py-20 text-2xl">

        Loading...

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-2 gap-14">

          {/* LEFT SIDE */}

          <div>

            <div className="bg-white p-5 rounded-3xl shadow-xl">

              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-[500px] object-cover rounded-3xl"
              />

            </div>

            <div className="flex gap-4 mt-5 overflow-x-auto">

              {
                product.images?.map(
                  (image, index) => (

                    <img
                      key={index}
                      src={image}
                      alt=""
                      onClick={() =>
                        setSelectedImage(image)
                      }
                      className={`w-24 h-24 object-cover rounded-2xl cursor-pointer border-4 transition-all ${
                        selectedImage === image
                        ? "border-blue-700"
                        : "border-transparent"
                      }`}
                    />

                  )
                )
              }

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="bg-white rounded-3xl shadow-xl p-10 h-fit">

            <div className="flex flex-wrap gap-3 mb-6">

              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">

                {product.category}

              </span>

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">

                {product.condition}

              </span>

            </div>

            <h1 className="text-5xl font-bold text-gray-800 leading-tight">

              {product.title}

            </h1>

            <p className="text-5xl font-bold text-blue-700 mt-8">

              ₹{product.price}

            </p>

            <div className="mt-10">

              <h2 className="text-2xl font-bold text-gray-800 mb-4">

                Description

              </h2>

              <p className="text-gray-600 leading-8 text-lg">

                {product.description}

              </p>

            </div>

            <div className="mt-10 space-y-4">

              <div className="flex justify-between border-b pb-4">

                <span className="font-semibold text-gray-500">
                  College
                </span>

                <span className="font-bold text-gray-800">
                  {product.college}
                </span>

              </div>

              <div className="flex justify-between border-b pb-4">

                <span className="font-semibold text-gray-500">
                  City
                </span>

                <span className="font-bold text-gray-800">
                  {product.city}
                </span>

              </div>

            </div>

            <div className="mt-12">

              <button
                onClick={handleContact}
                className="w-full bg-gradient-to-r from-blue-700 to-purple-700 text-white py-5 rounded-2xl text-xl font-bold hover:opacity-90 transition-all"
              >

                Contact Seller

              </button>

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </div>
  );
}