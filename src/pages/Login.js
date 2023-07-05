import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import {
  Box,
  Card,
  Image,
  Stack,
  Heading,
  Button,
  CardBody,
  CardFooter,
  ChakraProvider,
  Center,
  Input,
  InputLeftAddon,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Divider,
  Text,
  ButtonGroup,
  Checkbox,
  Flex,
  HStack,
  useColorModeValue,






} from '@chakra-ui/react'


function Login() {
  const navigate = useNavigate();

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  const [input, setInput] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (e) => setInput(e.target.value)

  const isError = input === ''



  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const allUsers = await Axios.get('https://iot-project-red.vercel.app/drivers').then((e) => {
        console.log(e.data);
        const arr = e.data;
        let userFound = false;

        for (let i = 0; i < arr.length; i++) {
          if (arr[i]._id === input) {
            userFound = true;

            if (arr[i].password === password) {
              navigate('/Home', { state: { username: input } });
              return;
            } else {
              alert('Incorrect Password');
              return;
            }
          }
        }

        if (!userFound) {
          alert('User not registered');
        }
      });
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <>

<ChakraProvider>
  <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}>
    <Stack spacing={8} mx={'auto'} maxW={'md'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'} textAlign={'center'}>
          Welcome to BusTracker
        </Heading>
        <br />
        <Heading fontSize={'3xl'} textAlign={'center'}>
          Login
        </Heading>
        <Text fontSize={'lg'} color={'gray.600'}>
          to enjoy all of our cool features ✌
        </Text>
      </Stack>
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>
        <Stack spacing={4}>
          <Box>
            <FormControl id="Username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" onChange={(e) => setInput(e.target.value)} />
            </FormControl>
          </Box>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement h={'full'}>
                <Button
                  variant={'ghost'}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }>
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={10} pt={2}>
            <Button
              loadingText="Submitting"
              size="lg"
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={handleLogin}>
              Login
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Flex>
</ChakraProvider>

    </>
  );
}

export default Login;