import { useEffect, useState, useRef } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

import Hero from "../components/Hero";

import TrendingBanner from "../components/TrendingBanner";

import FilterBar from "../components/FilterBar";

import ProductCard from "../components/ProductCard";

import Footer from "../components/Footer";

import CategorySection from "../components/CategorySection";

import SkeletonCard from "../components/SkeletonCard";

import { Helmet }
from "react-helmet-async";

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

  const [debouncedSearch, setDebouncedSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [college, setCollege] =
    useState("");

  const [condition, setCondition] =
    useState("");

  const [sort, setSort] =
    useState("");

  /* NEW DYNAMIC STATS */

  const [stats, setStats] =
    useState({
      
      totalProducts: 0,

      totalUsers: 0,

      totalColleges: 0,

      totalCities: 0,

    });

  const productsSectionRef = useRef(null);

  /* INFINITE SCROLL */

  const [loadingMore, setLoadingMore] =
    useState(false);

  useEffect(() => {

    fetchProducts();

  }, [page]);

  /* FETCH STATS */

  useEffect(() => {

    fetchStats();

  }, []);

  useEffect(() => {

    const timer =

      setTimeout(() => {

        setDebouncedSearch(search);

      }, 400);

    return () =>

      clearTimeout(timer);

  }, [search]);


  useEffect(() => {

  if (
    search ||
    category ||
    college ||
    condition
  ) {

    setTimeout(() => {

      productsSectionRef.current?.scrollIntoView({

        behavior: "smooth",

        block: "start",

      });

    }, 150);

  }

}, [

  debouncedSearch,

  category,

  college,

  condition,

]);

  const fetchStats =
    async () => {

      try {

        const response =

          await axios.get(

            "https://campuscart-5wbx.onrender.com/api/products/stats/all"

          );

        setStats(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

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

        debouncedSearch
          .trim()
          .toLowerCase();

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

        product.collegeNormalized
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

      /* IMPROVED COLLEGE SEARCH */

        const searchCollege =

        college
          .toLowerCase()
          .trim();

        const matchesCollege =

        searchCollege === ""

        ||

        product.college
          ?.toLowerCase()
          ?.includes(searchCollege)

        ||

        product.collegeSearch
          ?.toLowerCase()
          ?.includes(searchCollege);

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

            setPage((prev) => {

              if (loadingMore)
                return prev;

              return prev + 1;

            });

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
    hasMore,
    loadingMore
  ]);

  return (

    <div className="bg-slate-100 min-h-screen">

      <Helmet>

        <title>

          CampusCart | Buy & Sell Student Products

        </title>

        <meta

          name="description"

          content="
          CampusCart is a student marketplace for buying and selling laptops, books, gadgets, furniture, notes, and more across colleges.
          "

        />

        <meta
          property="og:title"
          content="CampusCart"
        />

        <meta
          property="og:description"
          content="
          Buy and sell student products across colleges with CampusCart.
          "
        />

        <meta
          property="og:type"
          content="website"
        />

      </Helmet>

      <Navbar />

      <Hero

        search={search}

        setSearch={setSearch}

        stats={stats}

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

      <section

        ref={productsSectionRef}

        className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16"

        >

        <div className="flex items-center justify-between mb-6 sm:mb-10">

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 sm:mb-10">

            {

              search

                ? `Showing ${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""} for "${search}"`

                : category

                ? `Showing ${category} Products`

                : "Recently Added"

            }

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