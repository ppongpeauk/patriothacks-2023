import { Item, Listing, Service } from "@/types";
import { Link } from "@chakra-ui/next-js";
import { Flex, HStack, Image, Skeleton, Text } from "@chakra-ui/react";

interface ListingItemProps {
  data: Item | Service | Listing | null;
  skeleton?: boolean;
}

export default function ListingItem({
  data,
  skeleton = false,
}: ListingItemProps) {
  return (
    <Flex flexDir={"column"} w={"fit-content"}>
      <Skeleton isLoaded={!skeleton}>
        <Link href={`/listing/${data?.id}`} textDecor={"none !important"}>
          <Image
            src={data?.thumbnail}
            aspectRatio={1 / 1}
            w={64}
            bg={"blackAlpha.100"}
            rounded={"lg"}
          ></Image>
        </Link>
      </Skeleton>

      <Flex flexDir={"column"} pt={2}>
        <Skeleton isLoaded={!skeleton}>
          <Text fontSize={"xl"} fontWeight={"bold"}>
            {data?.title}
          </Text>
          <Text fontSize={"sm"}>@{data?.author.username}</Text>
          <Flex>
            {Array.from(
              { length: Math.floor(data?.rating || 5) },
              (_, i) => i + 1
            ).map((_, i) => (
              <Text key={i} fontSize={"sm"}>
                ⭐
              </Text>
            ))}
          </Flex>
          <Text fontSize={"sm"}>${data?.price}</Text>
        </Skeleton>
      </Flex>
    </Flex>
  );
}
