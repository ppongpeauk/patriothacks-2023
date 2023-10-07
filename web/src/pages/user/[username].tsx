import Layout from "@/layouts/Main";
import { Container } from "@chakra-ui/react";
import Head from "next/head";

export default function User() {
  return (
    <>
      <Head>
        <title>Settings - PeerPort</title>
      </Head>
      <Container
        as={"main"}
        maxW={"container.md"}
        minH={"calc(100dvh - 6rem)"}
        py={8}
      ></Container>
    </>
  );
}

User.getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>;
