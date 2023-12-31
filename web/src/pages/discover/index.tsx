import ListingItem from "@/components/discover/ListingItem";
import { useAuthContext } from "@/contexts/AuthContext";
import Layout from "@/layouts/Main";
import { Item, Listing, ListingType, Service } from "@/types";
import {
  Badge,
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface APIListings {
  services: Service[];
  items: Item[];
}

export default function Search() {
  const { query } = useRouter();
  const [listings, setListings] = useState<APIListings>({
    services: [],
    items: [],
  });
  const [listingsLoading, setListingsLoading] = useState<boolean>(true);
  const { user } = useAuthContext();

  useEffect(() => {
    setListingsLoading(true);
    if (!user) return;
    user.getIdToken().then(async (token: any) => {
      await fetch(`/api/v1/discover?term=${query.term || ""}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((data) => data.json())
        .then((res: APIListings | any) => {
          console.log(res);
          setListings(res);
        })
        .catch(() => {
          setListings({
            services: [],
            items: [],
          });
        })
        .finally(() => {
          setListingsLoading(false);
        });
    });
  }, [query, user]);

  return (
    <>
      <Head>
        <title>Discover - PeerPort</title>
      </Head>
      <Box w={"100%"} h={48} bg={"black"}>
        <Image
          src={"/assets/branding/front-hero-colored-alt.png"}
          alt={"Hero"}
          objectFit={"cover"}
          objectPosition={"center"}
          w={"full"}
          h={"full"}
        />
      </Box>
      <Container maxW={"container.xl"} minH={"calc(100vh - 6rem)"} py={16}>
        <Heading size={"xl"}>Discover ✨</Heading>
        <Text fontSize={"xl"} variant={"subtitle"} pt={1}>
          Find goods and services across your campus.
        </Text>
        {query.term && (
          <Badge variant={"solid"} colorScheme={"black"} px={2} py={1} mt={2}>
            <Text as={"span"} fontWeight={"light"}>
              Search:
            </Text>{" "}
            {query.term}
          </Badge>
        )}

        <Text fontSize={"2xl"} variant={"subtitle"} pt={4}>
          Recommended for you
        </Text>

        <Flex py={6} flexWrap={"wrap"} gap={4}>
          {listingsLoading ? (
            <>
              {Array.from({ length: 8 }, (_, i) => i + 1).map((_, i) => (
                <ListingItem key={i} data={null} skeleton={true} />
              ))}
            </>
          ) : listings.items?.length ? (
            listings.items.map((item) => (
              <ListingItem key={item.id} data={item} />
            ))
          ) : (
            <Heading size={"md"}>No results found. 😢</Heading>
          )}
        </Flex>
      </Container>
    </>
  );
}

Search.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
