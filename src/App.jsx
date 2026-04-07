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
import Contact from "./pages/Contact";
import Wishlist from "./Pages/Wishlist.jsx";
import Checkout from "./pages/Checkout";
import OrderSummaryPage from "./pages/OrderSummaryPage";

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
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-summary" element={<OrderSummaryPage />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;