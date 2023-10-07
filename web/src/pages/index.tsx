import Layout from "@/layouts/Front";
import { Box, Container, Flex, Grid, Heading, Image, Text } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import Head from "next/head";

function HIWTile({ title, description, icon }: { title: string; description: string; icon: string }) {
  return <>
    <Flex
      border={'2px solid'}
      flexDir={['column', 'row']}
      align={'flex-start'}
      justify={'center'}
      w={'full'}
      maxW={'container.xl'}
      mx={'auto'}
      py={8}
      px={4}
    >
      <Box w={'full'} maxW={'lg'} mx={'auto'} px={4}>
        <Heading fontSize={'4xl'} fontWeight={'bold'} pb={2}>{title}</Heading>
        <Text fontSize={'md'}>{description}</Text>
      </Box>
      <Box w={'full'} maxW={'lg'} mx={'auto'} px={4}>
        <Image
          src={icon}
          alt={title}
          w={'full'}
          height={'auto'}
          objectFit={'contain'}
        />
      </Box>
    </Flex>
  </>
}
export default function Home() {
  return (
    <>
      <Head>
        <title>Sell Easy - PeerPort</title>
      </Head>
      <Container maxW={"container.xl"} py={8}>
        {/* main hero */}
        <Box as={'section'}>
          <Heading fontSize={"7xl"} fontWeight={"normal"} my={16}>
            Discover and sell <Text as={'span'} fontWeight={'bold'}>stuff</Text> with<br /><Text as={'span'} fontWeight={'bold'}>PeerPort.</Text>
          </Heading>
          <Image
            src={"/assets/branding/front-hero-colored.png"}
            alt={"Hero"}
            w={"full"}
            height={"720px"}
            objectFit={"cover"}
            boxSizing={'border-box'}
            border={"1px solid"}
            borderColor={"gray.200"}
          />
        </Box>
        {/* how-it-works */}
        <Box as={'section'}>
          <Flex flexDir={'row'} py={16} align={'center'}>
            <Box w={'6px'} h={'64px'} bg={'blackAlpha.800'} mr={4} />
            <Heading fontSize={"5xl"} fontWeight={"bold"}>
              How it works
            </Heading>
          </Flex>
          <Grid
            templateColumns={['repeat(1, 1fr)', 'repeat(3, 1fr)']}
            gap={8}
            pb={16}
          >
            <HIWTile
              title={'Discover'}
              description={'Find stuff you want to buy from people in your college community.'}
              icon={'/assets/branding/front/hiw-discover.png'}
            />
            <HIWTile
              title={'Buy'}
              description={'Buy stuff you want from people in your community.'}
              icon={'/assets/branding/front/hiw-buy.png'}
            />
            <HIWTile
              title={'Sell'}
              description={'PeerPort is a great way to list your services, and sell stuff you don\'t need anymore.'}
              icon={'/assets/branding/front/hiw-sell.png'}
            />
          </Grid>
        </Box>
      </Container>
    </>
  );
}

Home.getLayout = (page: any) => <Layout>{page}</Layout>;
