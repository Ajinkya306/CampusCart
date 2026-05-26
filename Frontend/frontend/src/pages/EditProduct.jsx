import { useEffect, useState } from "react";

import axios from "axios";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

export default function EditProduct() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      price: "",
      category: "",
      college: "",
      condition: "",
      whatsapp: "",
    });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct =
    async () => {

      try {

        const response =
          await axios.get(
            `https://campuscart-5wbx.onrender.com/api/products/${id}`
          );

        setFormData(response.data);

      } catch (error) {

        console.log(error);

      }
    };

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

      try {

        await axios.put(
          `https://campuscart-5wbx.onrender.com/api/products/edit/${id}`,
          formData
        );

        toast.success(
          "Product Updated"
        );

        navigate("/my-listings");

      } catch (error) {

        console.log(error);

      }
    };

  return (

    <div className="bg-slate-100 min-h-screen">

      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-16">

        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-3xl shadow-2xl"
        >

          <h1 className="text-4xl font-bold text-gray-800 mb-10">
            Edit Product
          </h1>

          <div className="grid gap-5">

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="border p-4 rounded-2xl"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="border p-4 rounded-2xl h-32"
            />

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="border p-4 rounded-2xl"
            />

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="border p-4 rounded-2xl"
            />

            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              placeholder="College"
              className="border p-4 rounded-2xl"
            />

            <input
              type="text"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              placeholder="Condition"
              className="border p-4 rounded-2xl"
            />

            <input
              type="text"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="WhatsApp"
              className="border p-4 rounded-2xl"
            />

            <button
              className="bg-gradient-to-r from-blue-700 to-purple-700 text-white py-4 rounded-2xl text-lg font-semibold"
            >
              Update Product
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}