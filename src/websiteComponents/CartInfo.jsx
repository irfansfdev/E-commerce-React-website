import React from "react";
import {
  Box, Container, Flex, Image, Text, Button, Heading,
  HStack, VStack, Icon, Center, Circle, Grid
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { ChevronRight } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "../redux/cartSlice";

const CartInfo = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 0;
    return acc + (price * qty);
  }, 0);

  const handleUpdateQty = (item, delta) => {
    const currentQty = Number(item.quantity) || 1;
    const newQty = currentQty + delta;
    if (newQty >= 1) {
      dispatch(addToCart({ ...item, quantity: newQty, updateQuantity: true }));
    }
  };

  return (
    <Box bg="white" minH="100vh">
      {/* Banner */}
      <Box w="100%" h={{ base: "200px", md: "316px" }} bgImage="url('/src/assets/Rectangle.png')" bgSize="cover" bgPosition="center" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={2}>
          <Heading fontSize={{ base: "32px", md: "48px" }} fontWeight="600" color="black">Cart</Heading>
          <HStack spacing="10px" color="black">
            <Box as={RouterLink} to="/" fontWeight="600">Home</Box>
            <Icon as={ChevronRight} boxSize="18px" />
            <Text fontWeight="300">Cart</Text>
          </HStack>
        </VStack>
      </Box>

      <Container maxW="1280px" py={{ base: "40px", md: "72px" }}>
        {cartItems.length === 0 ? (
          <Center py="100px" flexDirection="column">
            <Heading color="black" mb={4}>Your cart is empty</Heading>
            <Button as={RouterLink} to="/shop" bg="#B88E2F" color="white" _hover={{ bg: "#967328" }}>Return to Shop</Button>
          </Center>
        ) : (
          <Flex direction={{ base: "column", lg: "row" }} gap="30px" align="start">
            <Box flex="2" w="100%">
              {/* Desktop Header */}
              <Flex bg="#F9F1E7" h="55px" align="center" px="20px" fontWeight="500" color="black" display={{ base: "none", md: "flex" }} mb="15px">
                <Text flex="3">Product</Text>
                <Text flex="1" textAlign="center">Price</Text>
                <Text flex="1" textAlign="center">Quantity</Text>
                <Text flex="1" textAlign="center">Subtotal</Text>
                <Box w="40px" />
              </Flex>

              {cartItems.map((item) => (
                <Box key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} borderBottom="1px solid #eee" py="20px">
                  {/* Mobile Grid View */}
                  <Grid templateColumns="100px 1fr 30px" gap={4} display={{ base: "grid", md: "none" }} alignItems="start">
                    <Center boxSize="100px" bg="#F9F1E7" borderRadius="10px">
                      <Image src={item.images?.[0] || item.thumbnail} maxH="80px" objectFit="contain" />
                    </Center>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="500" fontSize="16px">{item.title}</Text>
                      <HStack fontSize="13px" color="#9F9F9F">
                        <Text>Size: {item.selectedSize || 'N/A'}</Text>
                        <Circle size="10px" bg={item.selectedColor || 'black'} border="1px solid #ddd" />
                      </HStack>
                      <Text color="#9F9F9F" fontSize="14px">Rs. {(Number(item.price) * 1000).toLocaleString()}</Text>
                      <Flex w="100%" justify="space-between" align="center" pt={2}>
                        <HStack border="1px solid #9F9F9F" borderRadius="5px" px={2} h="32px" w="80px" justify="space-between">
                          <Text cursor="pointer" fontWeight="bold" onClick={() => handleUpdateQty(item, -1)}>-</Text>
                          <Text fontWeight="600">{item.quantity}</Text>
                          <Text cursor="pointer" fontWeight="bold" onClick={() => handleUpdateQty(item, 1)}>+</Text>
                        </HStack>
                        <Text fontWeight="600" color="black">Rs. {(Number(item.price) * 1000 * item.quantity).toLocaleString()}</Text>
                      </Flex>
                    </VStack>
                    <Icon as={MdDelete} color="#B88E2F" cursor="pointer" boxSize="22px" onClick={() => dispatch(removeFromCart(item))} />
                  </Grid>

                  {/* Desktop Flex View */}
                  <Flex align="center" px="20px" display={{ base: "none", md: "flex" }}>
                    <HStack flex="3" spacing="30px">
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
                    <Text flex="1" textAlign="center" color="#9F9F9F">Rs. {(Number(item.price) * 1000).toLocaleString()}</Text>
                    <HStack flex="1" justify="center">
                      <HStack border="1px solid #9F9F9F" borderRadius="5px" px={3} h="35px">
                        <Text cursor="pointer" fontWeight="bold" onClick={() => handleUpdateQty(item, -1)}>-</Text>
                        <Text fontWeight="600">{item.quantity}</Text>
                        <Text cursor="pointer" fontWeight="bold" onClick={() => handleUpdateQty(item, 1)}>+</Text>
                      </HStack>
                    </HStack>
                    <Text flex="1" textAlign="center" fontWeight="500">Rs. {(Number(item.price) * 1000 * item.quantity).toLocaleString()}</Text>
                    <Box w="40px" textAlign="right"><Icon as={MdDelete} color="#B88E2F" cursor="pointer" boxSize="24px" onClick={() => dispatch(removeFromCart(item))} /></Box>
                  </Flex>
                </Box>
              ))}
            </Box>

            {/* Totals Box */}
            <Box bg="#F9F1E7" w={{ base: "100%", lg: "393px" }} p="40px" textAlign="center">
              <Heading fontSize="32px" mb="60px">Cart Totals</Heading>
              <Flex justify="space-between" mb="30px"><Text fontWeight="600">Subtotal</Text><Text color="#9F9F9F">Rs. {(subtotal * 1000).toLocaleString()}</Text></Flex>
              <Flex justify="space-between" mb="60px"><Text fontWeight="600">Total</Text><Text color="#B88E2F" fontSize="20px" fontWeight="600">Rs. {(subtotal * 1000).toLocaleString()}</Text></Flex>
              <Button as={RouterLink} to="/checkout" variant="outline" border="1.5px solid black" w="222px" h="59px" borderRadius="15px" color="black" _hover={{ bg: "black", color: "white" }}>Check Out</Button>
            </Box>
          </Flex>
        )}
      </Container>
    </Box>
  );
};

export default CartInfo;