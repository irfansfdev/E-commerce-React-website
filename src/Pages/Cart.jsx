import React from "react";
import {
  Box, Container, Flex, Image, Text, Button, Heading,
  HStack, VStack, Icon, Center, Circle
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { ChevronRight } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "../redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // SAFETY: Use Number() and default to 0 to prevent NaN
  const subtotal = cartItems.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 0;
    return acc + (price * qty);
  }, 0);

  const handleUpdateQty = (item, delta) => {
    const currentQty = Number(item.quantity) || 1;
    const newQty = currentQty + delta;
    
    if (newQty >= 1) {
      dispatch(addToCart({
        ...item,
        quantity: newQty,
        updateQuantity: true,
      }));
    }
  };

  return (
    <Box bg="white" minH="100vh">
      {/* Banner */}
      <Box w="100%" h="316px" bgImage="url('/src/assets/Rectangle.png')" bgSize="cover" bgPosition="center" position="relative" display="flex" alignItems="center" justifyContent="center">
        <Box position="absolute" top="0" left="0" w="100%" h="100%"   />
        <VStack spacing={2} zIndex={1}>
          <Heading fontSize="48px" fontWeight="600" color="black">Cart</Heading>
          <HStack spacing="10px" color="black">
            <Box as={RouterLink} to="/" fontWeight="600">Home</Box>
            <Icon as={ChevronRight} boxSize="18px" />
            <Text fontWeight="300">Cart</Text>
          </HStack>
        </VStack>
      </Box>

      <Container maxW="1280px" py="72px">
        {cartItems.length === 0 ? (
          <Center py="100px" flexDirection="column">
            <Heading color="black" mb={4}>Your cart is empty</Heading>
            <Button as={RouterLink} to="/shop" bg="#B88E2F" color="white" _hover={{ bg: "#967328" }}>
              Return to Shop
            </Button>
          </Center>
        ) : (
          <Flex direction={{ base: "column", lg: "row" }} gap="30px" align="start">
            <Box flex="2" w="100%">
              {/* Header */}
              <Flex bg="#F9F1E7" h="55px" align="center" px="20px" fontWeight="500" color="black" display={{ base: "none", md: "flex" }}>
                <Text flex="3">Product</Text>
                <Text flex="1" textAlign="center">Price</Text>
                <Text flex="1" textAlign="center">Quantity</Text>
                <Text flex="1" textAlign="center">Subtotal</Text>
                <Box w="40px" />
              </Flex>

              {cartItems.map((item) => (
                <Flex key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} align="center" p="20px" borderBottom="1px solid #eee" direction={{ base: "column", md: "row" }}>
                  <HStack flex="3" spacing="30px" w="100%">
                    <Center boxSize="100px" bg="#F9F1E7" borderRadius="10px">
                      <Image src={item.images?.[0] || item.thumbnail} maxH="80px" objectFit="contain" />
                    </Center>
                    <VStack align="start" spacing={1}>
                      <Text color="#9F9F9F" fontWeight="500">{item.title}</Text>
                      <HStack fontSize="12px">
                        <Text color="#9F9F9F">Size: {item.selectedSize || 'N/A'}</Text>
                        <Circle size="12px" bg={item.selectedColor || 'black'} border="1px solid #ddd" />
                      </HStack>
                    </VStack>
                  </HStack>

                  <Text flex="1" textAlign="center" color="#9F9F9F">
                    Rs. {(Number(item.price) * 1000).toLocaleString()}
                  </Text>

                  {/* Quantity Buttons */}
                  <HStack flex="1" justify="center">
                    <HStack border="1px solid #9F9F9F" borderRadius="5px" px={3} h="35px" bg="white">
                      <Text cursor="pointer" color="black" fontWeight="bold" onClick={() => handleUpdateQty(item, -1)}>-</Text>
                      <Text color="black" fontWeight="600" minW="20px" textAlign="center">{item.quantity}</Text>
                      <Text cursor="pointer" color="black" fontWeight="bold" onClick={() => handleUpdateQty(item, 1)}>+</Text>
                    </HStack>
                  </HStack>

                  <Text flex="1" textAlign="center" color="black" fontWeight="500">
                    Rs. {(Number(item.price) * 1000 * item.quantity).toLocaleString()}
                  </Text>

                  <Box w="40px" textAlign="right">
                    <Icon as={MdDelete} color="#B88E2F" cursor="pointer" boxSize="24px" onClick={() => dispatch(removeFromCart(item))} />
                  </Box>
                </Flex>
              ))}
            </Box>

            {/* Totals Box */}
            <Box bg="#F9F1E7" w={{ base: "100%", lg: "393px" }} p="40px" textAlign="center">
              <Heading fontSize="32px" mb="60px" color="black">Cart Totals</Heading>
              <Flex justify="space-between" mb="30px">
                <Text fontWeight="600" color="black">Subtotal</Text>
                <Text color="#9F9F9F">Rs. {(subtotal * 1000).toLocaleString()}</Text>
              </Flex>
              <Flex justify="space-between" mb="60px">
                <Text fontWeight="600" color="black">Total</Text>
                <Text color="#B88E2F" fontSize="20px" fontWeight="600">Rs. {(subtotal * 1000).toLocaleString()}</Text>
              </Flex>
              <Button as={RouterLink} to="/checkout" variant="outline" border="1.5px solid black" w="222px" h="59px" borderRadius="15px" color="black" _hover={{ bg: "black", color: "white" }}>Check Out</Button>
            </Box>
          </Flex>
        )}
      </Container>
    </Box>
  );
};

export default Cart;