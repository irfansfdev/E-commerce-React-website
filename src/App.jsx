import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";

import Home from "./pages/Home.jsx";
import Shop from "./Pages/Shop.jsx"; 
import Cart from "./pages/Cart.jsx";
import Navbar from "./websiteComponents/navbar.jsx";
import Footer from "./websiteComponents/Footer.jsx";
import ProductDetail from "./websiteComponents/ProductDetail.jsx";
import ContactInfo from "./websiteComponents/ContactInfo.jsx";
import Wishlist from "./Pages/Wishlist.jsx";

function App() {
  return (
    <Provider>
      <Toaster /> 
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<ContactInfo />} />
          <Route path="*" element={<Home />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;