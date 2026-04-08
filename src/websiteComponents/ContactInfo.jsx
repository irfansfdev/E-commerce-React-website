import React from "react";
import {
  Box, Container, Flex, Heading, Text, Stack, HStack, VStack, Icon, Input, Textarea, Button, Center,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";
import FeatureBar from "../websiteComponents/FeatureBar";

const ContactInfo = () => {
  return (
    <Box bg="white">
      <Box
        h="316px"
        bgImage="url('/src/assets/Rectangle.png')" 
        bgSize="cover"
        bgPos="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box textAlign="center">
          <Center mb={2}>
             
          </Center>
          <Heading fontSize="48px" fontWeight="500" color="black">Contact</Heading>
          <HStack justify="center" fontWeight="500" mt="10px" color="black">
            <Link to="/">Home</Link>
            <Text>{">"}</Text>
            <Text color="black" fontWeight="light">Contact</Text>
          </HStack>
        </Box>
      </Box>

      {/* --- Main Content --- */}
      <Container maxW="1058px" py="80px">
        <VStack spacing="10px" textAlign="center" mb="80px">
          <Heading fontSize="32px" fontWeight="600"color="black">Get In Touch With Us</Heading>
          <Text color="#9F9F9F" maxW="640px">
            For More Information About Our Product & Services. Please Feel Free To Drop Us 
            An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
          </Text>
        </VStack>

        <Flex direction={{ base: "column", md: "row" }} gap="100px" px={{ base: "20px", md: "50px" }}>
          
          {/* Left Side: Contact Info */}
          <Stack spacing="40px" flex="1">
            <HStack align="flex-start" spacing={4}>
              <Icon as={FaMapMarkerAlt} boxSize="22px" color="black" mt={2} />
              <Box>
                <Text fontSize="24px" fontWeight="500" color="black">Address</Text>
                <Text color="black" fontSize="16px">
                  236 5th SE Avenue, New York NY10000, United States
                </Text>
              </Box>
            </HStack>

            <HStack align="flex-start" spacing={4}>
              <Icon as={FaPhoneAlt} boxSize="22px" mt={2} color="black" />
              <Box>
                <Text fontSize="24px" fontWeight="500" color="black">Phone</Text>
                <Text color="black" fontSize="16px">Mobile: +(84) 546-6789</Text>
                <Text color="black" fontSize="16px">Hotline: +(84) 456-6789</Text>
              </Box>
            </HStack>

            <HStack align="flex-start" spacing={4}>
              <Icon as={FaClock} boxSize="22px" mt={2} color="black" />
              <Box>
                <Text fontSize="24px" fontWeight="500" color="black">Working Time</Text>
                <Text color="black" fontSize="16px">Monday-Friday: 9:00 - 22:00</Text>
                <Text color="black" fontSize="16px">Saturday-Sunday: 9:00 - 21:00</Text>
              </Box>
            </HStack>
          </Stack> 

          {/* Right Side: Form */}
          <Stack spacing="30px" flex="1.5">
            <Box>
              <Text fontWeight="500" mb="12px" color="black">Your name</Text>
              <Input placeholder="Abc" h="75px" color="black" borderRadius="10px" border="1px solid #9F9F9F" />
            </Box>

            <Box>
              <Text fontWeight="500" mb="12px" color="black">Email address</Text>
              <Input placeholder="Abc@def.com" h="75px" color="black" borderRadius="10px" border="1px solid #9F9F9F" />
            </Box>

            <Box>
              <Text fontWeight="500" mb="12px" color="black">Subject</Text>
              <Input placeholder="This is an optional" color="black" h="75px" borderRadius="10px" border="1px solid #9F9F9F" />
            </Box>

            <Box>
              <Text fontWeight="500" mb="12px" color="black">Message</Text>
              <Textarea 
                placeholder="Hi! i'd like to ask about" 
                color="black"
                h="120px" 
                borderRadius="10px" 
                border="1px solid #9F9F9F" 
                pt="25px"
              />
            </Box>

            <Button 
              bg="#B88E2F" 
              color="white" 
              w="237px" 
              h="55px" 
              borderRadius="5px"
              fontSize="16px"
              fontWeight="400"
              _hover={{ bg: "#a47a2a" }}
              mt="20px"
            >
              Submit
            </Button>
          </Stack>
        </Flex>
      </Container>

      <FeatureBar />
    </Box>
  );
};

export default ContactInfo;