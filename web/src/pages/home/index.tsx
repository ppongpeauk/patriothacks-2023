import { useAuthContext } from "@/contexts/AuthContext";
import Layout from "@/layouts/Main";
import { Box, Container, Heading, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";

export default function Home() {
  const { currentUser } = useAuthContext();

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <>
      <Box w={"100%"} h={48} bg={"black"}>
        <Image
          src={"/assets/branding/front-hero.png"}
          alt={"Hero"}
          objectFit={"cover"}
          objectPosition={"center"}
          w={"full"}
          h={"full"}
        />
      </Box>
      <Container maxW={"container.lg"} py={16} gap={8}>
        {/* hero */}
        <Box as={"section"}>
          <Heading as={"h1"}>Welcome home, {currentUser?.name}!</Heading>
          <Text variant={"subtitle"} pt={1}>
            This is your dashboard.
          </Text>
        </Box>
        {/* recommended for you */}
        <Box as={"section"} py={8}>
          <Heading as={"h2"} size={"lg"}>
            For you
          </Heading>
          <Text variant={"subtitle"} pt={1}>
            Here are some things we think you might like.
          </Text>
        </Box>
      </Container>
    </>
  );
}

Home.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
