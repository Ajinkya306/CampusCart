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

  const [page, setPage] =
    useState(1);

  const [hasMore, setHasMore] =
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

  /* INFINITE SCROLL */

  const [visibleProducts, setVisibleProducts] =
    useState(8);

  const [loadingMore, setLoadingMore] =
    useState(false);

  useEffect(() => {

    fetchProducts();

  }, [page]);

  const fetchProducts =
    async () => {

      try {

        const response =
          await axios.get(

            `https://campuscart-5wbx.onrender.com/api/products?page=${page}&limit=8`

          );

        console.log(response.data);

        const newProducts =

          Array.isArray(response.data)
            ? response.data
            : response.data.products || [];

        setProducts((prev) => {

          const combined = [
            ...prev,
            ...newProducts
          ];

          const uniqueProducts =

            combined.filter(
              (product, index, self) =>

                index ===
                self.findIndex(
                  (p) =>
                    p._id === product._id
                )
            );

          return uniqueProducts;
        });

        setHasMore(

          response.data.totalPages
            ? page < response.data.totalPages
            : newProducts.length > 0

        );

        setLoading(false);

      } catch (error) {

        console.log(error);

        setLoading(false);

      }
    };

  /* FILTER PRODUCTS */

  let filteredProducts =

    products.filter((product) => {

      const searchText =

        search.trim().toLowerCase();

      const matchesSearch =

        product.title
          ?.toLowerCase()
          ?.includes(searchText)

        ||

        product.category
          ?.toLowerCase()
          ?.includes(searchText)

        ||

        product.description
          ?.toLowerCase()
          ?.includes(searchText)

        ||

        product.college
          ?.toLowerCase()
          ?.includes(searchText)

        ||

        product.city
          ?.toLowerCase()
          ?.includes(searchText)

        ||

        product.condition
          ?.toLowerCase()
          ?.includes(searchText);

      const matchesCategory =

        category === ""

        ||

        product.category === category;

      const matchesCollege =

        product.college
          ?.toLowerCase()
          ?.includes(
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

  /* SORTING */

  if (sort === "low") {

    filteredProducts.sort(
      (a, b) =>
        Number(a.price) -
        Number(b.price)
    );

  }

  if (sort === "high") {

    filteredProducts.sort(
      (a, b) =>
        Number(b.price) -
        Number(a.price)
    );

  }

  /* DISPLAYED PRODUCTS */

  const displayedProducts =

    filteredProducts.slice(
      0,
      visibleProducts
    );

  /* INFINITE SCROLL EFFECT */

  useEffect(() => {

    const handleScroll = () => {

      if (

        window.innerHeight +
        document.documentElement.scrollTop + 200

        >=

        document.documentElement.offsetHeight

      ) {

        if (hasMore && !loadingMore) {

          setLoadingMore(true);

          setTimeout(() => {

            setPage(
              (prev) => prev + 1
            );

            setLoadingMore(false);

          }, 800);

        }

      }

    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>

      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, [
    visibleProducts,
    filteredProducts.length,
    hasMore,
    loadingMore
  ]);

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

            <div
              className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-5
              sm:gap-7
              "
            >

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

            <>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                {
                  displayedProducts.map(
                    (product) => (

                      <ProductCard
                        key={product._id}
                        product={product}
                      />

                    )
                  )
                }

              </div>

              {/* LOADING MORE */}

              {
                loadingMore && (

                  <div className="flex justify-center mt-12">

                    <div
                      className="
                      w-14
                      h-14
                      border-4
                      border-blue-700
                      border-t-transparent
                      rounded-full
                      animate-spin
                      "
                    ></div>

                  </div>

                )
              }

            </>

          )
        }

      </section>

      <Footer />

    </div>
  );
}