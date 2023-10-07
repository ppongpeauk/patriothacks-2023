import { useAuthContext } from "@/contexts/AuthContext";
import Layout from "@/layouts/Main";
import {
  Avatar,
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";

import { Listing, Service } from "@/types";
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

function ServiceChoice({
  title,
  description,
  icon,
  price,
}: {
  title: string;
  description: string;
  icon: string;
  price: number;
}) {
  return (
    <Flex
      flexDir={"column"}
      justify={"center"}
      align={"flex-start"}
      w={"100%"}
      border={"2px solid"}
      borderColor={"gray.200"}
      p={4}
    >
      <Text fontWeight={"bold"} fontSize={"lg"}>
        {title}
      </Text>
      <Text fontSize={"md"}>{description}</Text>
      <Text fontSize={"md"}>{USDollar.format(price)}</Text>
    </Flex>
  );
}

export default function Book({ data }: { data: Service }) {
  const { currentUser } = useAuthContext();

  return (
    <>
      <Container maxW={"container.lg"} py={16} gap={8}>
        <Grid templateColumns={"1fr 1fr"} gap={4}>
          <Flex as={"section"} justify={"center"}>
            <Flex flexDir={"row"} gap={8}>
              <Avatar size={"2xl"} src={data?.author?.icon} />
              <Box py={4}>
                <Text fontWeight={"bold"} fontSize={"2xl"}>
                  {data?.author?.name}
                </Text>
                <Text fontSize={"md"} variant={"subtitle"}>
                  @{data?.author?.username}
                </Text>
              </Box>
            </Flex>
          </Flex>
          {/* hero */}
          <Box as={"section"}>
            <Heading as={"h1"} fontSize={"2xl"}>
              Book Appointment
            </Heading>
            <Text variant={"subtitle"} pt={1}>
              {data?.title}
            </Text>
            <Flex py={4} gap={4}>
              {data.serviceTypes.map((service) => (
                <ServiceChoice
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  price={service.price}
                />
              ))}
            </Flex>
          </Box>
        </Grid>
      </Container>
    </>
  );
}

Book.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
