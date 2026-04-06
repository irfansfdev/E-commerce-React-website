import React from "react";
import { Box, Container, Flex, Image, Text, Button, Heading, HStack, VStack, Icon, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useCart } from "../CartContext"; 

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <Box bg="white">
      <Box h="316px" bg="#F9F1E7" display="flex" alignItems="center" justifyContent="center">
        <VStack>
          <Heading fontSize="48px" color="black">Cart</Heading>
          <HStack fontWeight="500" color="black">
            <Link to="/">Home</Link>
            <Text> {">"} </Text>
            <Text color="#9F9F9F">Cart</Text>
          </HStack>
        </VStack>
      </Box>

      <Container maxW="1280px" py="72px">
        <Flex direction={{ base: "column", lg: "row" }} gap="30px">
          <Box flex="2">
            <Flex bg="#F9F1E7" h="55px" align="center" px="20px" fontWeight="500" mb="20px" color="black">
              <Text flex="2">Product</Text>
              <Text flex="1" textAlign="center">Price</Text>
              <Text flex="1" textAlign="center">Quantity</Text>
              <Text flex="1" textAlign="center">Subtotal</Text>
              <Box w="30px" />
            </Flex>

            {cartItems.length === 0 ? (
              <Center py="50px">
                <VStack>
                  <Text color="black" fontSize="20px">Your cart is empty.</Text>
                  <Link to="/shop" style={{color: "#B88E2F", textDecoration: "underline"}}>Go Shopping</Link>
                </VStack>
              </Center>
            ) : (
              cartItems.map((item) => (
                <Flex key={item.id} align="center" px="20px" py="20px" borderBottom="1px solid #eee">
                  <HStack flex="2" spacing="20px">
                    <Image src={item.thumbnail || item.images?.[0]} boxSize="80px" bg="#F9F1E7" borderRadius="10px" objectFit="contain" />
                    <Text color="#9F9F9F">{item.title}</Text>
                  </HStack>
                  <Text flex="1" textAlign="center" color="#9F9F9F">Rp {(item.price * 1000).toLocaleString()}</Text>
                  <Text flex="1" textAlign="center" color="black">{item.quantity}</Text>
                  <Text flex="1" textAlign="center" color="black">Rp {(item.price * 1000 * item.quantity).toLocaleString()}</Text>
                  <Icon as={MdDelete} color="#B88E2F" cursor="pointer" boxSize="24px" onClick={() => removeFromCart(item.id)} />
                </Flex>
              ))
            )}
          </Box>

          <Box bg="#F9F1E7" w={{ base: "100%", lg: "390px" }} p="40px" borderRadius="10px" height="fit-content">
            <Heading fontSize="32px" mb="40px" textAlign="center" color="black">Cart Totals</Heading>
            <Flex justify="space-between" mb="20px">
              <Text fontWeight="500" color="black">Subtotal</Text>
              <Text color="#9F9F9F">Rp {(subtotal * 1000).toLocaleString()}</Text>
            </Flex>
            <Flex justify="space-between" mb="40px">
              <Text fontWeight="500" color="black">Total</Text>
              <Text color="#B88E2F" fontSize="20px" fontWeight="600">Rp {(subtotal * 1000).toLocaleString()}</Text>
            </Flex>
            <Button variant="outline" border="1px solid black" w="full" h="55px" borderRadius="15px" color="black" _hover={{bg: "black", color: "white"}}>
                Check Out
            </Button>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Cart;