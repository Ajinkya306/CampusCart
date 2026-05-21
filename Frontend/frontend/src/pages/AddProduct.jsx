import { useState } from "react";

import axios from "axios";

import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

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
      city: "Pune",
      college: "",
      condition: "",
      type: "sell",
      whatsapp: "",
    });

  const [images, setImages] =
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

      setLoading(true);

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

      data.append(
        "sellerPhone",
        user.phoneNumber
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

      try {

        await axios.post(
          "http://localhost:5000/api/products",
          data,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        alert(
          "Product Uploaded Successfully"
        );

        navigate("/");

      } catch (error) {

        console.log(error);

        alert(
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

          <input
            type="text"
            name="category"
            placeholder="Category"
            onChange={handleChange}
            className="w-full border border-slate-300 p-4 rounded-2xl bg-white text-black"
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
            onChange={(e) =>
              setImages(
                e.target.files
              )
            }
            className="w-full border border-slate-300 p-4 rounded-2xl bg-white text-black"
            required
          />

          <input
            type="text"
            name="whatsapp"
            placeholder="WhatsApp Number"
            onChange={handleChange}
            className="w-full border border-slate-300 p-4 rounded-2xl bg-white text-black"
            required
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-700 to-purple-700 text-white py-4 rounded-2xl text-lg font-semibold hover:opacity-90 transition-all"
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