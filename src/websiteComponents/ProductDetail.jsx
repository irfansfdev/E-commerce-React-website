import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext"; // 1. IMPORT THE USECART HOOK

import {
  Box,
  Flex,
  Image,
  Text,
  Stack,
  Button,
  HStack,
  Center,
  Spinner,
  Grid,
  Circle,
  Heading,
  SimpleGrid,
  Badge,
  Container,
} from "@chakra-ui/react";
import { Star } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // 2. INITIALIZE THE ADD TO CART FUNCTION

  const passedProduct = location.state?.product;

  const [product, setProduct] = useState(passedProduct || null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(!passedProduct);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(passedProduct?.images?.[0] || "");

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        let currentProduct = product;
        if (!currentProduct) {
          const res = await fetch(`https://dummyjson.com/products/${id}`);
          currentProduct = await res.json();
          if (isMounted) {
            setProduct(currentProduct);
            setMainImage(currentProduct.images[0]);
          }
        }

        const relRes = await fetch(
          `https://dummyjson.com/products/category/${currentProduct.category}?limit=5`,
        );
        const relData = await relRes.json();

        if (isMounted) {
          const filtered = relData.products
            .filter((p) => p.id !== parseInt(id))
            .slice(0, 4);
          setRelatedProducts(filtered);
          setLoading(false);
        }
      } catch (error) {
        console.error("Fetch failed:", error);
        if (isMounted) setLoading(false);
      }
    };
    loadData();
    window.scrollTo(0, 0);
    return () => {
      isMounted = false;
    };
  }, [id, product]);

  if (loading && !product)
    return (
      <Center h="60vh">
        <Spinner size="xl" color="#B88E2F" />
      </Center>
    );
  if (!product) return <Center h="60vh">Product not found</Center>;

  const priceInRp = (product.price * 1000).toLocaleString("id-ID");

  return (
    <Box bg="white">
      {/* --- Breadcrumbs --- */}
      <Box bg="#F9F1E7" py="30px" mb="40px">
        <Flex
          maxW="1280px"
          mx="auto"
          px="20px"
          align="center"
          gap={4}
          color="#9F9F9F"
        >
          <Link to="/" style={{ color: "#9F9F9F" }}>Home</Link>
          <Text color="black">{">"}</Text>
          <Link to="/shop" style={{ color: "#9F9F9F" }}>Shop</Link>
          <Text color="black">{">"}</Text>
          <Box h="30px" w="2px" bg="#9F9F9F" mx={2} />
          <Text color="black" fontWeight="500">{product.title}</Text>
        </Flex>
      </Box>

      {/* --- Main Product Section --- */}
      <Flex
        maxW="1280px"
        mx="auto"
        px="20px"
        direction={{ base: "column", md: "row" }}
        gap="60px"
      >
        <Flex gap="30px" flex="1.2">
          <Stack spacing="15px">
            {product.images?.slice(0, 4).map((img, i) => (
              <Box
                key={i}
                bg="#F9F1E7"
                borderRadius="10px"
                p={2}
                cursor="pointer"
                border={mainImage === img ? "1.5px solid #B88E2F" : "none"}
                onClick={() => setMainImage(img)}
              >
                <Image src={img} boxSize="75px" objectFit="contain" />
              </Box>
            ))}
          </Stack>
          <Box
            bg="#F9F1E7"
            borderRadius="10px"
            flex="1"
            p={6}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image src={mainImage} maxH="500px" objectFit="contain" />
          </Box>
        </Flex>

        <Stack flex="1" spacing={5}>
          <Text fontSize="42px" fontWeight="400" color="black">{product.title}</Text>
          <Text fontSize="24px" color="#9F9F9F" fontWeight="500">Rp {priceInRp}</Text>

          <HStack spacing={4}>
            <HStack color="#FFC700">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                />
              ))}
            </HStack>
            <Box h="20px" w="1px" bg="#9F9F9F" />
            <Text color="#9F9F9F" fontSize="13px">5 Customer Reviews</Text>
          </HStack>

          <Text fontSize="13px" maxW="420px" color="black" lineHeight="1.6">
            {product.description}
          </Text>

          <Box>
            <Text color="#9F9F9F" fontSize="14px" mb={3}>Size</Text>
            <HStack spacing={3}>
              {["L", "XL", "XS"].map((s) => (
                <Button
                  key={s}
                  bg={s === "L" ? "#B88E2F" : "#F9F1E7"}
                  color={s === "L" ? "white" : "black"}
                  borderRadius="5px"
                  w="35px"
                  h="35px"
                  fontSize="13px"
                >
                  {s}
                </Button>
              ))}
            </HStack>
          </Box>

          <Box>
            <Text color="#9F9F9F" fontSize="14px" mb={3}>Color</Text>
            <HStack spacing={3}>
              <Circle size="30px" bg="#816DFA" cursor="pointer" />
              <Circle size="30px" bg="#000000" cursor="pointer" />
              <Circle size="30px" bg="#B88E2F" cursor="pointer" />
            </HStack>
          </Box>

          <HStack spacing={4} pt={4}>
            <HStack
              border="1px solid #9F9F9F"
              borderRadius="10px"
              px={4}
              h="60px"
              w="120px"
              justify="space-between"
            >
              <Text
                cursor="pointer"
                color="black"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Text>
              <Text fontWeight="500" color="black">{quantity}</Text>
              <Text
                cursor="pointer"
                color="black"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Text>
            </HStack>

            {/* 3. UPDATED BUTTON: SENDS DATA THEN NAVIGATES */}
            <Button
              variant="outline"
              border="1px solid black"
              borderRadius="15px"
              px="48px"
              h="60px"
              color="black"
              _hover={{ bg: "black", color: "white" }}
              onClick={() => {
                addToCart(product, quantity); // Send real data to context
                navigate("/cart"); // Then go to cart page
              }}
            >
              Add To Cart
            </Button>

            <Button
              variant="outline"
              border="1px solid black"
              borderRadius="15px"
              px="48px"
              h="60px"
              color="black"
              _hover={{ bg: "black", color: "white" }}
            >
              + Compare
            </Button>
          </HStack>

          <Box h="1px" bg="#D9D9D9" my={8} w="full" />

          <Grid templateColumns="100px 1fr" gap={3} fontSize="16px" color="#9F9F9F">
            <Text>SKU</Text> <Text>: {product.sku || "SS001"}</Text>
            <Text>Category</Text> <Text>: {product.category}</Text>
            <Text>Tags</Text> <Text>: {product.tags?.join(", ")}</Text>
            <Text>Share</Text>
            <HStack color="black" spacing={5}>
              {/* Facebook Icon */}
              <Box as="svg" width="20px" height="20px" viewBox="0 0 24 24" fill="currentColor" cursor="pointer">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </Box>
              {/* LinkedIn Icon */}
              <Box as="svg" width="20px" height="20px" viewBox="0 0 24 24" fill="currentColor" cursor="pointer">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" />
              </Box>
              {/* Twitter Icon */}
              <Box as="svg" width="20px" height="20px" viewBox="0 0 24 24" fill="currentColor" cursor="pointer">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </Box>
            </HStack>
          </Grid>
        </Stack>
      </Flex>

      {/* --- Description & Photos --- */}
      <Box borderTop="1px solid #D9D9D9" mt="100px" pt="50px">
        <Center gap="50px" mb="40px" fontSize="24px">
          <Text fontWeight="600" color="black" borderBottom="2px solid black" pb={1} cursor="pointer">
            Description
          </Text>
          <Text color="#9F9F9F" cursor="pointer">Additional Information</Text>
          <Text color="#9F9F9F" cursor="pointer">Reviews [5]</Text>
        </Center>
        <Stack spacing={8} maxW="1024px" mx="auto" color="#9F9F9F" px="20px" mb="60px" textAlign="center">
          <Text>{product.description}</Text>
        </Stack>
        <Flex maxW="1230px" mx="auto" px="20px" gap="30px" direction={{ base: "column", md: "row" }}>
          <Box bg="#F9F1E7" borderRadius="10px" flex="1">
            <Image src={product.images?.[1] || product.images?.[0]} w="full" h="350px" objectFit="cover" />
          </Box>
          <Box bg="#F9F1E7" borderRadius="10px" flex="1">
            <Image src={product.images?.[2] || product.images?.[0]} w="full" h="350px" objectFit="cover" />
          </Box>
        </Flex>
      </Box>

      {/* --- Related Products Section --- */}
      <Box mt="100px" pb="100px" borderTop="1px solid #D9D9D9" pt="60px">
        <Container maxW="1280px">
          <Heading textAlign="center" mb="40px" fontSize="36px" fontWeight="700" color="black">
            Related Products
          </Heading>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="32px">
            {relatedProducts.map((rel) => {
              const relPrice = (rel.price * 1000).toLocaleString("id-ID");
              return (
                <Link key={rel.id} to={`/product/${rel.id}`} state={{ product: rel }} style={{ textDecoration: "none" }}>
                  <Box bg="#F4F5F7" position="relative" transition="0.3s" _hover={{ transform: "translateY(-5px)" }}>
                    <Box position="relative" h="300px" overflow="hidden">
                      <Image src={rel.images?.[0]} w="full" h="full" objectFit="cover" />
                    </Box>
                    <Stack p="16px" spacing={2} minH="130px">
                      <Heading fontSize="20px" fontWeight="600" color="#3A3A3A" noOfLines={1}>{rel.title}</Heading>
                      <Text color="#898989" fontSize="14px" fontWeight="500">{rel.category}</Text>
                      <Text fontSize="18px" fontWeight="600" color="#3A3A3A">Rp {relPrice}</Text>
                    </Stack>
                  </Box>
                </Link>
              );
            })}
          </SimpleGrid>
          <Center mt="60px">
            <Button variant="outline" border="1px solid #B88E2F" color="#B88E2F" w="245px" h="48px" fontWeight="600" as={Link} to="/shop">
              Show More
            </Button>
          </Center>
        </Container>
      </Box>
    </Box>
  );
};

export default ProductDetail;