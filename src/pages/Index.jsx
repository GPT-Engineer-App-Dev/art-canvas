import { Container, VStack, Box, Text, Flex, Spacer, Button } from "@chakra-ui/react";

const Index = () => {
  return (
    <Container maxW="container.xl" p={0}>
      <Flex as="nav" bg="blue.500" color="white" p={4} align="center">
        <Text fontSize="xl" fontWeight="bold">BrandName</Text>
        <Spacer />
        <Button variant="ghost" colorScheme="whiteAlpha" mr={4}>Home</Button>
        <Button variant="ghost" colorScheme="whiteAlpha" mr={4}>About</Button>
        <Button variant="ghost" colorScheme="whiteAlpha" mr={4}>Services</Button>
        <Button variant="ghost" colorScheme="whiteAlpha">Contact</Button>
      </Flex>
      <Container centerContent maxW="container.md" height="80vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <VStack spacing={4}>
          <Text fontSize="4xl" fontWeight="bold">Welcome to Our Landing Page</Text>
          <Text fontSize="xl" textAlign="center">We are excited to have you here. Explore our services and get to know more about us.</Text>
        </VStack>
      </Container>
    </Container>
  );
};

export default Index;