import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import axios from "axios";

import Navbar from "../components/Navbar";

export default function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  const [selectedImage, setSelectedImage] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchProduct();

  }, []);

  const fetchProduct = async () => {

    try {

      setLoading(true);

      const response =
        await axios.get(
          `https://campuscart-5wbx.onrender.com/api/products/${id}`
        );

      setProduct(response.data);

      setSelectedImage(
        response.data.images?.[0]
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  /* LOADING SKELETON */

  if (loading) {

    return (

      <div className="bg-slate-100 min-h-screen">

        <Navbar />

        <div className="max-w-7xl mx-auto px-6 py-16">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            <div className="bg-white rounded-3xl p-6 shadow-xl animate-pulse">

              <div className="h-[350px] sm:h-[500px] bg-slate-300 rounded-3xl"></div>

            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl animate-pulse">

              <div className="h-10 bg-slate-300 rounded w-3/4"></div>

              <div className="h-8 bg-slate-300 rounded w-1/3 mt-6"></div>

              <div className="h-32 bg-slate-300 rounded mt-10"></div>

              <div className="h-14 bg-slate-300 rounded-2xl mt-10"></div>

            </div>

          </div>

        </div>

      </div>

    );
  }

  /* PRODUCT NOT FOUND */

  if (!product) {

    return (

      <div className="text-center py-20 text-2xl">

        Product not found

      </div>

    );
  }

  return (

    <div className="bg-slate-100 min-h-screen">

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">

        <div

          className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-8
          lg:gap-12
          bg-white
          rounded-3xl
          shadow-xl
          overflow-hidden
          "

        >

          {/* IMAGE SECTION */}

          <div className="p-4 sm:p-6">

            {/* MAIN IMAGE */}

            <img

              loading="lazy"

              src={
                selectedImage
                ?.replace(
                  "/upload/",
                  "/upload/f_auto,q_auto,w_1000/"
                )
              }

              alt={product.title}

              className="
              w-full
              h-[300px]
              sm:h-[450px]
              lg:h-[500px]
              object-cover
              rounded-3xl
              shadow-xl
              "

            />

            {/* THUMBNAILS */}

            <div className="flex gap-3 sm:gap-4 mt-5 overflow-x-auto pb-2">

              {
                product.images?.map(
                  (image, index) => (

                    <img

                      loading="lazy"

                      key={index}

                      src={
                        image?.replace(
                          "/upload/",
                          "/upload/f_auto,q_auto,w_300/"
                        )
                      }

                      alt=""

                      onClick={() =>
                        setSelectedImage(image)
                      }

                      className={`
                      w-20
                      h-20
                      sm:w-24
                      sm:h-24
                      object-cover
                      rounded-2xl
                      cursor-pointer
                      border-4
                      transition-all
                      flex-shrink-0
                      ${
                        selectedImage === image
                        ? "border-blue-700"
                        : "border-transparent"
                      }
                      `}

                    />

                  )
                )
              }

            </div>

          </div>

          {/* CONTENT */}

          <div className="p-6 sm:p-8 lg:p-10">

            {/* TITLE */}

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800 leading-tight">

              {product.title}

            </h1>

            {/* PRICE */}

            <p className="text-2xl sm:text-3xl lg:text-4xl text-blue-700 font-black mt-6">

              ₹{product.price}

            </p>

            {/* DETAILS */}

            <div className="mt-8 space-y-4 text-base sm:text-lg text-gray-600">

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

            {/* DESCRIPTION */}

            <div className="mt-10">

              <h2 className="text-xl sm:text-2xl font-black mb-4">

                Description

              </h2>

              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">

                {product.description}

              </p>

            </div>

            {/* CONTACT BUTTON */}

            <a

              href={`https://wa.me/91${product.whatsapp}`}

              target="_blank"

              className="
              block
              mt-10
              bg-gradient-to-r
              from-blue-700
              to-purple-700
              text-white
              text-center
              py-4
              sm:py-5
              rounded-2xl
              text-lg
              sm:text-xl
              font-semibold
              hover:opacity-90
              transition-all
              "

            >

              Contact Seller

            </a>

          </div>

        </div>

      </div>

    </div>
  );
}