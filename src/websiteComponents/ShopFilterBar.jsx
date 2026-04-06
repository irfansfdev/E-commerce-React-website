import React from "react";
import {
  Box,
  Container,
  Flex,
  HStack,
  Text,
  Icon,
} from "@chakra-ui/react";
import {
  MdOutlineFilterList,
} from "react-icons/md";

const ShopFilterBar = ({
  totalResults,
  productsPerPage,
  setProductsPerPage,
  setSortType,
  setCategory,
  categories,
}) => {
  return (
    <Box bg="#F9F1E7" py="25px" w="100%">
      <Container maxW="1280px">
        <Flex
          justify="space-between"
          align="center"
          direction={{ base: "column", md: "row" }}
          gap={6}
        >
          <HStack spacing={6}>
            <HStack cursor="pointer">
              <Icon as={MdOutlineFilterList} boxSize={6} color="black" />
              <Text fontSize="20px" fontWeight="500" color="black">
                Filter
              </Text>
            </HStack>

            {/* --- NATIVE SELECT FOR CATEGORY --- */}
            <select
              style={{
                background: "#B88E2F",
                fontWeight: "500",
                fontSize: "16px",
                border: "none",
                outline: "none",
                cursor: "pointer",
                height: "45px",
                width: "170px",
              }}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories && categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>

            <Box h="30px" w="2px" bg="#9F9F9F" mx={4} />
            <Text fontSize="16px" color="black">
              Showing 1–{productsPerPage} of {totalResults} results
            </Text>
          </HStack>

          <HStack spacing={6}>
            <HStack>
              <Text fontSize="20px" color="black">Show</Text>
              {/* --- NATIVE SELECT FOR SHOW --- */}
              <select
                style={{
                  background: "#B88E2F",
                  height: "45px",
                  width: "70px",
                  textAlign: "center",
                  border: "none"
                }}
                value={productsPerPage}
                onChange={(e) => setProductsPerPage(Number(e.target.value))}
              >
                <option value={8}>8</option>
                <option value={16}>16</option>
                <option value={32}>32</option>
              </select>
            </HStack>

            <HStack>
              <Text fontSize="20px" color="black">Sort by</Text>
              {/* --- NATIVE SELECT FOR SORT --- */}
              <select
                style={{
                  background: "#B88E2F",
                  height: "45px",
                  width: "150px",
                  padding: "0 10px",
                  border: "none"
                }}
                onChange={(e) => setSortType(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Best Rating</option>
              </select>
            </HStack>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default ShopFilterBar;