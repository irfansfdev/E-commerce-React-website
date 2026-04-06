import React from "react";
import { Box, Container, Flex, Heading, Stack, Text, Button } from "@chakra-ui/react";

const Hero = () => {
  return (
    <Box
      h="90vh"
      bgImage="url('./src/assets/scandinavian-interior-mockup-wall-decal-background 1.png')"
      bgSize="cover"
      bgPosition="center"
      display="flex"
      alignItems="center"
    >
      <Container maxW="1280px">
        <Flex justify="flex-end">
          <Box
            bg="#FFF3E3"
            p={{ base: "40px", md: "50px" }}
            maxW="550px"
            borderRadius="10px"
            textAlign="left"
          >
            <Stack spacing={4}>
              <Text fontWeight="600" letterSpacing="3px" fontSize="16px" color="#333333">
                New Arrival
              </Text>
              <Heading fontSize={{ base: "36px", md: "45px" }} fontWeight="700" color="#B88E2F" lineHeight="1.2">
                Discover Our <br /> New Collection
              </Heading>
              <Text fontSize="18px" fontWeight="500" color="#333333" pb="30px">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                elit tellus, luctus nec ullamcorper mattis.
              </Text>
              <Button
                bg="#B88E2F"
                color="white"
                size="lg"
                h="75px"
                w="222px"
                borderRadius="0"
                fontSize="16px"
                fontWeight="700"
                _hover={{ bg: "#9A7622" }}
              >
                BUY NOW
              </Button>
            </Stack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Hero;