import React, { useEffect, useState } from "react";
import { Box, Grid, GridItem, Image, Text, VStack, Spinner, Center } from "@chakra-ui/react";

const Img = ({ src }) => (
  <Image
    src={src}
    objectFit="cover"
    w="100%" h="100%"
  />
);

export default function FuniroFurnitureCollage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=9")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (

    <Box bg="white" py={{ base: 10, md: 20 }} px={6}>
      <VStack spacing={1} mb={{ base: 8, md: 14 }}>
        <Text fontSize="sm" color="gray.500">Share your setup with</Text>
        <Text fontSize={{ base: "3xl", md: "6xl" }} fontWeight="extrabold" color="black">
          #FuniroFurniture
        </Text>
      </VStack>

      <Grid
        maxW="1300px" 
        mx="auto"
        templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(12, 1fr)" }}
        autoRows={{ base: "120px", md: "90px" }}
        gap={0}
      >
        <GridItem colSpan={{ base: 2, md: 3 }} rowSpan={{ base: 2, md: 4 }}>
          <Img src={products[0].thumbnail} />
        </GridItem>

        <GridItem colSpan={{ base: 2, md: 3 }} rowSpan={{ base: 1, md: 3 }}>
          <Img src={products[1].thumbnail} />
        </GridItem>

        <GridItem colSpan={{ base: 2, md: 3 }} rowSpan={{ base: 2, md: 5 }}>
          <Img src={products[2].thumbnail} />
        </GridItem>

        <GridItem colSpan={{ base: 2, md: 3 }} rowSpan={{ base: 2, md: 4 }}>
          <Img src={products[3].thumbnail} />
        </GridItem>

        <GridItem colSpan={{ base: 2, md: 3 }} rowSpan={{ base: 2, md: 6 }}>
          <Img src={products[4].thumbnail} />
        </GridItem>

        <GridItem colSpan={{ base: 2, md: 3 }} rowSpan={{ base: 2, md: 4 }}>
          <Img src={products[5].thumbnail} />
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 2 }} rowSpan={{ base: 1, md: 3 }}>
          <Img src={products[6].thumbnail} />
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 2 }} rowSpan={{ base: 2, md: 4 }}>
          <Img src={products[7].thumbnail} />
        </GridItem>

        <GridItem colSpan={{ base: 2, md: 4 }} rowSpan={{ base: 1, md: 3 }}>
          <Img src={products[8].thumbnail} />
        </GridItem>
      </Grid>
    </Box>
  );
}
