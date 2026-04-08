import React from "react";
import { Box, Flex, Text, Stack, SimpleGrid, Center } from "@chakra-ui/react";
import { Trophy, BadgeCheck, Truck, Headphones } from "lucide-react";

const FeatureBar = () => {
  const features = [
    {
      icon: <Trophy size={50} strokeWidth={1.5} />,
      title: "High Quality",
      desc: "crafted from top materials",
    },
    {
      icon: <BadgeCheck size={50} strokeWidth={1.5} />,
      title: "Warranty Protection",
      desc: "Over 2 years",
    },
    {
      icon: <Truck size={50} strokeWidth={1.5} />,
      title: "Free Shipping",
      desc: "Order over 150 $",
    },
    {
      icon: <Headphones size={50} strokeWidth={1.5} />,
      title: "24 / 7 Support",
      desc: "Dedicated support",
    },
  ];

  return (
    <Box 
      bg="#FAF3EA" 
      py={{ base: "50px", md: "100px" }} 
      px={{ base: "20px", md: "50px" }}
      w="100%"
    >
      <Container maxW="1440px" px={0}>
        <SimpleGrid 
          columns={{ base: 1, sm: 2, lg: 4 }} 
          spacingY={{ base: "40px", lg: "0" }}
          spacingX="20px"
        >
          {features.map((item, index) => (
            <Flex 
              key={index} 
              align="center" 
              justify={{ base: "flex-start", sm: "center", lg: "flex-start" }}
              gap="15px"
            >
              <Box color="#242424" flexShrink={0}>
                {item.icon}
              </Box>
              
              <Stack spacing={0}>
                <Text 
                  fontWeight="600" 
                  fontSize={{ base: "18px", md: "25px" }} 
                  color="#242424"
                  lineHeight="1.2"
                >
                  {item.title}
                </Text>
                <Text 
                  fontSize={{ base: "14px", md: "20px" }} 
                  color="#898989" 
                  fontWeight="500"
                >
                  {item.desc}
                </Text>
              </Stack>
            </Flex>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

import { Container } from "@chakra-ui/react";

export default FeatureBar;