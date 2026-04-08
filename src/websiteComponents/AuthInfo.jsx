import React, { useState } from "react";
import {
  Box, Container, VStack, Heading, Text, Input, Button, 
  HStack, Icon, Link, Stack, Separator, SimpleGrid
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import { toaster } from "@/components/ui/toaster";

const AuthInfo = ({ mode }) => {
  const isLogin = mode === "login";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuth = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      const savedUser = JSON.parse(localStorage.getItem("furniro_user"));
      if (savedUser && savedUser.email === formData.email && savedUser.password === formData.password) {
        localStorage.setItem("isLoggedIn", "true");
        
        toaster.create({
          title: "Welcome back!",
          description: `Logged in as ${savedUser.firstName}`,
          type: "success",
        });
        
        navigate("/");
        window.location.reload();
      } else {
        toaster.create({
          title: "Login Failed",
          description: "Invalid email or password.",
          type: "error",
        });
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        toaster.create({
          title: "Error",
          description: "Passwords do not match!",
          type: "warning",
        });
        return;
      }

      localStorage.setItem("furniro_user", JSON.stringify(formData));
      localStorage.setItem("isLoggedIn", "true");

      toaster.create({
        title: "Account Created",
        description: "Your professional profile is ready.",
        type: "success",
      });

      navigate("/");
      window.location.reload();
    }
  };

  const inputStyle = {
    h: "55px",
    bg: "white",
    borderRadius: "10px",
    border: "1px solid #D9D9D9",
    _focus: { borderColor: "#B88E2F", outline: "none" },
    px: 4,
    color: "black"
  };

  return (
    <Box bg="white" minH="100vh" pb="100px">
      <Box w="100%" h={{ base: "200px", md: "316px" }} bgImage="url('/src/assets/Rectangle.png')" bgSize="cover" bgPosition="center" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={2}>
          <Heading fontSize={{ base: "32px", md: "48px" }} fontWeight="600" color="black">{isLogin ? "Login" : "Sign Up"}</Heading>
          <HStack spacing="10px" color="black">
            <Box as={RouterLink} to="/" fontWeight="600">Home</Box>
            <Icon as={ChevronRight} boxSize="18px" />
            <Text fontWeight="300">{isLogin ? "Login" : "Sign Up"}</Text>
          </HStack>
        </VStack>
      </Box>

      <Container maxW={isLogin ? "500px" : "800px"} mt="60px">
        <Box p={{ base: "30px", md: "50px" }} border="1px solid #D9D9D9" borderRadius="10px" bg="white">
          <form onSubmit={handleAuth}>
            <VStack spacing="30px" align="stretch">
              <Heading fontSize="32px" textAlign="center" color="black">
                {isLogin ? "Welcome Back" : "Create Account"}
              </Heading>

              <Stack spacing="20px">
                {isLogin ? (
                  <>
                    <Box><Text fontWeight="500" color="black" mb={2}>Email Address</Text><Input name="email" type="email" placeholder="Email" required onChange={handleInputChange} {...inputStyle} /></Box>
                    <Box><Text fontWeight="500" color="black" mb={2}>Password</Text><Input name="password" type="password" placeholder="Password" required onChange={handleInputChange} {...inputStyle} /></Box>
                  </>
                ) : (
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                    <Box><Text fontWeight="500" mb={2} color="black">First Name</Text><Input name="firstName" placeholder="First Name" required onChange={handleInputChange} {...inputStyle} /></Box>
                    <Box><Text fontWeight="500" mb={2} color="black">Last Name</Text><Input name="lastName" placeholder="Last Name" required onChange={handleInputChange} {...inputStyle} /></Box>
                    <Box><Text fontWeight="500" mb={2} color="black">Email</Text><Input name="email" type="email" placeholder="Email" required onChange={handleInputChange} {...inputStyle} /></Box>
                    <Box><Text fontWeight="500" mb={2} color="black">Phone</Text><Input name="phone" type="tel" placeholder="Phone" required onChange={handleInputChange} {...inputStyle} /></Box>
                    <Box gridColumn={{ md: "span 2" }} color="black"><Text fontWeight="500" mb={2}>Address</Text><Input name="address" placeholder="Address" required onChange={handleInputChange} {...inputStyle} /></Box>
                    <Box><Text fontWeight="500" mb={2} color="black">Password</Text><Input name="password" type="password" placeholder="Password" required onChange={handleInputChange} {...inputStyle} /></Box>
                    <Box><Text fontWeight="500" mb={2} color="black">Confirm Password</Text><Input name="confirmPassword" type="password" placeholder="Confirm" required onChange={handleInputChange} {...inputStyle} /></Box>
                  </SimpleGrid>
                )}
              </Stack>

              <Button type="submit" bg="#B88E2F" color="white" h="55px" fontSize="16px" borderRadius="10px" _hover={{ bg: "#967328" }} w="100%">
                {isLogin ? "Log In" : "Register"}
              </Button>

              <Separator />

              <HStack justify="center" fontSize="14px">
                <Text color="#9F9F9F">{isLogin ? "New to Furniro?" : "Already have an account?"}</Text>
                <Link as={RouterLink} to={isLogin ? "/signup" : "/login"} color="#B88E2F" fontWeight="600">
                  {isLogin ? "Register" : "Login"}
                </Link>
              </HStack>
            </VStack>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default AuthInfo;