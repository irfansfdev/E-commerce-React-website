import React from "react";
import { Box, Heading, Text, VStack, HStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const ShopHero = () => {
  return (
    <Box
      w="100%" h="316px"
      bgImage="url('/src/assets/Rectangle 1.png')" 
      bgSize="cover" bgPosition="center"
      position="relative" display="flex"
      alignItems="center" justifyContent="center"
    >
      <Box position="absolute" top="0" left="0" w="100%" h="100%" bg="rgba(255, 255, 255, 0.2)" />
      <VStack spacing={2} zIndex={1}>
        <Heading fontSize="48px" fontWeight="500" color="black">Shop</Heading>
        <HStack spacing="8px" mt="8px">
          <Box as={RouterLink} to="/" fontWeight="600" color="black" _hover={{ color: "#B88E2F" }}>Home</Box>
          <Text fontWeight="bold" color="black"> {">"} </Text>
          <Text fontWeight="300" color="black">Shop</Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ShopHero;