import React, { useState, useEffect } from "react";
import {
  Box, Button, Flex, Heading, Text, Image, IconButton, HStack, VStack, Spinner, Center,
} from "@chakra-ui/react";
import { FaChevronRight, FaArrowRight } from "react-icons/fa";

const InspirationSection = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetching from furniture category for high-quality interior shots
    fetch("https://dummyjson.com/products/category/furniture?limit=8")
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

  if (loading) return <Center py="100px"><Spinner color="#B88E2F" size="xl" /></Center>;

  const currentProduct = rooms[currentIndex];
  const nextProduct = rooms[(currentIndex + 1) % rooms.length];

  return (
    <Box bg="#FCF8F3" py={{ base: "40px", md: "80px" }} overflow="hidden">
      {/* This Flex uses a large left padding to keep the text aligned 
        while allowing the right side to expand to the edge.
      */}
      <Flex 
        direction={{ base: "column", lg: "row" }} 
        align="center" 
        pl={{ base: "20px", md: "50px", lg: "100px", xl: "150px" }} 
        gap={10}
      >
        
        {/* LEFT CONTENT: FIXED WIDTH TEXT */}
        <VStack 
          align={{ base: "center", lg: "flex-start" }} 
          spacing={6} 
          minW={{ lg: "400px" }} 
          maxW={{ lg: "400px" }}
          textAlign={{ base: "center", lg: "left" }}
          pr={{ base: "20px", lg: "0" }}
        >
          <Heading fontSize={{ base: "32px", md: "40px" }} fontWeight="700" color="#3A3A3A" lineHeight="1.2">
            50+ Beautiful rooms inspiration
          </Heading>
          <Text color="#616161" fontSize="16px" fontWeight="500">
            Our designer already made a lot of beautiful prototypes of rooms that inspire you.
          </Text>
          <Button
            bg="#B88E2F" color="white" borderRadius="0"
            px="40px" h="48px" fontSize="16px" fontWeight="600"
            _hover={{ bg: "#9A7622" }}
          >
            Explore More
          </Button>
        </VStack>

        {/* RIGHT SLIDER: BLEEDS TO THE RIGHT EDGE */}
        <Flex 
          flex="1" 
          position="relative" 
          gap={6} 
          align="flex-start" 
          w="full"
          overflow="visible"
        >
          
          {/* 1. ACTIVE SLIDE (Tallest) */}
          <Box 
            position="relative" 
            flex="0 0 auto" 
            w={{ base: "280px", md: "400px" }} 
            h={{ base: "400px", md: "582px" }}
          >
            <Image
              src={currentProduct?.images?.[0]} // High-res image
              w="full" h="full" objectFit="cover" 
              alt="Active"
            />
            
            {/* OVERLAY BOX */}
            <Box
              position="absolute" bottom="24px" left="24px"
              bg="rgba(255, 255, 255, 0.7)"
              backdropFilter="blur(5px)"
              p="32px 24px" minW="217px"
            >
              <HStack spacing={2} mb={2}>
                <Text color="#616161" fontSize="14px">0{currentIndex + 1}</Text>
                <Box w="25px" h="1px" bg="#616161" />
                <Text color="#616161" fontSize="14px" fontWeight="500" textTransform="capitalize">
                  {currentProduct?.category.replace('-', ' ')}
                </Text>
              </HStack>
              <Heading fontSize="28px" color="#3A3A3A" fontWeight="600">
                {currentProduct?.title.split(' ').slice(0, 2).join(' ')}
              </Heading>
              
              <IconButton
                position="absolute" right="-48px" bottom="0"
                bg="#B88E2F" color="white" borderRadius="0" h="48px" w="48px"
                _hover={{ bg: "#9A7622" }}
              >
                 <FaArrowRight size="20px" /> 
              </IconButton>
            </Box>
          </Box>

          {/* 2. NEXT SLIDE (Shorter) */}
          <Box 
            flex="0 0 auto" 
            w={{ base: "280px", md: "372px" }} 
            h={{ base: "350px", md: "486px" }}
          >
            <Image
              src={nextProduct?.images?.[0]} // High-res image
              w="full" h="full" objectFit="cover" 
              alt="Next preview"
            />
          </Box>

          {/* 3. PARTIAL THIRD SLIDE (Infinite Bleed Effect) */}
          <Box 
            flex="0 0 auto" 
            w="200px" 
            h="486px" 
            display={{ base: "none", xl: "block" }}
          >
            <Image
              src={rooms[(currentIndex + 2) % rooms.length]?.images?.[0]}
              w="full" h="full" objectFit="cover" 
            />
          </Box>

          {/* NEXT NAVIGATION BUTTON */}
          <IconButton
            position="absolute" 
            left={{ base: "260px", md: "375px" }} 
            top="50%"
            transform="translateY(-50%)" 
            bg="white" color="#B88E2F" 
            boxShadow="xl" h="48px" w="48px"
            borderRadius="full" 
            onClick={nextSlide} 
            zIndex={10}
            _hover={{ bg: "#B88E2F", color: "white" }}
          >
            <FaChevronRight size="20px" />
          </IconButton>

          {/* PAGINATION DOTS */}
          <HStack 
            position="absolute" 
            bottom={{ base: "-40px", md: "40px" }} 
            left={{ base: "50%", md: "450px" }} 
            transform={{ base: "translateX(-50%)", md: "none" }}
            spacing={5}
          >
            {rooms.slice(0, 4).map((_, index) => (
              <Box
                key={index}
                cursor="pointer"
                onClick={() => setCurrentIndex(index)}
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="27px" h="27px"
                borderRadius="full"
                border={index === currentIndex ? "1px solid #B88E2F" : "none"}
              >
                <Box
                  w="11px" h="11px" borderRadius="full"
                  bg={index === currentIndex ? "#B88E2F" : "#D8D8D8"}
                />
              </Box>
            ))}
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default InspirationSection;