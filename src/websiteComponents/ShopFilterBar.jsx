import React from "react";
import {
  Box,
  Container,
  Flex,
  HStack,
  Text,
} from "@chakra-ui/react";
import { MdOutlineFilterList } from "react-icons/md";
import { BsGridFill, BsList } from "react-icons/bs";

const ShopFilterBar = ({
  totalResults = 0,
  productsPerPage = 16,
  setProductsPerPage,
  setSortType,
  setCategory,
  categories = [],
}) => {
  
  const selectStyle = {
    backgroundColor: "white",
    height: "55px",
    padding: "0 10px",
    fontSize: "16px",
    color: "#727272",
    border: "none",
    outline: "none",
    cursor: "pointer",
    borderRadius: "0",
    appearance: "none",
    WebkitAppearance: "none",
  };

  return (
    <Box bg="#F9F1E7" py={{ base: "20px", md: "15px" }} w="100%" overflow="hidden">
      <Container maxW="1280px" px={{ base: "10px", md: "20px" }}>
        <Flex
          justify="space-between"
          align="center"
          // Stacks the two groups on mobile, keeps them side-by-side on desktop
          direction={{ base: "column", lg: "row" }}
          gap={6}
        >
          
          {/* LEFT GROUP: Filter, Icons, Category, Results */}
          <Flex 
            align="center" 
            gap={{ base: 3, md: 6 }} 
            justify={{ base: "center", lg: "flex-start" }}
            w={{ base: "100%", lg: "auto" }}
            wrap="wrap"
          >
            <HStack spacing={{ base: 3, md: 5 }}>
              <HStack cursor="pointer" color="black">
                <MdOutlineFilterList size="24px" />
                <Text fontSize={{ base: "16px", md: "20px" }}>Filter</Text>
              </HStack>
              <HStack spacing={4} color="black" display={{ base: "none", sm: "flex" }}>
                <BsGridFill size="18px" />
                <BsList size="22px" />
              </HStack>
            </HStack>

            <Box h="30px" w="2px" bg="#9F9F9F" display={{ base: "none", sm: "block" }} />

            <select 
              style={{ ...selectStyle, width: "130px", fontWeight: "500" }}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All Category</option>
              {categories?.map((cat) => (
                <option key={cat.slug || cat} value={cat.slug || cat}>
                  {cat.name || cat}
                </option>
              ))}
            </select>

            <Box h="30px" w="2px" bg="#9F9F9F" display={{ base: "none", md: "block" }} />

            <Text fontSize={{ base: "14px", md: "16px" }} color="black" whiteSpace="nowrap">
              Showing 1–{Math.min(productsPerPage, totalResults)} of {totalResults} results
            </Text>
          </Flex>

          {/* RIGHT GROUP: Show and Sort */}
          <Flex 
            gap={{ base: 4, md: 6 }} 
            align="center" 
            justify="center"
            w={{ base: "100%", lg: "auto" }}
          >
            <HStack spacing={3}>
              <Text fontSize={{ base: "16px", md: "18px" }} color="black">Show</Text>
              <select 
                style={{ ...selectStyle, width: "55px", textAlign: "center" }}
                value={productsPerPage}
                onChange={(e) => setProductsPerPage(Number(e.target.value))}
              >
                <option value={8}>8</option>
                <option value={16}>16</option>
                <option value={32}>32</option>
              </select>
            </HStack>

            <HStack spacing={3}>
              <Text fontSize={{ base: "16px", md: "18px" }} color="black" whiteSpace="nowrap">Sort by</Text>
              <select 
                style={{ ...selectStyle, width: "140px" }}
                onChange={(e) => setSortType(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                {/* RESTORED: Sorting by Rating/Reviews */}
                <option value="rating">Best Rating</option>
              </select>
            </HStack>
          </Flex>

        </Flex>
      </Container>
    </Box>
  );
};

export default ShopFilterBar;