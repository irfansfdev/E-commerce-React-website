import React from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Text,
  VStack,
  Heading,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="white" pt="80px" pb="40px" borderTop="1px solid #D8D8D8" w="100%">
      <Container maxW="1240px">
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10} mb="50px">
          
          {/* Column 1: Brand & Address */}
          <VStack align="flex-start" spacing={8}>
            <Heading fontSize="24px" fontWeight="700" color="black">
              Funiro.
            </Heading>
            <Text color="#9F9F9F" fontSize="16px" lineHeight="1.6">
              400 University Drive Suite 200 Coral Gables, <br /> 
              FL 33134 USA
            </Text>
          </VStack>

          {/* Column 2: Links */}
          <VStack align="flex-start" spacing={8}>
            <Text color="#9F9F9F" fontWeight="500">Links</Text>
            <VStack align="flex-start" spacing={6} fontWeight="600" fontSize="16px" color="black">
              <Text cursor="pointer" _hover={{ color: "#B88E2F" }}>Home</Text>
              <Text cursor="pointer" _hover={{ color: "#B88E2F" }}>Shop</Text>
              <Text cursor="pointer" _hover={{ color: "#B88E2F" }}>About</Text>
              <Text cursor="pointer" _hover={{ color: "#B88E2F" }}>Contact</Text>
            </VStack>
          </VStack>

          {/* Column 3: Help */}
          <VStack align="flex-start" spacing={8}>
            <Text color="#9F9F9F" fontWeight="500">Help</Text>
            <VStack align="flex-start" spacing={6} fontWeight="600" fontSize="16px" color="black">
              <Text cursor="pointer" _hover={{ color: "#B88E2F" }}>Payment Options</Text>
              <Text cursor="pointer" _hover={{ color: "#B88E2F" }}>Returns</Text>
              <Text cursor="pointer" _hover={{ color: "#B88E2F" }}>Privacy Policies</Text>
            </VStack>
          </VStack>

          {/* Column 4: Newsletter */}
          <VStack align="flex-start" spacing={8}>
            <Text color="#9F9F9F" fontWeight="500">Newsletter</Text>
            <Flex gap={3} w="full" align="flex-end">
              <Input
                placeholder="Enter Your Email Address"
                variant="unstyled"
                borderBottom="1px solid black"
                borderRadius="0"
                fontSize="14px"
                pb={1}
                _placeholder={{ color: "#9F9F9F" }}
              />
              <Button
                variant="unstyled"
                borderBottom="1px solid black"
                borderRadius="0"
                fontSize="14px"
                fontWeight="700"
                color="black"
                h="auto"
                pb={1}
                _hover={{ color: "#B88E2F", borderBottomColor: "#B88E2F" }}
              >
                SUBSCRIBE
              </Button>
            </Flex>
          </VStack>
        </SimpleGrid>

        <Box w="100%" h="1px" bg="#D8D8D8" mb={8} />
        
        <Text fontSize="16px" color="black">
          2023 furino. All rights reverved
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;