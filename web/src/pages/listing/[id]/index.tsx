import Layout from "@/layouts/Main";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Input,
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  StackDivider,
  Text,
  VStack,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";

import { Item, Listing, ListingType, Service } from "@/types";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import { Share } from "next/font/google";
import Head from "next/head";
import { useEffect } from "react";
import { AiFillStar, AiOutlineHeart, AiTwotoneMail } from "react-icons/ai";
import { BiLeftArrowAlt } from "react-icons/bi";
import { FaSmileWink } from "react-icons/fa";
import { IoIosShare } from "react-icons/io";

import { usePurchaseContext } from "@/contexts/PurchaseContext";
import moment from "moment";

const toRelativeTime = (date: Date) => {
  const now = moment();
  const then = moment(date);

  return then.from(now);
};

export async function getServerSideProps({ id }: { id: string }) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_ROOT_URL}/api/v1/listings/${id}`
  ).then((res) => res.json());

  console.log(data);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
}

let USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Listing({ data }: { data: Item | Service | Listing }) {
  const { runPurchaseFlow, purchaseFlowLoading } = usePurchaseContext();

  return (
    <>
      <Head>
        <title>{data.title} - PeerPort</title>
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
                href={`/discover`}
                variant={"ghost"}
                leftIcon={
                  <Flex align={"center"}>
                    <BiLeftArrowAlt size={"24px"} />
                  </Flex>
                }
                size={"lg"}
                px={4}
                textDecor={"none !important"}
              >
                Return to Discover
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
              {data.media.map((media) => (
                <GridItem key={media} w={"100%"} h={"100%"}>
                  <Image
                    src={media}
                    alt={"Item Image"}
                    aspectRatio={1 / 1}
                    objectFit={"cover"}
                  />
                </GridItem>
              ))}
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
              <Text fontSize={"sm"} mb={1} textTransform={"uppercase"}>
                {data.type === ListingType.Item ? "Item" : "Service"}
              </Text>
              <Text
                fontSize={"2xl"}
                fontWeight={"bold"}
                letterSpacing={"tight"}
              >
                {data.title}
              </Text>
              <Text py={1} fontSize={"lg"}>
                {USDollar.format(data.price)}
              </Text>
              <Button
                as={Link}
                href={`/@${data.author.username}`}
                variant={"ghost"}
                h={"min-content"}
                my={2}
                w={"100%"}
                textDecor={"none !important"}
              >
                <Flex align={"center"} py={4} w={"100%"}>
                  <Avatar
                    src={data.author.icon}
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
                      {data.author.name}
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
                      {data.author.college?.name}
                    </Text>
                  </Flex>
                </Flex>
              </Button>
              <VStack spacing={0} py={4}>
                <Button
                  variant={"solid"}
                  size={"lg"}
                  fontSize={"lg"}
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
                  isLoading={purchaseFlowLoading}
                  onClick={(e) => {
                    e.preventDefault();
                    runPurchaseFlow(data);
                  }}
                >
                  {!data.active
                    ? "Not Available"
                    : (data.type === ListingType.Item && "Buy Now") ||
                      (data.type === ListingType.Service && "Book Now")}
                </Button>
              </VStack>
            </Box>
            <Flex my={4} justify={"space-evenly"}>
              <Popover closeOnBlur>
                <PopoverTrigger>
                  <Button variant={"ghost"} leftIcon={<IoIosShare />} px={4}>
                    Share
                  </Button>
                </PopoverTrigger>
                <chakra.div zIndex={999}>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody p={4}>
                      <Heading fontSize={"lg"} mb={4}>
                        Share this listing
                      </Heading>
                      <HStack spacing={2}>
                        <FormControl id="share-link">
                          <Input
                            placeholder={`${process.env.NEXT_PUBLIC_ROOT_URL}/listing/${data.id}`}
                            value={`${process.env.NEXT_PUBLIC_ROOT_URL}/listing/${data.id}`}
                            readOnly
                          />
                          <FormHelperText>
                            Share this link with your friends!
                          </FormHelperText>
                        </FormControl>
                      </HStack>
                    </PopoverBody>
                  </PopoverContent>
                </chakra.div>
              </Popover>
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
              {Object.keys(data.attributes || {}).map((key: string) => (
                <Flex w={"100%"} align={"center"} key={key}>
                  <Text fontWeight={"bold"}>{key}</Text>
                  <Text ml={"auto"}>{data.attributes[key]}</Text>
                </Flex>
              ))}

              {/* <Flex w={"100%"} align={"center"}>
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
              </Flex> */}
              <Text
                fontSize={"sm"}
                color={useColorModeValue("gray.400", "gray.500")}
                alignSelf={"flex-start"}
              >
                Listed {toRelativeTime(new Date(data.createdAt))}
              </Text>
            </VStack>

            {/* Listing Description */}
            {data.description ? (
              <Text py={2}>{data.description}</Text>
            ) : (
              <Text py={2} variant={"subtitle"}>
                No description available.
              </Text>
            )}
            <HStack ml={"auto"} align={"flex-end"} pb={2} gap={2}>
              {data.tags?.map((tag: string) => (
                <Badge
                  as={Link}
                  href={`/discover?term=${tag}`}
                  rounded={"full"}
                  textAlign={"center"}
                  w={"min-content"}
                  px={2}
                  textDecor={"none !important"}
                >
                  #{tag}
                </Badge>
              ))}
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
