// import { ChakraProvider } from '@chakra-ui/react'
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Axios from "axios";
// import {
//   Card,
//   CardBody,
//   Image,
//   Stack,
//   Heading,
//   Center,
//   CardFooter,
//   Button,
//   Box


// } from '@chakra-ui/react';


// export const Home = () => {


//   return (
//     <ChakraProvider>

//     </ChakraProvider>
//   )
// }

import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  ChakraProvider,
  Container,
  SimpleGrid,
  Text,
  VisuallyHidden,
  chakra,
  Center,
  Card,
  CardBody,
  Image,
  Heading,
  CardFooter,

  VStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  href,

} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from 'react-icons/md';
import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs';
import {FaGlobe} from 'react-icons/fa';

const Links = ['Dashboard', 'Projects', 'Team'];

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};


const Home = () => {
  const navigate = useNavigate();
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [accuracy, setAccuracy] = useState('');

  const location = useLocation();
  const { username } = location.state;
  console.log(username);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Function to request location access and fetch location
    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
  
          // Update the state variables
          setLatitude(latitude);
          setLongitude(longitude);
          setAccuracy(accuracy);
  
          console.log(latitude, longitude, accuracy);
  
          // Make a POST request using Axios
          Axios.post("https://iot-project-red.vercel.app/", {
            _id: username,
            latitude,
            longitude,
            accuracy
          }).then(function (response) {
            console.log(response);
          });
        },
        (error) => {
          console.error(error);
          // Handle error accessing location here
        }
      );
    };
  
    // Fetch location immediately after component mounts
    fetchLocation();
  
    // Interval to fetch location every 20 seconds
    const interval = setInterval(fetchLocation, 20000);
  
    // Clear the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []); // Empty dependency array to run the effect only once on component mount
  
  
  
  
  


  return (
   
      <ChakraProvider>
        
        <Flex direction="column"  h="100%">
          <Box bg={useColorModeValue('gray.200', 'gray.900')} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
              <HStack spacing={8} alignItems={'center'}>
                <Box
                  w="40px"
                  h="40px"
                  bg={`url("https://ict.iitk.ac.in/wp-content/uploads/vit-logo.jpg")`}
                  bgSize="cover"
                  borderRadius="full"
                />

              </HStack>
              <Flex alignItems={'center'}>
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}>
                    <Avatar
                      size={'sm'}
                      src={
                        'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                      }
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Account</MenuItem>
                    <MenuItem>Help</MenuItem>
                    <MenuDivider />
                    <MenuItem><Button colorScheme='teal' onClick={() => navigate("/")}>Log Out</Button></MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </Flex>
            <Flex>

            </Flex>

          </Box>

          
            <Box  width={'100%'} justifyContent={'center'}  alignItems={'center'} textAlign={'center'} height='80vh' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              latitude : {latitude} 
              <br/>
              <br/>
              longitude: {longitude}
            </Box>
          
          
          {/* <Flex flex='1' justifyContent="center" >
            <Container bg="#9DC4FB" maxW="full" mt={0} centerContent overflow="hidden">
              <Flex>
                <Box
                  bg="#02054B"
                  color="white"
                  borderRadius="lg"
                  m={{ sm: 4, md: 16, lg: 6 }}
                  p={{ sm: 5, md: 5, lg: 10 }}
                  mt={0}
                  >
                  <Box p={4} mt={0}>
                    <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                      <WrapItem>
                        <Box>
                          <Heading>Contact</Heading>
                          <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                            Fill up the form below to contact the Developer
                          </Text>
                          <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                            <VStack pl={0} spacing={3} alignItems="flex-start">
                              <Button
                                size="md"
                                height="38px"
                                width="200px"
                                variant="ghost"
                                color="#DCE2FF"
                                _hover={{ border: '2px solid #1C6FEB' }}
                                leftIcon={<MdPhone color="#1970F1" size="20px" />}
                                onClick = {()=>window.open('tel:+91-8106095150')}
                                >
                                +91-8106095150
                              </Button>
                              <Button
                                size="md"
                                height="48px"
                                width="300px"
                                variant="ghost"
                                color="#DCE2FF"
                                _hover={{ border: '2px solid #1C6FEB' }}
                                leftIcon={<MdEmail color="#1970F1" size="20px" />}
                                onClick={()=>window.open('mailto:chaitanyasai.m.5@gmail.com')}
                                >
                                  chaitanyasai.m.5@gmail.com
                              </Button>
                              <Button
                                size="md"
                                height="48px"
                                width="200px"
                                variant="ghost"
                                color="#DCE2FF"
                                _hover={{ border: '2px solid #1C6FEB' }}
                                leftIcon={<MdLocationOn color="#1970F1" size="20px" />}
                                onClick={() => window.open('https://www.google.com/maps/place/VIT+MAIN+GATE/@12.9682351,79.1532929,17z/data=!3m1!4b1!4m6!3m5!1s0x3bad47e799e239f3:0x5c50fad394e65181!8m2!3d12.9682299!4d79.1558678!16s%2Fg%2F11h_bpvnpn?entry=ttu', '_blank')}
                                >
                                VIT Vellore, India
                              </Button>
                            </VStack>
                          </Box>
                          <HStack
                            mt={{ lg: 10, md: 10 }}
                            spacing={5}
                            px={5}
                            alignItems="flex-start">
                            <IconButton
                              aria-label="instagram"
                              variant="ghost"
                              size="lg"
                              isRound={true}
                              _hover={{ bg: '#0D74FF' }}
                              icon={<FaInstagram size="28px" />}
                              onClick={()=>window.open('https://www.instagram.com/chaitanyasai.m.3/','_blank')}
                            />
                            <IconButton
                              aria-label="github"
                              variant="ghost"
                              size="lg"
                              isRound={true}
                              _hover={{ bg: '#0D74FF' }}
                              icon={<BsGithub size="28px" />}
                              onClick={()=>window.open('https://github.com/chaitanya-sai-1729','_blank')}
                            />
                            <IconButton
                              aria-label="Portfolio"
                              variant="ghost"
                              size="lg"
                              isRound={true}
                              _hover={{ bg: '#0D74FF' }}
                              icon={<FaGlobe size="28px" />}
                              onClick={()=>window.open('https://portfolio1-alpha-inky.vercel.app/','_blank')}
                            />
                          </HStack>
                        </Box>
                      </WrapItem>
                      <WrapItem >
                        <Box bg="white" borderRadius="lg" >
                          <Box m={8} color="#0B0E3F" justify={'center'}>
                            <VStack spacing={5}>
                              <FormControl id="name">
                                <FormLabel>Your Name</FormLabel>
                                <InputGroup borderColor="#E0E1E7">
                                  <InputLeftElement
                                    pointerEvents="none"
                                    children={<BsPerson color="gray.800" />}
                                  />
                                  <Input type="text" size="md" />
                                </InputGroup>
                              </FormControl>
                              <FormControl id="name">
                                <FormLabel>Mail</FormLabel>
                                <InputGroup borderColor="#E0E1E7">
                                  <InputLeftElement
                                    pointerEvents="none"
                                    children={<MdOutlineEmail color="gray.800" />}
                                  />
                                  <Input type="text" size="md" />
                                </InputGroup>
                              </FormControl>
                              <FormControl id="name">
                                <FormLabel>Message</FormLabel>
                                <Textarea
                                  borderColor="gray.300"
                                  _hover={{
                                    borderRadius: 'gray.300',
                                  }}
                                  placeholder="message"
                                />
                              </FormControl>
                              <FormControl id="name" float="right">
                                <Button
                                  variant="solid"
                                  bg="#0D74FF"
                                  color="white"
                                  _hover={{}}>
                                  Send Message
                                </Button>
                              </FormControl>
                            </VStack>
                          </Box>
                        </Box>
                      </WrapItem>
                    </Wrap>
                  </Box>
                </Box>
              </Flex>
            </Container>
          </Flex> */}


          <Flex bg="white" alignItems={"center"} justifyContent={"space-between"}>
            <Box
              bg={useColorModeValue('gray.50', 'gray.900')}
              color={useColorModeValue('gray.700', 'gray.200')}
              flex="1"
            >
              <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}

              >
                <Text ml={5}>© VIT. All Rights Reserved.</Text>
                <Stack direction={'row'} spacing={6} >
                  <SocialButton label={'Twitter'} href={'https://twitter.com/VIT_univ?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor'}>
                    <FaTwitter />
                  </SocialButton>
                  <SocialButton label={'YouTube'} href={'https://www.youtube.com/channel/UCA9pirjKrKlg2bCvPKRDkyg'}>
                    <FaYoutube />
                  </SocialButton>
                  <SocialButton label={'Instagram'} href={'https://www.instagram.com/vellore_vit/?hl=en'}>
                    <FaInstagram />
                  </SocialButton>
                </Stack>
              </Container>
            </Box>
          </Flex>
        </Flex>
  
      </ChakraProvider>
  
  );
}

export default Home;