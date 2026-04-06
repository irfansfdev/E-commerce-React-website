import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "@/components/ui/provider";

// Import your PAGE containers
import Home from "./pages/Home.jsx";
import Shop from "../src/Pages/Shop.jsx"; 
import Cart from "./pages/Cart.jsx"; // 1. IMPORT YOUR CART PAGE HERE

// Import components that stay on EVERY page
import Navbar from "./websiteComponents/navbar.jsx";
import Footer from "./websiteComponents/Footer.jsx";
import ProductDetail from "./websiteComponents/ProductDetail.jsx";
import ContactInfo from "./websiteComponents/ContactInfo.jsx"

function App() {
  return (
    <Provider>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          
          {/* 2. ADD THE CART ROUTE HERE */}
          <Route path="/cart" element={<Cart />} />
          
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<ContactInfo />} />
        </Routes>
        
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;