import React from "react";
import { Box, Flex, Text, Stack } from "@chakra-ui/react";
// This is the import that was failing
import { Trophy, BadgeCheck, Truck, Headphones } from "lucide-react";

const FeatureBar = () => {
  const features = [
    {
      icon: <Trophy size={40} strokeWidth={1.5} />,
      title: "High Quality",
      desc: "crafted from top materials",
    },
    {
      icon: <BadgeCheck size={40} strokeWidth={1.5} />,
      title: "Warranty Protection",
      desc: "Over 2 years",
    },
    {
      icon: <Truck size={40} strokeWidth={1.5} />,
      title: "Free Shipping",
      desc: "Order over 150 $",
    },
    {
      icon: <Headphones size={40} strokeWidth={1.5} />,
      title: "24 / 7 Support",
      desc: "Dedicated support",
    },
  ];

  return (
    <Box 
      bg="#FAF3EA" // The specific beige background from your image
      py={{ base: "40px", md: "80px" }} 
      px={{ base: "20px", md: "50px" }}
      w="100%"
    >
      <Flex
        maxW="1280px"
        mx="auto"
        justify="space-between"
        align="center"
        direction={{ base: "column", lg: "row" }}
        gap={{ base: "40px", lg: "0" }}
      >
        {features.map((item, index) => (
          <Flex key={index} align="center" gap="12px">
            {/* Using a Box wrapper for the icon to control color/size easily */}
            <Box color="#242424">
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
      </Flex>
    </Box>
  );
};

export default FeatureBar;