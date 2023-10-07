import Layout from "@/layouts/Main";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  StackDivider,
  Text,
  VStack,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";

import { Listing } from "@/types";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import Head from "next/head";
import { AiFillStar, AiOutlineHeart, AiTwotoneMail } from "react-icons/ai";
import { BiLeftArrowAlt } from "react-icons/bi";
import { FaSmileWink } from "react-icons/fa";
import { IoIosShare } from "react-icons/io";

export function getServerProps({ id }: { id: string }) {
  const data = {} as Listing;

  return {
    props: { data },
  };
}

export default function Listing({ id }: { id: string }) {
  return (
    <>
      <Head>
        <title>Listing - PeerPort</title>
      </Head>
      <Container as={"main"} maxW={"container.xl"} py={8}>
        <Flex
          id="title"
          flexDir={"column"}
          align={"flex-start"}
          justify={"flex-start"}
        >
          <Box flexGrow={1}>
            <Flex align={"center"}>
              <Button
                as={Link}
                href={"/@eve"}
                variant={"ghost"}
                leftIcon={
                  <Flex align={"center"}>
                    <BiLeftArrowAlt size={"24px"} />
                  </Flex>
                }
                size={"lg"}
                px={4}
              >
                Return to Eve&apos;s Shop
              </Button>
            </Flex>
          </Box>
        </Flex>
        <Grid
          position={"relative"}
          id={"main-stack"}
          templateColumns={["auto", "repeat(2, 1fr)"]}
          templateRows={"auto"}
          my={4}
          w={"100%"}
          h={"100%"}
          justifyItems={"center"}
          flexGrow={1}
        >
          <Box>
            <Grid id="media" maxW={"100%"} gap={4} templateRows={"auto"}>
              <GridItem>
                <Image
                  src={
                    "https://media-photos.depop.com/b1/42044152/1549581385_52d91cd83a6e446d96f92507b391e36f/P0.jpg"
                  }
                  alt={"Item Image"}
                  aspectRatio={1 / 1}
                  objectFit={"cover"}
                />
              </GridItem>
              <GridItem>
                <Image
                  src={
                    "https://media-photos.depop.com/b1/42044152/1549581407_b83c9c3ea13e464980df8b8513e90d4b/P0.jpg"
                  }
                  alt={"Item Image"}
                  aspectRatio={1 / 1}
                  objectFit={"cover"}
                />
              </GridItem>
            </Grid>
            <Box id="description" my={8}></Box>
          </Box>
          <Box
            position={"relative"}
            maxW={["auto", "480px"]}
            px={[0, 8]}
            flexBasis={1}
            bottom={"2rem"}
            h={"100%"}
            flex={1}
          >
            <Box
              position={["static", "sticky"]}
              top={"6rem"}
              pt={"2rem"}
              mb={2}
              w={"100%"}
              bg={useColorModeValue("white", "gray.800")}
              zIndex={500}
              borderBottom={"1px solid"}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <Text fontSize={"sm"} mb={1}>
                CLOTHING
              </Text>
              <Text
                fontSize={"2xl"}
                fontWeight={"bold"}
                letterSpacing={"tight"}
              >
                The North Face Women&apos;s White Jacket
              </Text>
              <Text py={1} fontSize={"lg"}>
                $15.99
              </Text>
              <Button
                as={Link}
                href={"/listing/1"}
                variant={"ghost"}
                h={"min-content"}
                my={2}
                w={"100%"}
                textDecor={"none !important"}
              >
                <Flex align={"center"} py={4} w={"100%"}>
                  <Avatar
                    src={
                      "https://images-ext-1.discordapp.net/external/ap0awC8S5IcVbkl4OO70LMn6tF-Zmhbn-5dxudddn9w/%3Fsize%3D240/https/media.discordapp.net/stickers/1052858688483905546.webp?width=480&height=480"
                    }
                    mr={4}
                    size={"lg"}
                    outline={"1px solid"}
                    outlineColor={useColorModeValue("gray.200", "gray.700")}
                    bg={useColorModeValue("gray.200", "gray.700")}
                  />
                  <Flex
                    flexDir={"column"}
                    align={"flex-start"}
                    justify={"space-evenly"}
                  >
                    <Text fontSize={"md"} fontWeight={"bold"}>
                      Eve Holloway
                    </Text>
                    <Flex align={"center"}>
                      <AiFillStar size={"16px"} />
                      <Text
                        as={"span"}
                        ml={1}
                        fontSize={"sm"}
                        fontWeight={"normal"}
                        py={1}
                      >
                        4.9 Stars・61 Sales
                      </Text>
                    </Flex>
                    <Text fontSize={"sm"} fontWeight={"normal"}>
                      Arlington, VA
                    </Text>
                  </Flex>
                </Flex>
              </Button>
              <VStack spacing={0} py={4}>
                <Button
                  variant={"solid"}
                  size={"lg"}
                  fontSize={"xl"}
                  letterSpacing={"tighter"}
                  w={"100%"}
                  bg={useColorModeValue("gray.800", "gray.200")}
                  color={useColorModeValue("white", "gray.800")}
                  _hover={{
                    bg: useColorModeValue("gray.700", "gray.300"),
                    color: useColorModeValue("white", "gray.800"),
                  }}
                  _active={{
                    bg: useColorModeValue("gray.600", "gray.400"),
                    color: useColorModeValue("white", "gray.800"),
                  }}
                >
                  Buy Now
                </Button>
                <Button
                  variant={"solid"}
                  size={"lg"}
                  fontSize={"xl"}
                  mt={4}
                  w={"100%"}
                  letterSpacing={"tighter"}
                >
                  Add to Bag
                </Button>
              </VStack>
            </Box>
            <Flex my={4} justify={"space-evenly"}>
              <Button variant={"ghost"} leftIcon={<IoIosShare />} px={4}>
                Share
              </Button>
              <Button variant={"ghost"} leftIcon={<AiOutlineHeart />} px={4}>
                Save
              </Button>
              <Button variant={"ghost"} leftIcon={<AiTwotoneMail />} px={4}>
                Message
              </Button>
            </Flex>
            <VStack
              w={"100%"}
              py={4}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.200", "gray.700")}
                />
              }
            >
              <Flex w={"100%"} align={"center"}>
                <Text fontWeight={"bold"}>Size</Text>
                <Text ml={"auto"}>US Medium</Text>
              </Flex>
              <Flex w={"100%"} align={"center"}>
                <Text fontWeight={"bold"}>Condition</Text>
                <Text ml={"auto"}>Used - Excellent</Text>
              </Flex>
              <Flex w={"100%"} align={"center"}>
                <Text fontWeight={"bold"}>Brand</Text>
                <Link
                  display={"flex"}
                  href="/brand/the-north-face"
                  ml={"auto"}
                  textUnderlineOffset={4}
                  alignItems={"center"}
                >
                  The North Face
                  <ExternalLinkIcon ml={"4px"} />
                </Link>
              </Flex>
              <Flex w={"100%"} align={"center"}>
                <Text fontWeight={"bold"}>Style</Text>
                <Text ml={"auto"}>N/A</Text>
              </Flex>
              <Flex w={"100%"} align={"center"}>
                <Text fontWeight={"bold"}>Color</Text>
                <Text ml={"auto"}>White</Text>
              </Flex>
              <Text
                fontSize={"sm"}
                color={useColorModeValue("gray.400", "gray.500")}
                alignSelf={"flex-start"}
              >
                Listed 2 days ago
              </Text>
            </VStack>

            {/* Listing Description */}
            <Text py={2}>
              Hi there! I&apos;m selling this item because I&apos;m moving out
              of my dorm and I don&apos;t need it anymore. It&apos;s in great
              condition and I&apos;m willing to negotiate the price. Please
              reach out if you have any questions!
            </Text>
            <HStack ml={"auto"} align={"flex-end"} pb={2}>
              <Badge
                rounded={"full"}
                textAlign={"center"}
                px={2}
                w={"min-content"}
              >
                #outerwear
              </Badge>
              <Badge
                rounded={"full"}
                textAlign={"center"}
                px={2}
                w={"min-content"}
              >
                #thenorthface
              </Badge>
            </HStack>

            {/* Seller Info */}
            <HStack
              border={"1px solid"}
              borderColor={useColorModeValue("gray.100", "gray.700")}
              rounded={"lg"}
              w={"100%"}
              p={4}
              my={4}
              spacing={4}
              mb={"auto"}
            >
              <Box px={2}>
                <Avatar
                  src={"/images/avatars/eve.png"}
                  aspectRatio={1 / 1}
                  objectFit={"cover"}
                  size={"lg"}
                />
              </Box>
              <Flex flexDir={"column"}>
                <Text fontSize={"md"} fontWeight={"bold"}>
                  holloway&apos;s hideaway 🌱
                </Text>
                <Text fontSize={"sm"}>
                  just selling some stuff i don&apos;t need anymore !
                </Text>
                <Link
                  href={"/@eve"}
                  textDecor={"underline"}
                  textUnderlineOffset={4}
                  fontSize={"sm"}
                  transition={"all 0.15s ease"}
                  _hover={{ color: ["gray.300", "gray.500"] }}
                >
                  Visit Shop
                </Link>
              </Flex>
            </HStack>

            {/* Buyer's Guarantee */}
            <HStack
              bg={useColorModeValue("gray.100", "gray.700")}
              rounded={"lg"}
              w={"100%"}
              p={4}
              my={4}
              spacing={4}
              mb={"auto"}
            >
              <Box px={2}>
                <FaSmileWink size={"64px"} />
              </Box>
              <Flex flexDir={"column"}>
                <Text fontSize={"md"} fontWeight={"bold"}>
                  Buyer&apos;s Guarantee
                </Text>
                <Text fontSize={"sm"}>
                  If your item does not arrive or is significantly not as
                  described, you&apos;ll be eligible for a full refund.
                </Text>
                <Link
                  href={"/buyers-guarantee"}
                  textDecor={"underline"}
                  textUnderlineOffset={4}
                  fontSize={"sm"}
                  transition={"all 0.15s ease"}
                  _hover={{ color: ["gray.300", "gray.500"] }}
                >
                  Learn More
                </Link>
              </Flex>
            </HStack>
          </Box>
        </Grid>
      </Container>
    </>
  );
}

Listing.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
