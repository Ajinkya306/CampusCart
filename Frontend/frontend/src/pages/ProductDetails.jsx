import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import axios from "axios";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import ProductCard from "../components/ProductCard";

import {
  FaChevronLeft,
  FaChevronRight,
  FaShareAlt,
  FaWhatsapp,
  FaCopy,
} from "react-icons/fa";

import toast from "react-hot-toast";

export default function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  const [relatedProducts, setRelatedProducts] =
    useState([]);

  const [selectedImage, setSelectedImage] =
    useState("");

  const [currentImageIndex, setCurrentImageIndex] =
    useState(0);

  useEffect(() => {

    fetchProduct();

  }, []);

  const fetchRelatedProducts =
    async (
      category,
      id
    ) => {

      try {

        const response =
          await axios.get(
            `https://campuscart-5wbx.onrender.com/api/products/related/${category}/${id}`
          );

        setRelatedProducts(
          response.data
        );

      } catch (error) {

        console.log(error);

      }
    };

  const fetchProduct = async () => {

    try {

      const response =
        await axios.get(
          `/api/products/${id}`
        );https://campuscart-5wbx.onrender.com

      setProduct(response.data);

      fetchRelatedProducts(
        response.data.category,
        response.data._id
      );

      setSelectedImage(
        response.data.images?.[0]
      );

      setCurrentImageIndex(0);

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

  const nextImage = () => {

    const nextIndex =

      currentImageIndex ===
      product.images.length - 1

      ? 0

      : currentImageIndex + 1;

    setCurrentImageIndex(
      nextIndex
    );

    setSelectedImage(
      product.images[nextIndex]
    );
  };

  const prevImage = () => {

    const prevIndex =

      currentImageIndex === 0

      ? product.images.length - 1

      : currentImageIndex - 1;

    setCurrentImageIndex(
      prevIndex
    );

    setSelectedImage(
      product.images[prevIndex]
    );
  };

  const productUrl =
    window.location.href;

  const copyLink = async () => {

    try {

      await navigator.clipboard.writeText(
        productUrl
      );

      toast.success(
        "Link Copied"
      );

    } catch (error) {

      console.log(error);

    }
  };

  const whatsappShare = () => {

    const message =

      `Check out this product on CampusCart:\n\n${product.title}\n₹${product.price}\n\n${productUrl}`;

    window.open(

      `https://wa.me/?text=${encodeURIComponent(message)}`,

      "_blank"

    );
  };

  const nativeShare = async () => {

    if (navigator.share) {

      try {

        await navigator.share({

          title: product.title,

          text: product.description,

          url: productUrl,

        });

      } catch (error) {

        console.log(error);

      }
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

    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-2 gap-14">

          {/* LEFT SIDE */}

          <div>

            <div className="bg-white p-5 rounded-3xl shadow-xl">

              <div className="relative">

                <img
                  src={selectedImage}
                  alt={product.title}
                  className="w-full h-[500px] object-cover rounded-3xl"
                />

                {
                  product.images?.length > 1 && (

                    <>

                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-xl hover:scale-110 transition-all"
                      >

                        <FaChevronLeft />

                      </button>

                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-xl hover:scale-110 transition-all"
                      >

                        <FaChevronRight />

                      </button>

                    </>

                  )
                }

              </div>

            </div>

            <div className="flex gap-4 mt-5 overflow-x-auto">

              {
                product.images?.map(
                  (image, index) => (

                    <img
                      key={index}
                      src={image}
                      alt=""
                      onClick={() => {

                        setSelectedImage(image);

                        setCurrentImageIndex(index);

                      }}
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

            {/* SHARE BUTTONS */}

            <div className="flex flex-wrap gap-4 mt-10">

              <button
                onClick={copyLink}
                className="flex items-center gap-2 bg-slate-200 text-gray-800 px-5 py-3 rounded-2xl hover:bg-slate-300 transition-all"
              >

                <FaCopy />

                Copy Link

              </button>

              <button
                onClick={whatsappShare}
                className="flex items-center gap-2 bg-green-500 text-white px-5 py-3 rounded-2xl hover:bg-green-600 transition-all"
              >

                <FaWhatsapp />

                WhatsApp

              </button>

              {
                navigator.share && (

                  <button
                    onClick={nativeShare}
                    className="flex items-center gap-2 bg-blue-700 text-white px-5 py-3 rounded-2xl hover:bg-blue-800 transition-all"
                  >

                    <FaShareAlt />

                    Share

                  </button>

                )
              }

            </div>

            {/* CONTACT BUTTON */}

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

      {/* RELATED PRODUCTS */}

      {
        relatedProducts.length > 0 && (

          <section className="max-w-7xl mx-auto px-6 pb-20">

            <h2 className="text-4xl font-black text-gray-800 mb-10">

              Related Products

            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

              {
                relatedProducts.map(
                  (item) => (

                    <ProductCard
                      key={item._id}
                      product={item}
                    />

                  )
                )
              }

            </div>

          </section>

        )
      }

      <Footer />

    </div>
  );
}