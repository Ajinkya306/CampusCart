import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";

const products = [
  {
    title: "Arduino Uno",
    price: 1200,
    city: "Pune",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
  {
    title: "Study Table",
    price: 2500,
    city: "Pimpri",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },
  {
    title: "Cooler",
    price: 3000,
    city: "Wakad",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156",
  },
];

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-10">
          Recently Added
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}