import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddProduct from "./pages/AddProduct";
import Profile from "./pages/Profile";
import MyListings from "./pages/MyListings";
// import Wishlist from "./pages/Wishlist";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/add-product"
          element={<AddProduct />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/my-listings"
          element={<MyListings />}
        />

        {/* <Route
          path="/wishlist"
          element={<Wishlist />}
        /> */}

        <Route
          path="/edit-product/:id"
          element={<EditProduct />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;