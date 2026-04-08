import React, { useState, useEffect } from "react";
import {
  Box, Flex, Heading, HStack, Container, IconButton, Image, Input, Text, Spinner, Circle, VStack, Center, Separator,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { MdPersonOutline, MdSearch, MdFavoriteBorder, MdOutlineShoppingCart, MdClose, MdMenu, MdLogout } from "react-icons/md";

import {
  DialogBody, DialogContent, DialogHeader, DialogRoot, DialogTrigger, DialogBackdrop, DialogCloseTrigger,
} from "@/components/ui/dialog";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.cart.wishlist) || [];

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  // AUTH LOGIC
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userData = JSON.parse(localStorage.getItem("furniro_user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
    window.location.reload(); 
  };

  useEffect(() => {
    if (searchQuery.trim().length < 2) { setResults([]); return; }
    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}&limit=5`);
        const data = await response.json();
        setResults(data.products);
      } catch (e) { console.error("Search failed", e); } finally { setIsLoading(false); }
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  const iconHoverStyle = {
    bg: "transparent",
    color: "#B88E2F",
    transform: "scale(1.1)",
    transition: "0.2s"
  };

  return (
    <Box as="nav" bg="white" py={{ base: "12px", md: "25px" }} position="sticky" top="0" zIndex="1000" boxShadow="sm">
      <Container maxW="1440px" px={{ base: "10px", md: "25px" }}>
        <Flex align="center" justify="space-between">
          
          <HStack spacing={{ base: "4px", md: "15px" }}>
            <IconButton
              display={{ base: "flex", md: "none" }}
              variant="ghost"
              color="black"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open Menu"
              _hover={{ bg: "transparent", color: "#B88E2F" }}
              p={0}
            >
              <MdMenu size="26px" />
            </IconButton>

            <RouterLink to="/">
              <HStack spacing={2} align="center">
                <Image src="/src/assets/Meubel House_Logos-05.png" alt="Logo" h={{ base: "24px", md: "32px" }} />
                <Heading display={{ base: "none", md: "block" }} fontSize="30px" fontWeight="700" color="black">Furniro</Heading>
              </HStack>
            </RouterLink>
          </HStack>

          <HStack as="ul" listStyleType="none" gap="50px" display={{ base: "none", md: "flex" }}>
            {navLinks.map((link) => (
              <Box as={RouterLink} to={link.path} key={link.name} fontWeight="500" color="black" _hover={{ color: "#B88E2F", textDecoration: "none" }}>
                {link.name}
              </Box>
            ))}
          </HStack>

          <HStack spacing={{ base: "2px", md: "20px" }}>
            
            {/* AUTH SECTION */}
            {isLoggedIn ? (
              <HStack spacing={2}>
                <Text fontSize="14px" fontWeight="600" color="black" display={{ base: "none", lg: "block" }}>
                  Hi, {userData.firstName}
                </Text>
                <IconButton variant="ghost" color="black" p={{ base: "4px", md: "8px" }} _hover={{ color: "red.500" }} onClick={handleLogout} title="Logout">
                  <MdLogout size="26px" />
                </IconButton>
              </HStack>
            ) : (
              <IconButton as={RouterLink} to="/login" variant="ghost" color="black" p={{ base: "4px", md: "8px" }} _hover={iconHoverStyle}>
                <MdPersonOutline size="28px" />
              </IconButton>
            )}

            <DialogRoot open={isSearchOpen} onOpenChange={(e) => setIsSearchOpen(e.open)}>
              <DialogTrigger asChild>
                <IconButton variant="ghost" color="black" p={{ base: "4px", md: "8px" }} _hover={iconHoverStyle}>
                  <MdSearch size="28px" />
                </IconButton>
              </DialogTrigger>
              <DialogBackdrop />
              <DialogContent borderRadius="15px" mt="100px" bg="white" boxShadow="2xl">
                <DialogHeader borderBottom="1px solid #eee" p={4}>
                  <HStack w="100%">
                    <MdSearch color="#B88E2F" size="24px" />
                    <Input placeholder="Search for furniture..." variant="plain" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    <DialogCloseTrigger position="static"><MdClose size="20px" /></DialogCloseTrigger>
                  </HStack>
                </DialogHeader>
                <DialogBody p={0} maxH="400px" overflowY="auto">
                  {isLoading && <Center p={8}><Spinner color="#B88E2F" /></Center>}
                  {results.map((product) => (
                    <HStack key={product.id} p={4} _hover={{ bg: "#F9F1E7" }} cursor="pointer" onClick={() => { navigate(`/product/${product.id}`); setIsSearchOpen(false); }}>
                      <Image src={product.thumbnail} boxSize="45px" borderRadius="6px" objectFit="cover" />
                      <Box flex={1}>
                        <Text fontWeight="600" color="black" fontSize="14px">{product.title}</Text>
                        <Text fontSize="12px" color="gray.500">{product.category}</Text>
                      </Box>
                      <Text fontWeight="700" color="#B88E2F">Rs. {product.price}</Text>
                    </HStack>
                  ))}
                </DialogBody>
              </DialogContent>
            </DialogRoot>

            <Box position="relative">
              <IconButton as={RouterLink} to="/wishlist" variant="ghost" color="black" p={{ base: "4px", md: "8px" }} _hover={iconHoverStyle}>
                <MdFavoriteBorder size="28px" />
              </IconButton>
              {wishlistCount > 0 && (
                <Circle position="absolute" top={{ base: "2px", md: "5px" }} right={{ base: "2px", md: "5px" }} bg="red.500" color="white" size="16px" fontSize="10px" fontWeight="bold">
                  {wishlistCount}
                </Circle>
              )}
            </Box>

            <Box position="relative">
              <IconButton as={RouterLink} to="/cart" variant="ghost" color="black" p={{ base: "4px", md: "8px" }} _hover={iconHoverStyle}>
                <MdOutlineShoppingCart size="28px" />
              </IconButton>
              {cartCount > 0 && (
                <Circle position="absolute" top={{ base: "2px", md: "5px" }} right={{ base: "2px", md: "5px" }} bg="#B88E2F" color="white" size="16px" fontSize="10px" fontWeight="bold">
                  {cartCount}
                </Circle>
              )}
            </Box>
          </HStack>
        </Flex>
      </Container>

      {/* --- MOBILE SIDEBAR DRAWER --- */}
      {isSidebarOpen && (
        <>
          <Box position="fixed" top="0" left="0" w="100vw" h="100vh" bg="blackAlpha.700" zIndex="1100" onClick={() => setIsSidebarOpen(false)} />
          <Box position="fixed" top="0" left="0" w="280px" h="100vh" bg="white" zIndex="1200" p={6} boxShadow="2xl">
            <VStack align="stretch" spacing={8} h="100%">
              <Flex justify="space-between" align="center">
                <HStack>
                  <Image src="/src/assets/Meubel House_Logos-05.png" h="24px" />
                  <Heading fontSize="22px" color="black">Furniro</Heading>
                </HStack>
                <IconButton variant="ghost" _hover={{ bg: "transparent", color: "#B88E2F" }} onClick={() => setIsSidebarOpen(false)}><MdClose size="28px" /></IconButton>
              </Flex>
              <Separator />
              <VStack align="start" spacing={6} pl={2} flex={1}>
                {navLinks.map((link) => (
                  <Box as={RouterLink} to={link.path} key={link.name} fontSize="18px" fontWeight="500" color="black" w="100%" onClick={() => setIsSidebarOpen(false)} _hover={{ color: "#B88E2F" }}>
                    {link.name}
                  </Box>
                ))}
              </VStack>

              <Box pt={4} borderTop="1px solid #eee">
                {isLoggedIn ? (
                  <VStack align="start" spacing={4}>
                    <Text fontWeight="600" color="#B88E2F">Hi, {userData.firstName}</Text>
                    <HStack spacing={3} cursor="pointer" onClick={handleLogout} _hover={{ color: "red.500" }}>
                      <MdLogout size="24px" />
                      <Text fontWeight="500">Logout</Text>
                    </HStack>
                  </VStack>
                ) : (
                  <HStack as={RouterLink} to="/login" spacing={3} p={2} onClick={() => setIsSidebarOpen(false)} _hover={{ color: "#B88E2F" }}>
                    <MdPersonOutline size="24px" />
                    <Text fontWeight="500">Login / Register</Text>
                  </HStack>
                )}
              </Box>
            </VStack>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Navbar;