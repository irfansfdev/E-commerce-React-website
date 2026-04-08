import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button, Box, Container, Heading, SimpleGrid, Image, Text, Stack, Badge, Flex, Center, Spinner,
} from "@chakra-ui/react";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(8);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=20")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Center py="100px">
        <Spinner size="xl" color="#B88E2F" />
      </Center>
    );
  }

  return (
    <Container maxW="full" py="60px" bg="#ffffff">
      <Heading
        textAlign="center" mb="40px" color="#3A3A3A"
        fontSize={{ base: "28px", md: "36px" }} fontWeight="700"  
      >
        Our Products
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="32px">
        {products.slice(0, visible).map((product) => {
          const hasDiscount = product.discountPercentage > 5;
          
          const priceInRp = (product.price * 1000).toLocaleString('id-ID');
          const oldPriceRaw = (product.price / (1 - product.discountPercentage / 100)) * 1000;
          const oldPriceInRp = Math.round(oldPriceRaw).toLocaleString('id-ID');

          return (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`} 
              state={{ product: product }} 
              style={{ textDecoration: 'none' }}
            >
              <Box
                bg="#F4F5F7" position="relative"
                transition="0.2s" _hover={{ transform: "translateY(-4px)" }}
              >
                <Box position="relative" h="300px" overflow="hidden">
                  <Image
                    src={product.images?.[0]} alt={product.title}
                    w="full" h="full" objectFit="cover"
                    transition="0.4s"
                  />

                  {hasDiscount ? (
                    <Badge
                      position="absolute" top="24px" right="24px" bg="#E97171"
                      color="white" borderRadius="full" boxSize="48px" display="flex"
                      alignItems="center" justifyContent="center" fontSize="12px"
                    >
                      -{Math.round(product.discountPercentage)}%
                    </Badge>
                  ) : (
                    <Badge
                      position="absolute" top="24px" right="24px" bg="#2EC1AC"
                      color="white" borderRadius="full" boxSize="48px" display="flex"
                      alignItems="center" justifyContent="center" fontSize="12px"
                    >
                      New
                    </Badge>
                  )}
                </Box>

                <Stack p="16px" spacing={2} bg="#F4F5F7">
                  <Heading fontSize="20px" fontWeight="600" color="#3A3A3A" noOfLines={1}>
                    {product.title}
                  </Heading>
                  <Text fontSize="14px" color="#898989" fontWeight="500">
                    {product.category}
                  </Text>
                  <Flex align="center" gap={3}>
                    <Text fontSize="18px" fontWeight="600" color="#3A3A3A">
                      Rp {priceInRp}
                    </Text>
                    {hasDiscount && (
                      <Text fontSize="14px" color="#B0B0B0" textDecoration="line-through">
                        Rp {oldPriceInRp}
                      </Text>
                    )}
                  </Flex>
                </Stack>
              </Box>
            </Link>
          );
        })}
      </SimpleGrid>

      {visible < products.length && (
        <Center mt="40px">
          <Button
            bg="white" size="md" h="45px" w="180px"
            border="1px solid #B88E2F" color="#B88E2F"
            borderRadius="0" fontSize="16px" fontWeight="700"
            _hover={{ bg: "#B88E2F", color: "white" }}
            onClick={(e) => {
              e.preventDefault();
              setVisible((prev) => prev + 4);
            }}
          >
            Show More
          </Button>
        </Center>
      )}
    </Container>
  );
};

export default ProductGrid;