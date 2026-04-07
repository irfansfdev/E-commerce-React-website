import React, { useState } from "react";
import {
  Box, Container, Flex, Heading, Text, VStack, HStack,
  Input, Button, Image, Icon, Center
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { ChevronRight } from "lucide-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const CheckoutInfo = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const [paymentMethod, setPaymentMethod] = useState("bank-transfer");

  // State to capture billing info for the summary page
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: ""
  });

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleInputChange = (e, field) => {
    setBillingDetails({ ...billingDetails, [field]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // This data is passed to the next page via "state"
    const orderSummaryData = {
      items: cartItems,
      total: subtotal,
      paymentMethod: paymentMethod,
      customer: billingDetails,
      orderNumber: `ORD-${Math.floor(Math.random() * 1000000)}`,
      date: new Date().toLocaleDateString()
    };

    navigate("/order-summary", { state: { order: orderSummaryData } });
  };

  return (
    <Box bg="white" pb="100px">
      {/* Banner */}
      <Box w="100%" h="316px" bgImage="url('/src/assets/Rectangle.png')" bgSize="cover" bgPosition="center" position="relative" display="flex" alignItems="center" justifyContent="center">
        <Box position="absolute" top="0" left="0" w="100%" h="100%" bg="rgba(255, 255, 255, 0.4)" />
        <VStack zIndex={1}>
          <Image src="/src/assets/Meubel House_Logos-05.png" h="30px" mb={2} />
          <Heading fontSize="48px" fontWeight="600" color="black">Checkout</Heading>
          <HStack spacing="10px" color="black">
            <Box as={RouterLink} to="/" fontWeight="600">Home</Box>
            <Icon as={ChevronRight} boxSize="18px" />
            <Text fontWeight="300">Checkout</Text>
          </HStack>
        </VStack>
      </Box>

      <Container maxW="1280px" pt="60px">
        <Flex direction={{ base: "column", lg: "row" }} gap="100px">
          
          {/* Billing Form */}
          <Box flex="1">
            <Heading fontSize="36px" mb="36px" color="black">Billing details</Heading>
            <VStack spacing="30px" align="stretch">
              <HStack spacing="30px">
                <Box flex="1">
                  <Text mb="2" fontWeight="500" color="black">First Name </Text>
                  <Input h="75px" borderRadius="10px" color="black" border="1px solid #9F9F9F" onChange={(e) => handleInputChange(e, 'firstName')} />
                </Box>
                <Box flex="1">
                  <Text mb="2" fontWeight="500" color="black">Last Name </Text>
                  <Input h="75px" borderRadius="10px" color="black" border="1px solid #9F9F9F" onChange={(e) => handleInputChange(e, 'lastName')} />
                </Box>
              </HStack>
              
              <Box><Text mb="2" color="black">Country / Region *</Text><Input h="75px" color="black" borderRadius="10px" border="1px solid #9F9F9F" placeholder="Sri Lanka" /></Box>
              <Box><Text mb="2" color="black">Street address *</Text><Input h="75px" color="black" borderRadius="10px" border="1px solid #9F9F9F" onChange={(e) => handleInputChange(e, 'address')} /></Box>
              <Box><Text mb="2" color="black">Town / City *</Text><Input h="75px" color="black" borderRadius="10px" border="1px solid #9F9F9F" /></Box>
              <Box><Text mb="2" color="black">Phone *</Text><Input h="75px" color="black" borderRadius="10px" border="1px solid #9F9F9F" onChange={(e) => handleInputChange(e, 'phone')} /></Box>
              <Box><Text mb="2" color="black">Email address *</Text><Input h="75px" color="black" borderRadius="10px" border="1px solid #9F9F9F" onChange={(e) => handleInputChange(e, 'email')} /></Box>
              <Input h="75px" borderRadius="10px" border="1px solid #9F9F9F" color="black" placeholder="Additional Information" />
            </VStack>
          </Box>

          {/* Order Summary (Sidebar View) */}
          <Box flex="1" py="20px">
            <Flex justify="space-between" mb="20px" borderBottom="1px solid #eee" pb={4}>
              <Text fontSize="24px" fontWeight="500" color="black">Product</Text>
              <Text fontSize="24px" fontWeight="500" color="black">Subtotal</Text>
            </Flex>

            {cartItems.map((item) => (
              <Flex justify="space-between" mb="15px" color="black" key={`${item.id}-${item.selectedSize}`}>
                <Text>{item.title} <Text as="span" color="#9F9F9F" fontSize="12px">x {item.quantity}</Text></Text>
                <Text>Rs. {(item.price * 1000 * item.quantity).toLocaleString()}</Text>
              </Flex>
            ))}

            <Flex justify="space-between" mb="15px" color="black"><Text>Subtotal</Text><Text>Rs. {(subtotal * 1000).toLocaleString()}</Text></Flex>
            <Flex justify="space-between" mb="30px" color="black"><Text>Total</Text><Text fontWeight="700" color="#B88E2F" fontSize="24px">Rs. {(subtotal * 1000).toLocaleString()}</Text></Flex>
            
            <Box height="1px" bg="#D9D9D9" mb="30px" />

            <VStack align="start" spacing="20px">
              <HStack cursor="pointer" onClick={() => setPaymentMethod("bank-transfer")}>
                <Box border="1px solid black" borderRadius="full" boxSize="18px" display="flex" alignItems="center" justifyContent="center">
                  {paymentMethod === "bank-transfer" && <Box bg="black" borderRadius="full" boxSize="10px" />}
                </Box>
                <Text fontWeight="500" color={paymentMethod === "bank-transfer" ? "black" : "#9F9F9F"}>Direct Bank Transfer</Text>
              </HStack>
              
              {paymentMethod === "bank-transfer" && (
                <Text color="#9F9F9F" fontSize="14px" pl="30px" textAlign="justify">
                  Make your payment directly into our bank account. Please use your Order ID as the payment reference.
                </Text>
              )}

              <HStack cursor="pointer" onClick={() => setPaymentMethod("cod")}>
                <Box border="1px solid #9F9F9F" borderRadius="full" boxSize="18px" display="flex" alignItems="center" justifyContent="center">
                  {paymentMethod === "cod" && <Box bg="black" borderRadius="full" boxSize="10px" />}
                </Box>
                <Text fontWeight="500" color={paymentMethod === "cod" ? "black" : "#9F9F9F"}>Cash On Delivery</Text>
              </HStack>
            </VStack>

            <Text mt="20px" fontSize="14px" color="black">
                Your personal data will be used to support your experience throughout this website... <b>Privacy Policy.</b>
            </Text>

            <Button 
                onClick={handlePlaceOrder}
                variant="outline" 
                color="black" 
                border="1px solid black" 
                borderRadius="15px" 
                w="100%" 
                h="64px" 
                mt="40px" 
                fontSize="20px" 
                _hover={{ bg: "black", color: "white" }}
            >
                Place order
            </Button>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default CheckoutInfo;