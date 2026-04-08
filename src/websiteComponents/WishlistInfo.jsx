import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { toggleWishlist, addToCart } from "../redux/cartSlice";
import {
  Box, Container, Heading, SimpleGrid, Image, Text, 
  Button, Stack, Center, HStack, IconButton
} from "@chakra-ui/react";
import { MdDeleteOutline, MdOutlineShoppingCart } from "react-icons/md";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.cart.wishlist);
  const dispatch = useDispatch();

  const handleRemove = (product) => {
    dispatch(toggleWishlist(product));
  };

  const handleMoveToCart = (product) => {
    dispatch(addToCart({
      ...product,
      quantity: 1,               
      selectedSize: "L",         
      selectedColor: "Golden",    
      updateQuantity: false      
    }));

    dispatch(toggleWishlist(product)); // Remove from wishlist after adding
  };

  if (wishlist.length === 0) {
    return (
      <Center h="60vh" flexDirection="column" gap={4}>
        <Heading fontWeight="500" color="black">Your Wishlist is Empty</Heading>
        <Text color="gray.500">Add some items that you like!</Text>
        <Button as={RouterLink} to="/shop" bg="#B88E2F" color="white" px={10} _hover={{ bg: "#9A7727" }}>
          Go to Shop
        </Button>
      </Center>
    );
  }

  return (
    <Box pb="100px" bg="white">
      {/* Header Banner */}
      <Box bg="#F9F1E7" py="60px" textAlign="center" mb="50px">
        <Heading fontSize="48px" fontWeight="500" color="black">Wishlist</Heading>
        <HStack justify="center" mt={2} color="black">
          <Box as={RouterLink} to="/" fontWeight="500">Home</Box>
          <Text>&gt;</Text>
          <Text fontWeight="300">Wishlist</Text>
        </HStack>
      </Box>

      <Container maxW="1280px">
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="32px">
          {wishlist.map((product) => (
            <Box 
              key={product.id} 
              bg="#F4F5F7" 
              borderRadius="8px" 
              overflow="hidden" 
              transition="0.3s" 
              _hover={{ transform: "translateY(-5px)", boxShadow: "sm" }}
            >
              <Box position="relative">
                <Image 
                  src={product.images?.[0] || product.thumbnail} 
                  h="250px" 
                  w="full" 
                  objectFit="cover" 
                />
                <IconButton
                  aria-label="Remove from wishlist"
                  position="absolute"
                  top="10px"
                  right="10px"
                  bg="white"
                  color="red.500"
                  borderRadius="full"
                  _hover={{ bg: "red.50" }}
                  onClick={() => handleRemove(product)}
                >
                  <MdDeleteOutline size="20px" />
                </IconButton>
              </Box>

              <Stack p={4} spacing={3}>
                <Box>
                  <Heading fontSize="18px" noOfLines={1} color="black">
                    {product.title}
                  </Heading>
                  <Text color="#898989" fontSize="14px">
                    {product.category}
                  </Text>
                </Box>
                
                <Text fontWeight="600" fontSize="18px" color="#B88E2F">
                   Rs. {(product.price * 1000).toLocaleString("id-ID")}.00
                </Text>

                <Button 
                  leftIcon={<MdOutlineShoppingCart />} 
                  bg="#B88E2F" 
                  color="white" 
                  size="md"
                  w="full"
                  onClick={() => handleMoveToCart(product)}
                  _hover={{ bg: "#9A7727" }}
                >
                  Add to Cart
                </Button>
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Wishlist;