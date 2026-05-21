import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import TrendingBanner from "../components/TrendingBanner";
import FilterBar from "../components/FilterBar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import CategorySection from "../components/CategorySection";

export default function Home() {

  const [products, setProducts] =
    useState([]);

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
            "http://localhost:5000/api/products"
          );

        setProducts(response.data);

      } catch (error) {

        console.log(error);

      }
    };

  let filteredProducts =
    products.filter((product) => {

      const matchesSearch =
        product.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        category === ""
        || product.category === category;

      const matchesCollege =
        product.college
          ?.toLowerCase()
          .includes(
            college.toLowerCase()
          );

      const matchesCondition =
        condition === ""
        || product.condition === condition;

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

      <Hero />
      
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

      <section className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-4xl font-bold text-gray-800 mb-10">
          Recently Added
        </h2>

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

      </section>

      <Footer />

    </div>
  );
}