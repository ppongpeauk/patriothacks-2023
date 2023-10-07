import { AuthContext, useAuthContext } from "@/contexts/AuthContext";
import Layout from "@/layouts/Main";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Image,
  Input,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Field, Form, Formik, useFormik } from "formik";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Login() {
  const { user } = useAuthContext();
  const { push } = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (user) {
      push("/home");
    }
  }, [user, push]);

  return (
    <>
      <Head>
        <title>Login - PeerPort</title>
      </Head>
      {/* main login */}
      <Flex minH={"calc(100dvh - 6rem)"} align={"center"} justify={"center"}>
        <Container
          p={0}
          maxW={"container.md"}
          border={"1px solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          rounded={"lg"}
        >
          <Grid
            display={{
              base: "none",
              md: "grid",
            }}
            templateColumns={"1fr 1fr"}
            h={"100%"}
          >
            <Box bg={useColorModeValue("gray.200", "gray.700")}></Box>
            <Box p={8} pb={32}>
              <Box>
                <Heading fontSize={"3xl"} fontWeight={"bold"}>
                  Login to PeerPort
                </Heading>
                <Text variant={"subtitle"} pt={1}>
                  Please login to your account to continue.
                </Text>
              </Box>
              {/* form */}
              <Box pt={4}>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  onSubmit={async (values, actions) => {
                    await signInWithEmailAndPassword(
                      getAuth(),
                      values.email,
                      values.password
                    )
                      .then(async (userCredential) => {
                        await push("/home");
                      })
                      .catch(async (error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorCode, errorMessage);
                        toast({
                          title: "Error",
                          description: errorMessage,
                          status: "error",
                          duration: 5000,
                          isClosable: true,
                        });
                      });
                  }}
                >
                  {(props) => (
                    <Form>
                      <Field name="email">
                        {({ field, form }: any) => (
                          <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              onChange={props.handleChange}
                              value={field.value}
                              placeholder="Email address"
                            />
                            <FormHelperText>
                              This is your university email.
                            </FormHelperText>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="password">
                        {({ field, form }: any) => (
                          <FormControl mt={4}>
                            <FormLabel>Password</FormLabel>
                            <Input
                              id="password"
                              name="password"
                              type="password"
                              onChange={props.handleChange}
                              value={field.value}
                              placeholder="Password"
                            />
                          </FormControl>
                        )}
                      </Field>
                      <Button
                        type="submit"
                        mt={4}
                        mb={2}
                        isLoading={props.isSubmitting}
                        w={"full"}
                      >
                        Login
                      </Button>
                      <Box>
                        <Text fontSize={"sm"} color={"gray.500"}>
                          Don&apos;t have an account?{" "}
                          <Link
                            href="./register"
                            fontSize={"sm"}
                            textDecor={"underline"}
                          >
                            Register here.
                          </Link>
                        </Text>
                        <Link
                          fontSize={"sm"}
                          color={"gray.500"}
                          href="./forgot"
                        >
                          Forgot your password?
                        </Link>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Box>
          </Grid>
        </Container>
      </Flex>
    </>
  );
}

Login.getLayout = (page: any) => <Layout>{page}</Layout>;
