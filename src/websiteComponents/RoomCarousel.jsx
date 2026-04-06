import React, { useState, useEffect } from "react";
import {
  Box, Button, Container, Flex, Heading, Text, Image, IconButton, HStack, VStack, Spinner, Center,
} from "@chakra-ui/react";
import { FaChevronRight, FaArrowRight } from "react-icons/fa";

const InspirationSection = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=5")
      .then((res) => res.json())
      .then((data) => {
        setRooms(data.products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === rooms.length - 1 ? 0 : prev + 1));
  };

  if (loading) return <Center py="100px"><Spinner color="#B88E2F" /></Center>;

  const currentProduct = rooms[currentIndex];
  const nextProduct = rooms[(currentIndex + 1) % rooms.length];

  return (
    <Box bg="#FCF8F3" py="40px" overflow="hidden">
      <Container maxW="1240px">
        <Flex direction={{ base: "column", lg: "row" }} align="center" gap={10}>
          
          {/* LEFT CONTENT */}
          <VStack align="flex-start" spacing={5} maxW={{ lg: "400px" }}>
            <Heading fontSize="36px" fontWeight="700" color="#3A3A3A" lineHeight="1.2">
              50+ Beautiful rooms inspiration
            </Heading>
            <Text color="#616161" fontSize="15px">
              Our designer already made a lot of beautiful prototypes of rooms that inspire you.
            </Text>
            <Button
              bg="#B88E2F" color="white" borderRadius="0"
              px="32px" h="44px" fontSize="14px"
              _hover={{ bg: "#9A7622" }}
            >
              Explore More
            </Button>
          </VStack>

          {/* RIGHT SLIDER AREA */}
          <Flex flex="1" position="relative" gap={5} align="flex-start">
            
            {/* MAIN ACTIVE SLIDE */}
            <Box position="relative" minW={{ base: "300px", md: "380px" }} h="550px" >
              <Image
                src={currentProduct?.images?.[0] || currentProduct?.thumbnail}
                w="full" h="full" objectFit="cover" 
              />
              
              {/* COMPACT OVERLAY LABEL */}
              <Box
                position="absolute" bottom="24px" left="24px"
                bg="rgba(255, 255, 255, 0.85)"
                p="20px 24px" minW="180px" zIndex={2}
              >
                <HStack spacing={2} mb={1}>
                  <Text color="#616161" fontSize="13px">0{currentIndex + 1}</Text>
                  <Box w="20px" h="1px" bg="#616161" />
                  <Text color="#616161" fontSize="13px" textTransform="capitalize">
                    {currentProduct?.category.split('-').join(' ')}
                  </Text>
                </HStack>
                
                <Heading fontSize="22px" color="#3A3A3A" fontWeight="600">
                  {currentProduct?.title.split(' ').slice(0, 2).join(' ')}
                </Heading>
                
                <IconButton
                  position="absolute" right="-40px" bottom="0"
                  icon={<FaArrowRight size="18px" />} bg="#B88E2F"
                  color="white" borderRadius="0"  h="40px" w="40px"
                  minW="40px" _hover={{ bg: "#9A7622" }} aria-label="Next"
             />
              </Box>
            </Box>

            {/* SECONDARY SLIDE */}
            <Box h="450px" minW="350px" display={{ base: "none", md: "block" }}>
              <Image
                src={nextProduct?.images?.[0] || nextProduct?.thumbnail}
                w="full" h="full" objectFit="cover" 
              />
            </Box>

            {/* CIRCULAR NEXT BUTTON */}
            <IconButton
              position="absolute" right="-20px" top="50%"
              transform="translateY(-50%)" bg="white"
              icon={<FaChevronRight size="18px" />}
              color="#B88E2F" boxShadow="lg" h="45px" w="45px"
              borderRadius="full" onClick={nextSlide} zIndex={10}
              minW="45px" _hover={{ bg: "#B88E2F", color: "white" }}
            />

            {/* DOT INDICATORS */}
            <HStack position="absolute" bottom="-30px" left={{ md: "420px" }} spacing={3}>
              {rooms.map((_, index) => (
                <Box
                  key={index}
                  w={index === currentIndex ? "20px" : "10px"}
                  h={index === currentIndex ? "20px" : "10px"}
                  borderRadius="full"
                  border={index === currentIndex ? "1px solid #B88E2F" : "none"}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  cursor="pointer"
                  onClick={() => setCurrentIndex(index)}
                >
                  <Box
                    w="10px"
                    h="10px"
                    borderRadius="full"
                    bg={index === currentIndex ? "#B88E2F" : "#D8D8D8"}
                  />
                </Box>
              ))}
            </HStack>
          </Flex>

        </Flex>
      </Container>
    </Box>
  );
};

export default InspirationSection;