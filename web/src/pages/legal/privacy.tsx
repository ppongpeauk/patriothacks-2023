import Layout from "@/layouts/Main";
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";

export default function LegalPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy - PeerPort</title>
      </Head>
      <Box w={"100%"} h={48} bg={"black"}></Box>
      <Container maxW={"container.lg"} minH={"calc(100vh - 6rem)"} py={16}>
        <Heading fontSize={"6xl"} fontWeight={"bold"}>
          Privacy Policy
        </Heading>
        <Text fontSize={"lg"} pt={2}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          euismod, nisl eget ultricies ultrices, nunc nisl ultricies nunc, sit
          amet ultricies nisl nunc eget nunc. Donec euismod, nisl eget ultricies
          ultrices, nunc nisl ultricies nunc, sit amet ultricies nisl nunc eget
          nunc. Donec euismod, nisl eget ultricies ultrices, nunc nisl ultricies
          nunc, sit amet ultricies nisl nunc eget nunc. Donec euismod, nisl eget
          ultricies ultrices, nunc nisl ultricies nunc, sit amet ultricies nisl
          nunc eget nunc. Donec euismod, nisl eget ultricies ultrices, nunc nisl
          ultricies nunc, sit amet ultricies nisl nunc eget nunc. Donec euismod,
          nisl eget ultricies ultrices, nunc nisl ultricies nunc, sit amet
          ultricies nisl nunc eget nunc.
        </Text>
      </Container>
    </>
  );
}

LegalPage.getLayout = (page: any) => <Layout>{page}</Layout>;
