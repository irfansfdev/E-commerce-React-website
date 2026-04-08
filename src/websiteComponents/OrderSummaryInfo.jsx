import React from "react";
import { Box, Container, VStack, Heading, Text, Flex, Button, Separator, HStack, Icon, Center } from "@chakra-ui/react"; 
import { CheckCircle } from "lucide-react";
import { Link as RouterLink, useLocation } from "react-router-dom";

const OrderSummaryInfo = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <Center h="70vh" flexDirection="column" gap={4}>
        <Heading color="black">No Order Found</Heading>
        <Button as={RouterLink} to="/shop" bg="#B88E2F" color="white" px={8}>Go to Shop</Button>
      </Center>
    );
  }

  return (
    <Box bg="white" py="80px">
      <Container maxW="800px">
        <VStack spacing={8} bg="#F9F1E7" p={10} borderRadius="15px" align="stretch">
          <VStack spacing={4} textAlign="center">
            <Icon as={CheckCircle} color="green.500" boxSize="60px" />
            <Heading color="black">Order Confirmed!</Heading>
            <Text color="#9F9F9F">Thank you for your purchase, {order.customer.firstName}!</Text>
          </VStack>

          <Box bg="white" p={6} borderRadius="10px">
             <Text fontWeight="bold" color="black" mb={2}>Order Details</Text>
             <Text color="#9F9F9F" fontSize="sm" mb={4}>Order ID: {order.orderNumber}</Text>
             
             <Separator mb={4} borderColor="#D9D9D9" /> 
             
             {order.items.map((item) => (
               <Flex key={item.id} justify="space-between" mb={2}>
                 <Text color="black">{item.title} x{item.quantity}</Text>
                 <Text color="black">Rs. {(item.price * 1000 * item.quantity).toLocaleString()}</Text>
               </Flex>
             ))}
             
             <Separator my={4} borderColor="#D9D9D9" />
             
             <Flex justify="space-between">
                <Text fontSize="xl" fontWeight="bold" color="black">Total Amount Paid</Text>
                <Text fontSize="xl" fontWeight="bold" color="#B88E2F">Rs. {(order.total * 1000).toLocaleString()}</Text>
             </Flex>
          </Box>
          <Button as={RouterLink} to="/" variant="outline" borderColor="black" color="black" _hover={{ bg: "black", color: "white" }}>
            Return to Home
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default OrderSummaryInfo;