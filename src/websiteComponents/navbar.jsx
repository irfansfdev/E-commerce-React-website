import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Container,
  IconButton,
  Image,
  Input,
  Text,
  VStack,
  Spinner,
} from "@chakra-ui/react";

// Standard Chakra v3 Dialog Imports
import {
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
  DialogBackdrop,
  DialogCloseTrigger,
} from "@/components/ui/dialog"; 

import {
  MdPersonOutline,
  MdSearch,
  MdFavoriteBorder,
  MdOutlineShoppingCart,
  MdClose,
} from "react-icons/md";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Search Logic: Fetches from DummyJSON API
  useEffect(() => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${searchQuery}&limit=5`
        );
        const data = await response.json();
        setResults(data.products);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleProductClick = (id) => {
    setIsOpen(false);
    setSearchQuery("");
    navigate(`/product/${id}`);
  };

  // Reusable hover style for all icons
  const iconHoverStyle = {
    bg: "transparent",
    color: "#B88E2F",
    transform: "scale(1.1)",
  };

  return (
    <Box 
      as="nav" 
      bg="white" 
      py="25px" 
      position="sticky" 
      top="0" 
      zIndex="1000" 
      boxShadow="sm"
    >
      <Container maxW="full">
        <Flex align="center" justify="space-between">
          
          {/* --- LOGO --- */}
          <RouterLink to="/">
            <HStack spacing={2} align="center">
              <Image 
                src="/src/assets/Meubel House_Logos-05.png" 
                alt="Logo" 
                h="32px" 
                w="auto" 
              />
              <Heading fontSize="30px" fontWeight="700" color="black">
                Furniro
              </Heading>
            </HStack>
          </RouterLink>

          {/* --- NAVIGATION LINKS --- */}
          <HStack 
            as="ul" 
            listStyleType="none" 
            gap="50px" 
            display={{ base: "none", md: "flex" }}
          >
            {[
              { name: "Home", path: "/" }, 
              { name: "Shop", path: "/shop" }, 
              { name: "About", path: "/about" }, 
              { name: "Contact", path: "/contact" }
            ].map((link) => (
              <Box 
                as={RouterLink} 
                to={link.path} 
                key={link.name} 
                fontWeight="500" 
                color="black"
                transition="0.3s"
                _hover={{ color: "#B88E2F", textDecoration: "none" }}
              >
                {link.name}
              </Box>
            ))}
          </HStack>

          {/* --- ACTION ICONS --- */}
          <HStack spacing="25px">
            
            {/* Account Icon */}
            <IconButton 
              variant="ghost" 
              color="black" 
              bg="transparent"
              transition="0.3s"
              _hover={iconHoverStyle}
            >
              <MdPersonOutline size="28px" />
            </IconButton>

            {/* SEARCH DIALOG */}
            <DialogRoot open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
              <DialogTrigger asChild>
                <IconButton 
                  variant="ghost" 
                  color="black" 
                  bg="transparent"
                  aria-label="Search"
                  transition="0.3s"
                  _hover={iconHoverStyle}
                >
                  <MdSearch size="28px" />
                </IconButton>
              </DialogTrigger>
              
              <DialogBackdrop />
              
              <DialogContent borderRadius="15px" mt="100px" bg="white" boxShadow="2xl">
                <DialogHeader borderBottom="1px solid #eee" p={4}>
                  <HStack>
                    <MdSearch color="#B88E2F" size="24px" />
                    <Input
                      placeholder="Search for furniture..."
                      variant="plain"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      _focus={{ boxShadow: "none" }}
                      
                      
                    />
                    <DialogCloseTrigger position="static">
                       <MdClose size="20px" />
                    </DialogCloseTrigger>
                  </HStack>
                </DialogHeader>
                
                <DialogBody p={0}>
                  {isLoading && (
                    <Flex justify="center" p={8}><Spinner color="#B88E2F" /></Flex>
                  )}
                  
                  {!isLoading && results.map((product) => (
                    <HStack 
                      key={product.id} 
                      p={4} 
                      _hover={{ bg: "#F9F1E7" }} 
                      cursor="pointer" 
                      onClick={() => handleProductClick(product.id)}
                      transition="0.2s"
                    >
                      <Image 
                        src={product.thumbnail} 
                        boxSize="50px" 
                        borderRadius="8px" 
                        objectFit="cover" 
                      />
                      <Box flex={1}>
                        <Text fontWeight="600" color="black">{product.title}</Text>
                        <Text fontSize="12px" color="gray.500">{product.category}</Text>
                      </Box>
                      <Text fontWeight="600" color="#B88E2F">
                        Rp {(product.price * 1000).toLocaleString()}
                      </Text>
                    </HStack>
                  ))}
                  
                  {!isLoading && searchQuery.length >= 2 && results.length === 0 && (
                    <Box p={6} textAlign="center">
                      <Text color="gray.500">No results found for "{searchQuery}"</Text>
                    </Box>
                  )}
                </DialogBody>
              </DialogContent>
            </DialogRoot>

            {/* Wishlist Icon */}
            <IconButton 
              variant="ghost" 
              color="black" 
              bg="transparent"
              transition="0.3s"
              _hover={iconHoverStyle}
            >
              <MdFavoriteBorder size="28px" />
            </IconButton>

            {/* Cart Icon */}
            <IconButton 
              as={RouterLink} 
              to="/cart" 
              variant="ghost" 
              color="black" 
              bg="transparent"
              transition="0.3s"
              _hover={iconHoverStyle}
            >
              <MdOutlineShoppingCart size="28px" />
            </IconButton>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;