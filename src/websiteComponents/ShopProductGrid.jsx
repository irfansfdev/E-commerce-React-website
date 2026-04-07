import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Box,
  Container,
  SimpleGrid,
  Image,
  Text,
  Stack,
  Badge,
  Center,
  Spinner,
  HStack,
  VStack,
  Icon, // Added this back!
} from "@chakra-ui/react";
import { MdShare, MdCompareArrows, MdFavoriteBorder } from "react-icons/md";

const ShopProductGrid = ({ sortType, productsPerPage, category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    // Determine the correct API endpoint
    const url =
      category === "all"
        ? "https://dummyjson.com/products?limit=100"
        : `https://dummyjson.com/products/category/${category}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let sortedData = [...data.products];

        // --- SORTING LOGIC ---
        if (sortType === "price-low") sortedData.sort((a, b) => a.price - b.price);
        if (sortType === "price-high") sortedData.sort((a, b) => b.price - a.price);
        if (sortType === "rating") sortedData.sort((a, b) => b.rating - a.rating);

        setProducts(sortedData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [category, sortType]);

  // Pagination calculations
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  if (loading) {
    return (
      <Center py="100px">
        <Spinner size="xl" color="#B88E2F" />
      </Center>
    );
  }

  return (
    <Container maxW="full" py="40px" px={{ base: "20px", md: "80px" }} bg="white">
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="24px">
        {currentProducts.map((product) => {
          const hasDiscount = product.discountPercentage > 5;
          const priceInRp = (product.price * 1000).toLocaleString("id-ID");
          
          return (
            <Box key={product.id} position="relative" data-group overflow="hidden" bg="#F4F5F7">
              {/* Product Info Area */}
              <Box>
                <Box position="relative" h="280px">
                  <Image src={product.thumbnail} w="full" h="full" objectFit="cover" />
                  <Badge
                    position="absolute"
                    top="15px"
                    right="15px"
                    bg={hasDiscount ? "#E97171" : "#2EC1AC"}
                    color="white"
                    borderRadius="full"
                    boxSize="45px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="11px"
                  >
                    {hasDiscount ? `-${Math.round(product.discountPercentage)}%` : "New"}
                  </Badge>
                </Box>

                <Stack p="15px" spacing={1}>
                  <Text fontSize="20px" fontWeight="600" color="#3A3A3A" noOfLines={1}>
                    {product.title}
                  </Text>
                  <Text fontSize="15px" color="#898989" fontWeight="500">
                    {product.category}
                  </Text>
                  <HStack gap={3}>
                    <Text fontSize="18px" fontWeight="600" color="#3A3A3A">
                      Rp {priceInRp}
                    </Text>
                  </HStack>
                </Stack>
              </Box>

              {/* --- HOVER OVERLAY (The "Furniro" effect) --- */}
              <Box
                position="absolute"
                top="0"
                left="0"
                w="full"
                h="full"
                bg="rgba(58, 58, 58, 0.72)"
                opacity="0"
                _groupHover={{ opacity: 1 }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                transition="0.3s"
                zIndex={2}
              >
                <VStack spacing={4}>
                  <Button
                    as={RouterLink}
                    to={`/product/${product.id}`}
                    bg="white"
                    color="#B88E2F"
                    w="202px"
                    h="48px"
                    borderRadius="0"
                    fontWeight="600"
                    _hover={{ bg: "#B88E2F", color: "white" }}
                  >
                    Add to Cart
                  </Button>
                  
                  <HStack color="white" spacing={5} fontWeight="600" fontSize="14px">
                    <HStack cursor="pointer" spacing={1} _hover={{ color: "#B88E2F" }}>
                      <Icon as={MdShare} />
                      <Text>Share</Text>
                    </HStack>
                    <HStack cursor="pointer" spacing={1} _hover={{ color: "#B88E2F" }}>
                      <Icon as={MdCompareArrows} />
                      <Text>Compare</Text>
                    </HStack>
                    <HStack cursor="pointer" spacing={1} _hover={{ color: "#B88E2F" }}>
                      <Icon as={MdFavoriteBorder} />
                      <Text>Like</Text>
                    </HStack>
                  </HStack>
                </VStack>
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>

      {/* --- PAGINATION --- */}
      <Center mt="60px">
        <HStack spacing={4}>
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              onClick={() => {
                setCurrentPage(i + 1);
                window.scrollTo({ top: 400, behavior: "smooth" });
              }}
              bg={currentPage === i + 1 ? "#B88E2F" : "#F9F1E7"}
              color={currentPage === i + 1 ? "white" : "black"}
              borderRadius="10px"
              w="55px"
              h="55px"
              fontSize="18px"
              _hover={{ bg: "#B88E2F", color: "white" }}
            >
              {i + 1}
            </Button>
          ))}
        </HStack>
      </Center>
    </Container>
  );
};

export default ShopProductGrid;