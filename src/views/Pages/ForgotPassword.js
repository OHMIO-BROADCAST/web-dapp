import React, { useState } from "react";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Icon,
  Link,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import signInImage from "assets/img/signInImage.png";

import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import {
  Backdrop,
  CircularProgress,
  Snackbar,
} from '@material-ui/core';
import { useMoralis } from "react-moralis";
import Swal from "sweetalert2";
import './SignInAnimation.css';

function ForgotPassword() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.800");
  const titleColor = useColorModeValue("gray.700", "navy.500");
  const colorIcons = useColorModeValue("gray.700", "white");
  const bgIcons = useColorModeValue("trasnparent", "navy.700");
  const bgIconsHover = useColorModeValue("gray.50", "whiteAlpha.100");

  const [showSnackBar, setShowSnackBar] = useState(false)
  const [typeSnackBar, setTypeSnackBar] = useState("success")
  const [descriptionSnackBar, setDescriptionSnackBar] = useState("")

  const { login } = useMoralis();


  async function sendEmailVerification(userCredential, resetForm) {
    userCredential.user.sendEmailVerification()
      .then(() => {
        setShowSnackBar(true);
        setTypeSnackBar('success');
        setDescriptionSnackBar('Email verification sended');
        resetForm()
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        setShowSnackBar(true);
        setTypeSnackBar('error');
        setDescriptionSnackBar(errorMessage);
      });
  }



  return (
    <Flex position='relative' mb='40px'>
      <Flex
        minH={{ md: "1000px" }}
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w='100%'
        maxW='1044px'
        mx='auto'
        justifyContent='space-between'
        mb='30px'
        pt={{ md: "0px" }}>
        <Flex
          w='100%'
          h='100%'
          alignItems='center'
          justifyContent='center'
          mb='60px'
          mt={{ base: "50px", md: "20px" }}>
          <Flex
            zIndex='2'
            direction='column'
            w='445px'
            background='transparent'
            borderRadius='15px'
            p='40px'
            mx={{ base: "100px" }}
            m={{ base: "20px", md: "auto" }}
            bg={bgForm}
            boxShadow={useColorModeValue(
              "0px 5px 14px rgba(0, 0, 0, 0.05)",
              "unset"
            )}>
            <Text
              fontSize='xl'
              color={textColor}
              fontWeight='bold'
              textAlign='center'
              mb='22px'>
              Forgot Password
            </Text>

            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address')
                  .required('Required')
              })}
              onChange={(e) => { console.log(e) }}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                console.log('SUBMIT', values)

                /*  userToLogin.set("email", values.email);
                 userToLogin.set("password", values.password);
   
                 console.log('SUBMIT USER FINAL:', userToLogin);
   
                 try {
                   const response = await userToLogin.signUp();
                   // Hooray! Let them use the app now.
                   console.log("REGISTER SUCCESSFUL", response)
                   setSubmitting(false);
                   Swal.fire('Successful login', response, 'success')
                 } catch (error) {
                   // Show the error message somewhere and let the user try again.
                   const errorCode = error.code;
                   const errorMessage = error.message;
                   // ..
                   setSubmitting(false);
                   setShowSnackBar(true);
                   setTypeSnackBar('error');
                   setDescriptionSnackBar(errorMessage);
                   Swal.fire('Please check and try again', error.message, 'error')
                 } */

                login(
                  values.email
                )
                  .then((response) => {
                    if (response) {
                      console.log("Access Granted", response)
                      setSubmitting(false);
                      Swal.fire('Access Granted', '', 'success')
                      /* if (response != null && response.user) {
                        const isverified = response.user.emailVerified;
                        if (isverified) {
                          console.log('user', 'user is verified');
                        } else {
                          console.log('user', 'user is NOT verified');
                          try {
                            sendEmailVerification(response)
  
                          } catch (error) {
                            setShowSnackBar(true);
                            setTypeSnackBar('error');
                            setDescriptionSnackBar('Error sennding email verification')
                          }
                        }
                      } */

                      resetForm();
                    } else {
                      setSubmitting(false);
                      setShowSnackBar(true);
                      setTypeSnackBar('error');
                      Swal.fire('Please check and try again', '', 'error')
                    }

                  })
                  .catch((error) => {
                    console.log(error)
                    // Show the error message somewhere and let the user try again.
                    console.log(error)
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                    setSubmitting(false);
                    setShowSnackBar(true);
                    setTypeSnackBar('error');
                    setDescriptionSnackBar(errorMessage);
                    Swal.fire('Please check and try again', String(errorMessage), 'error')
                  });

                /* signup(
                  values.email,
                  values.password
                ).then((userCredential) => {
                  // Signed in
                  const user = userCredential.user;
            // ...
            console.log(userCredential);
  
            setSubmitting(false);
  
            if (userCredential != null && userCredential.user) {
                    const isverified = userCredential.user.emailVerified;
            if (isverified) {
              console.log('user', 'user is verified');
                    } else {
              console.log('user', 'user is NOT verified');
            try {
              sendEmailVerification(userCredential)
  
            } catch (error) {
              setShowSnackBar(true);
            setTypeSnackBar('error');
            setDescriptionSnackBar('Error sennding email verification')
                      }
  
                    }
                  }
                })
                  .catch((error) => {
                    const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            setSubmitting(false);
            setShowSnackBar(true);
            setTypeSnackBar('error');
            alert(errorCode)
            setDescriptionSnackBar(errorMessage);
  
                  })*/
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values
              }) => (
                <>
                  <form onSubmit={handleSubmit}>
                    <FormControl>
                      <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                        Email
                      </FormLabel>
                      <Input
                        variant='auth'
                        fontSize='sm'
                        ms='4px'
                        type='email'
                        placeholder='Your email address'
                        size='lg'
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                      />
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
                        <ErrorMessage name="email" style={{ paddingTop: '0' }} />
                      </div>

                      <Flex
                        flexDirection='column'
                        justifyContent='center'
                        alignItems='center'
                        maxW='100%'
                        mt='0px'>
                        <Text color={textColor} fontWeight='medium'>
                          Sign In instead
                          <NavLink
                            color={titleColor}
                            to="/auth/forgot-password"
                            as='span'
                            ms='5px'
                            href='/signin'
                            fontWeight='bold'>
                            <text style={{ textDecoration: 'underline', fontWeight: 'bold', marginLeft: '1rem' }}>Click Here</text>

                          </NavLink>
                        </Text>
                      </Flex>
                      <Button
                        fontSize='10px'
                        variant='dark'
                        fontWeight='bold'
                        w='100%'
                        h='45'
                        disabled={isSubmitting}
                        onClick={handleSubmit}>
                        SEND RESET LINK
                      </Button>
                    </FormControl>
                  </form>

                  <Backdrop
                    open={isSubmitting}
                    style={{
                      zIndex: 20,
                      color: '#fff'
                    }}
                  >
                    <CircularProgress color="inherit" style={{ color: '#03CFB3' }} />
                  </Backdrop>
                </>)}
            </Formik>


            <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              maxW='100%'
              mt='0px'>
              <Text color={textColor} fontWeight='medium'>
                Don't have an account?
                <NavLink
                  color={titleColor}
                  to="/auth/signup"
                  as='span'
                  ms='5px'
                  href='#'
                  fontWeight='bold'>
                  <text style={{ textDecoration: 'underline', fontWeight: 'bold', marginLeft: '1rem' }}>Register Here</text>

                </NavLink>
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box
          overflowX='hidden'
          h='100%'
          w='100%'
          left='0px'
          position='absolute'
          className="bodyAnimation">
          <Box
            w='100%'
            h='100%'
            bgSize='cover'
            bg='navy.500'
            opacity='0'>

          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default ForgotPassword;
