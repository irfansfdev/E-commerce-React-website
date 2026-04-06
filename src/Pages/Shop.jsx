import React, { useState, useEffect } from "react";
import ShopHero from "../websiteComponents/ShopHero";
import ShopFilterBar from "../websiteComponents/ShopFilterBar";
import ShopProductGrid from "../websiteComponents/ShopProductGrid";
import FeatureBar from "../websiteComponents/FeatureBar";

const Shop = () => {
  // --- The "Brain" States ---
  const [sortType, setSortType] = useState("default");
  const [productsPerPage, setProductsPerPage] = useState(16);
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  // Fetch real categories from the API to show in the FilterBar dropdown
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        // We only want furniture-related categories if possible
        const furnitureCats = data.filter(cat => 
          ["furniture", "home-decoration", "kitchen-accessories"].includes(cat.slug)
        );
        // If the filter is too strict, just take the first 10
        setCategories(furnitureCats.length > 0 ? furnitureCats : data.slice(0, 10));
      });
  }, []);

  return (
    <>
      <ShopHero />
      
      {/* Passing states to FilterBar so it can CHANGE them */}
      <ShopFilterBar 
        totalResults={100} 
        productsPerPage={productsPerPage} 
        setProductsPerPage={setProductsPerPage}
        setSortType={setSortType}
        setCategory={setCategory}
        categories={categories}
      />

      {/* Passing states to Grid so it can SHOW the filtered/sorted results */}
      <ShopProductGrid 
        sortType={sortType} 
        productsPerPage={productsPerPage} 
        category={category} 
      />

      <FeatureBar />
    </>
  );
};

export default Shop;