import Layout from "@/layouts/Front";
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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Head from "next/head";

export default function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      alert(JSON.stringify(values, null, 2));
    },
  });

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
            h={'100%'}
          >
            <Box bg={useColorModeValue("gray.200", "gray.700")}>
            </Box>
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
                <form onSubmit={formik.handleSubmit}>
                  <Flex flexDir={"column"} py={2} gap={2}>
                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        placeholder="Email address"
                      />
                      <FormHelperText>
                        This is your university email.
                      </FormHelperText>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Password</FormLabel>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        placeholder="Password"
                      />
                    </FormControl>
                    <Button type="submit" mt={2}>
                      Login
                    </Button>
                    <Box>
                      <Text fontSize={'sm'} color={'gray.500'}>
                        Don't have an account?{' '}
                        <Link href="./register" fontSize={'sm'} textDecor={'underline'}>Register here.</Link>
                      </Text>
                      <Link fontSize={'sm'} color={'gray.500'} href="./forgot">Forgot your password?</Link>
                    </Box>
                  </Flex>
                </form>

              </Box>
            </Box>
          </Grid>
        </Container>
      </Flex>
    </>
  );
}

Login.getLayout = (page: any) => <Layout>{page}</Layout>;
