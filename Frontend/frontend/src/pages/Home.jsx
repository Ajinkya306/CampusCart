import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

import Hero from "../components/Hero";

import TrendingBanner from "../components/TrendingBanner";

import FilterBar from "../components/FilterBar";

import ProductCard from "../components/ProductCard";

import Footer from "../components/Footer";

import CategorySection from "../components/CategorySection";

import SkeletonCard from "../components/SkeletonCard";

export default function Home() {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [college, setCollege] =
    useState("");

  const [condition, setCondition] =
    useState("");

  const [sort, setSort] =
    useState("");

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts =
    async () => {

      try {

        const response =
          await axios.get(
            "https://campuscart-5wbx.onrender.com/api/products"
          );

        setProducts(response.data);

        setLoading(false);

      } catch (error) {

        console.log(error);

        setLoading(false);

      }
    };

  let filteredProducts =
    products.filter((product) => {

      const matchesSearch =

        product.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        product.category
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =

        category === ""

        ||

        product.category === category;

      const matchesCollege =

        product.college
          ?.toLowerCase()
          .includes(
            college.toLowerCase()
          );

      const matchesCondition =

        condition === ""

        ||

        product.condition === condition;

      return (

        matchesSearch &&
        matchesCategory &&
        matchesCollege &&
        matchesCondition

      );
    });

  if (sort === "low") {

    filteredProducts.sort(
      (a, b) =>
        a.price - b.price
    );

  }

  if (sort === "high") {

    filteredProducts.sort(
      (a, b) =>
        b.price - a.price
    );

  }

  return (

    <div className="bg-slate-100 min-h-screen">

      <Navbar />

      <Hero
        search={search}
        setSearch={setSearch}
      />

      <CategorySection
        setCategory={setCategory}
      />

      <TrendingBanner />

      <FilterBar

        search={search}
        setSearch={setSearch}

        category={category}
        setCategory={setCategory}

        college={college}
        setCollege={setCollege}

        condition={condition}
        setCondition={setCondition}

        sort={sort}
        setSort={setSort}

      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">

        <div className="flex items-center justify-between mb-6 sm:mb-10">

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 sm:mb-10">

            Recently Added

          </h2>

          

          <p className="text-gray-500 text-lg">

            {
              filteredProducts.length
            } Products

          </p>

        </div>

        {
          loading ? (

            <div className="grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-5
              sm:gap-7
              ">  

              {
                Array.from({ length: 6 }).map(
                  (_, index) => (

                    <SkeletonCard
                      key={index}
                    />

                  )
                )
              }

            </div>

          ) : filteredProducts.length === 0 ? (

            <div className="bg-white rounded-3xl shadow-xl p-20 text-center">

              <h2 className="text-3xl font-bold text-gray-700">

                No Products Found

              </h2>

              <p className="text-gray-500 mt-4 text-lg">

                Try searching with different keywords.

              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {
                filteredProducts.map(
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