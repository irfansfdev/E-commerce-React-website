import React, { useState, useEffect } from "react";
import ShopHero from "../websiteComponents/ShopHero";
import ShopFilterBar from "../websiteComponents/ShopFilterBar";
import ShopProductGrid from "../websiteComponents/ShopProductGrid";
import FeatureBar from "../websiteComponents/FeatureBar";

const Shop = () => {
  const [sortType, setSortType] = useState("default");
  const [productsPerPage, setProductsPerPage] = useState(16);
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        const furnitureCats = data.filter(cat => 
          ["furniture", "home-decoration", "kitchen-accessories"].includes(cat.slug)
        );
        setCategories(furnitureCats.length > 0 ? furnitureCats : data.slice(0, 10));
      });
  }, []);

  return (
    <>
      <ShopHero />
      
      <ShopFilterBar 
        totalResults={100} 
        productsPerPage={productsPerPage} 
        setProductsPerPage={setProductsPerPage}
        setSortType={setSortType}
        setCategory={setCategory}
        categories={categories}
      />

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