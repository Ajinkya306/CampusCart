import { useState } from "react";

import axios from "axios";

import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import categories from "../data/categories";

import toast from "react-hot-toast";

import {
  Navigate,
  useNavigate,
} from "react-router-dom";

export default function AddProduct() {

  const { user } =
    useContext(AuthContext);

  const navigate =
    useNavigate();

  if (!user) {

    return <Navigate to="/login" />;

  }

  const [formData, setFormData] =
    useState({

      title: "",

      description: "",

      price: "",

      category: "",

      city: "",

      college: "",

      condition: "",

      type: "sell",

      whatsapp: "",

    });

  const [images, setImages] =
    useState([]);

  const [previewImages, setPreviewImages] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      console.log(
        "FORM SUBMIT HIT"
      );

      setLoading(true);

      try {

        const data =
          new FormData();

        Object.keys(formData).forEach(
          (key) => {

            data.append(
              key,
              formData[key]
            );

          }
        );

        /* GOOGLE AUTH USER */

        data.append(
          "sellerEmail",
          user.email
        );

        data.append(
          "sellerName",
          user.displayName
        );

        for (
          let i = 0;
          i < images.length;
          i++
        ) {

          data.append(
            "images",
            images[i]
          );

        }

        console.log(
          "FORM DATA:"
        );

        for (
          let pair
          of data.entries()
        ) {

          console.log(pair);

        }

        const response =

          await axios.post(

            "https://campuscart-5wbx.onrender.com/api/products",

            data,

            {

              headers: {

                "Content-Type":
                  "multipart/form-data",

              },

            }

          );

        console.log(
          "UPLOAD SUCCESS"
        );

        console.log(response);

        toast.success(
          "Product Uploaded Successfully"
        );

        navigate("/");

      } catch (error) {

        console.log(
          "UPLOAD FRONTEND ERROR:"
        );

        console.log(error);

        console.log(
          error.response
        );

        toast.error(
          "Upload Failed"
        );

      }

      setLoading(false);

    };

  return (

    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-2xl"
      >

        <h1 className="text-5xl font-bold text-blue-900 mb-10">

          Sell Product

        </h1>

        <div className="grid gap-5">

          <input
            type="text"
            name="title"
            placeholder="Product Title"
            onChange={handleChange}
            className="w-full border border-slate-300 p-4 rounded-2xl bg-white text-black"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="w-full border border-slate-300 p-4 rounded-2xl h-32 bg-white text-black"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            className="w-full border border-slate-300 p-4 rounded-2xl bg-white text-black"
            required
          />

          <select
            name="category"
            onChange={handleChange}
            className="w-full border border-slate-300 p-4 rounded-2xl bg-white text-black"
            required
          >

            <option value="">
              Select Category
            </option>

            {
              categories.map(
                (category, index) => (

                  <option
                    key={index}
                    value={category}
                  >

                    {category}

                  </option>

                )
              )
            }

          </select>

          <input

            type="text"

            name="city"

            placeholder="Enter City"

            value={formData.city}

            onChange={handleChange}

            className="
            w-full
            border
            border-slate-300
            p-4
            rounded-2xl
            outline-none
            "

            required

          />

          <input
            type="text"
            name="college"
            placeholder="College"
            onChange={handleChange}
            className="w-full border border-slate-300 p-4 rounded-2xl bg-white text-black"
            required
          />

          <select
            name="condition"
            onChange={handleChange}
            className="w-full border border-slate-300 p-4 rounded-2xl bg-white text-black"
            required
          >

            <option value="">
              Select Condition
            </option>

            <option value="New">
              New
            </option>

            <option value="Used">
              Used
            </option>

          </select>

          <input
            type="file"
            multiple
            onChange={(e) => {

              setImages(
                e.target.files
              );

              const imageArray =
                Array.from(
                  e.target.files
                );

              const previewArray =

                imageArray.map(
                  (file) =>

                    URL.createObjectURL(
                      file
                    )

                );

              setPreviewImages(
                previewArray
              );

            }}

            className="w-full border border-slate-300 p-4 rounded-2xl bg-white text-black"
          />

          {
            previewImages.length > 0 && (

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">

                {
                  previewImages.map(
                    (image, index) => (

                      <img
                        key={index}
                        src={image}
                        alt=""
                        className="w-full h-40 object-cover rounded-2xl shadow-lg"
                      />

                    )
                  )
                }

              </div>

            )
          }

          <input

            type="tel"

            name="whatsapp"

            placeholder="WhatsApp Number"

            value={formData.whatsapp}

            onChange={(e) => {

              const numbersOnly =

                e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 10);

              setFormData({

                ...formData,

                whatsapp:
                  numbersOnly,

              });

            }}

            className="
            w-full
            border
            border-slate-300
            p-4
            rounded-2xl
            bg-white
            text-black
            "

            required

          />

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-blue-700 to-purple-700 text-white py-4 rounded-2xl text-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50"
          >

            {
              loading
              ? "Uploading..."
              : "Upload Product"
            }

          </button>

        </div>

      </form>

    </div>

  );

}