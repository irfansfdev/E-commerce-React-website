import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, toggleWishlist } from "../redux/cartSlice";

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
  Container,
} from "@chakra-ui/react";

import { toaster } from "@/components/ui/toaster";
import { Star } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.cart.wishlist);

  const [product, setProduct] = useState(state?.product || null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedSize, setSelectedSize] = useState("L");
  const [selectedColor, setSelectedColor] = useState("#B88E2F");

  const isWished = wishlist.some((item) => item.id === product?.id);

  useEffect(() => {
    const loadProductData = async () => {
      setLoading(true);
      try {
        let currentProd = state?.product;
        if (!currentProd) {
          const res = await fetch(`https://dummyjson.com/products/${id}`);
          currentProd = await res.json();
          setProduct(currentProd);
        } else {
          setProduct(currentProd);
        }
        setMainImage(currentProd.images[0]);

        const relRes = await fetch(
          `https://dummyjson.com/products/category/${currentProd.category}`,
        );
        const relData = await relRes.json();
        setRelated(
          relData.products.filter((p) => p.id !== parseInt(id)).slice(0, 4),
        );
      } catch (e) {
        console.error("Error fetching data:", e);
      } finally {
        setLoading(false);
      }
    };
    loadProductData();
    window.scrollTo(0, 0);
  }, [id, state?.product]);

  if (loading)
    return (
      <Center h="60vh">
        <Spinner size="xl" color="#B88E2F" />
      </Center>
    );
  if (!product) return <Center h="60vh">Product not found</Center>;

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, selectedSize, selectedColor, quantity }));
    toaster.create({
      title: "Added to Cart",
      description: `${product.title} added successfully.`,
      type: "success",
    });
    navigate("/cart");
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist(product));
    toaster.create({
      title: isWished ? "Removed from Wishlist" : "Added to Wishlist",
      type: "info",
    });
  };

  const StarRating = ({ rating }) => (
    <HStack color="#FFC700" spacing={1}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={18}
          fill={i < Math.floor(rating) ? "currentColor" : "none"}
        />
      ))}
    </HStack>
  );

  return (
    <Box bg="white" color="black" pb="100px">
      {/* 1. BREADCRUMBS */}
      <Box bg="#F9F1E7" py="30px" mb="40px">
        <Container maxW="1280px">
          <HStack color="#9F9F9F" fontSize={{ base: "14px", md: "16px" }}>
            <Link to="/">Home</Link>
            <Text color="black">&gt;</Text>
            <Link to="/shop">Shop</Link>
            <Text color="black">&gt;</Text>
            <Box h="30px" w="2px" bg="#9F9F9F" mx={2} />
            <Text color="black" fontWeight="500">
              {product.title}
            </Text>
          </HStack>
        </Container>
      </Box>

      {/* 2. MAIN PRODUCT SECTION */}
      <Flex
        maxW="1280px"
        mx="auto"
        px="20px"
        direction={{ base: "column", lg: "row" }}
        gap="60px"
      >
        {/* Gallery */}
        <Flex
          gap="30px"
          flex="1.2"
          direction={{ base: "column-reverse", md: "row" }}
        >
          <Stack
            spacing="15px"
            direction={{ base: "row", md: "column" }}
            overflowX="auto"
          >
            {product.images?.slice(0, 4).map((img, i) => (
              <Box
                key={i}
                bg="#F9F1E7"
                p={2}
                borderRadius="10px"
                cursor="pointer"
                border={mainImage === img ? "1.5px solid #B88E2F" : "none"}
                onClick={() => setMainImage(img)}
              >
                <Image src={img} boxSize="75px" objectFit="contain" />
              </Box>
            ))}
          </Stack>
          <Center
            bg="#F9F1E7"
            borderRadius="10px"
            flex="1"
            p={6}
            h={{ base: "350px", md: "500px" }}
          >
            <Image src={mainImage} maxH="100%" objectFit="contain" />
          </Center>
        </Flex>

        {/* Info */}
        <Stack flex="1" spacing={5}>
          <Heading fontWeight="400" fontSize={{ base: "32px", md: "42px" }}>
            {product.title}
          </Heading>
          <Text fontSize="24px" color="#9F9F9F" fontWeight="500">
            Rp {(product.price * 15000).toLocaleString("id-ID")}
          </Text>
          <HStack spacing={4}>
            <StarRating rating={product.rating} />
            <Box h="20px" w="1px" bg="#9F9F9F" />
            <Text color="#9F9F9F" fontSize="13px">
              {product.reviews?.length} Customer Reviews
            </Text>
          </HStack>
          <Text fontSize="13px" maxW="420px" lineHeight="1.6" color="black">
            {product.description}
          </Text>

          <Box pt={4}>
            <Text color="#9F9F9F" fontSize="14px" mb={3}>
              Size
            </Text>
            <HStack>
              {["L", "XL", "XS"].map((s) => (
                <Button
                  key={s}
                  w="40px"
                  h="40px"
                  bg={selectedSize === s ? "#B88E2F" : "#F9F1E7"}
                  color={selectedSize === s ? "white" : "black"}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </Button>
              ))}
            </HStack>
          </Box>

          <Box pt={4}>
            <Text color="#9F9F9F" fontSize="14px" mb={3}>
              Color
            </Text>
            <HStack spacing={3}>
              {["#816DFA", "#000000", "#B88E2F"].map((c) => (
                <Circle
                  key={c}
                  size="30px"
                  bg={c}
                  cursor="pointer"
                  border={selectedColor === c ? "2px solid black" : "none"}
                  onClick={() => setSelectedColor(c)}
                />
              ))}
            </HStack>
          </Box>

          {/* Action Buttons Section */}
          <Flex
            gap={4}
            pt={6}
            direction={{ base: "column", sm: "row" }}
            w="100%"
            align="stretch"
          >
            {/* 1. Quantity Selector - Stays compact */}
            <HStack
              border="1px solid #9F9F9F"
              borderRadius="10px"
              px={4}
              h="60px"
              w={{ base: "100%", sm: "120px" }}
              justify="space-between"
              flexShrink={0}
            >
              <Text
                cursor="pointer"
                fontSize="24px"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Text>
              <Text fontWeight="600" fontSize="18px">
                {quantity}
              </Text>
              <Text
                cursor="pointer"
                fontSize="24px"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Text>
            </HStack>

            {/* 2. Add To Cart - The PRIMARY button (Takes more space) */}
            <Button
              variant="outline"
              color="black"
              border="1px solid black"
              borderRadius="15px"
              h="60px"
              fontSize="18px"
              flex={{ base: "none", sm: "2" }} // Takes double the space of compare on desktop
              width="100%"
              _hover={{ bg: "black", color: "white" }}
              onClick={handleAddToCart}
            >
              Add To Cart
            </Button>

            {/* 3. Compare/Wishlist - The SECONDARY button (More compact) */}
            <Button
              variant="outline"
              color="black"
              border="1px solid black"
              borderRadius="15px"
              h="60px"
              fontSize="18px"
              flex={{ base: "none", sm: "1" }} // Smaller width than Add to Cart
              width="100%"
              _hover={{ bg: "black", color: "white" }}
              onClick={handleWishlist}
            >
              {isWished ? "❤️ Wishlisted" : "Wishlist"}
            </Button>
          </Flex>

          <Box h="1px" bg="#D9D9D9" my={8} />

          {/* RESTORED: Metadata & Social Icons */}
          <Grid
            templateColumns="100px 1fr"
            gap={3}
            color="#9F9F9F"
            fontSize="16px"
          >
            <Text>SKU</Text>
            <Text>: {product.sku || "SS001"}</Text>
            <Text>Category</Text>
            <Text>: {product.category}</Text>
            <Text>Tags</Text>
            <Text>: {product.tags?.join(", ") || "Furniture"}</Text>
            <Text>Share</Text>
            <HStack color="black" spacing={4}>
              <Text>:</Text>
              <HStack spacing={5}>
                <Box
                  as="svg"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  cursor="pointer"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </Box>
                <Box
                  as="svg"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  cursor="pointer"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </Box>
                <Box
                  as="svg"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  cursor="pointer"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </Box>
              </HStack>
            </HStack>
          </Grid>
        </Stack>
      </Flex>

      {/* 3. TABS SECTION */}
      <Box borderTop="1px solid #D9D9D9" mt="80px" pt="40px">
        <Center gap={{ base: "20px", md: "50px" }} mb="40px" flexWrap="wrap">
          {["description", "additional information", "reviews"].map((t) => (
            <Text
              key={t}
              cursor="pointer"
              fontSize={{ base: "18px", md: "24px" }}
              fontWeight={activeTab === t ? "600" : "400"}
              color={activeTab === t ? "black" : "#9F9F9F"}
              borderBottom={activeTab === t ? "2px solid black" : "none"}
              textTransform="capitalize"
              pb={2}
              onClick={() => setActiveTab(t)}
            >
              {t} {t === "reviews" ? `[${product.reviews?.length || 0}]` : ""}
            </Text>
          ))}
        </Center>
        <Container maxW="1024px" pb="60px">
          {activeTab === "description" && (
            <Stack textAlign="center" spacing={8}>
              <Text color="#9F9F9F" lineHeight="1.6">
                {product.description}
              </Text>
              <Flex gap="30px" direction={{ base: "column", md: "row" }}>
                <Image
                  src={product.images[1] || product.images[0]}
                  flex="1"
                  h="350px"
                  objectFit="cover"
                  borderRadius="10px"
                  bg="#F9F1E7"
                />
                <Image
                  src={product.images[2] || product.images[0]}
                  flex="1"
                  h="350px"
                  objectFit="cover"
                  borderRadius="10px"
                  bg="#F9F1E7"
                />
              </Flex>
            </Stack>
          )}
          {activeTab === "additional information" && (
            <Stack
              spacing={4}
              color="#9F9F9F"
              fontSize="16px"
              maxW="600px"
              mx="auto"
            >
              <Flex
                justify="space-between"
                borderBottom="1px solid #F9F1E7"
                py={2}
              >
                <Text fontWeight="600" color="black">
                  Weight
                </Text>
                <Text>{product.weight}g</Text>
              </Flex>
              <Flex
                justify="space-between"
                borderBottom="1px solid #F9F1E7"
                py={2}
              >
                <Text fontWeight="600" color="black">
                  Dimensions
                </Text>
                <Text>
                  {product.dimensions?.width}x{product.dimensions?.height}x
                  {product.dimensions?.depth}cm
                </Text>
              </Flex>
              <Flex
                justify="space-between"
                borderBottom="1px solid #F9F1E7"
                py={2}
              >
                <Text fontWeight="600" color="black">
                  Warranty
                </Text>
                <Text>{product.warrantyInformation}</Text>
              </Flex>
            </Stack>
          )}
          {activeTab === "reviews" && (
            <Stack spacing={4}>
              {product.reviews?.map((r, i) => (
                <Box key={i} p={6} bg="#F9F1E7" borderRadius="10px">
                  <Flex justify="space-between">
                    <Text fontWeight="600">{r.reviewerName}</Text>
                    <StarRating rating={r.rating} />
                  </Flex>
                  <Text color="#3A3A3A" mt={2}>
                    {r.comment}
                  </Text>
                </Box>
              ))}
            </Stack>
          )}
        </Container>
      </Box>

      {/* 4. RESTORED: RELATED PRODUCTS SECTION */}
      <Box mt="40px" pb="80px" pt="40px" borderTop="1px solid #D9D9D9">
        <Container maxW="1280px">
          <Heading textAlign="center" mb="40px" fontSize="36px">
            Related Products
          </Heading>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap="32px">
            {related.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} state={{ product: p }}>
                <Box
                  bg="#F4F5F7"
                  _hover={{ transform: "translateY(-5px)" }}
                  transition="0.3s"
                >
                  <Image
                    src={p.images[0]}
                    h="300px"
                    w="full"
                    objectFit="cover"
                  />
                  <Stack p={4} spacing={2}>
                    <Heading fontSize="20px" noOfLines={1}>
                      {p.title}
                    </Heading>
                    <Text color="#898989" fontSize="14px">
                      {p.category}
                    </Text>
                    <Text fontWeight="600" fontSize="18px">
                      Rp {(p.price * 15000).toLocaleString("id-ID")}
                    </Text>
                  </Stack>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
};

export default ProductDetail;
