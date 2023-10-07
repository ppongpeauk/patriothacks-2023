import { Item, Listing, Service } from "@/types";
import { Link } from "@chakra-ui/next-js";
import { Badge, Flex, HStack, Image, Skeleton, Text } from "@chakra-ui/react";
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
            border={"2px solid"}
            borderColor={"gray.200"}
          ></Image>
        </Link>
      </Skeleton>
      <Flex flexDir={"column"}>
        <Skeleton isLoaded={!skeleton} mt={4}>
          <Flex flexDir={"row"} gap={2} align={"center"}>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              {data?.title}
            </Text>
            <Badge as={"span"} colorScheme={"black"} px={2} ml={1}>
              {(data?.confidence || 0) * 100}%
            </Badge>
          </Flex>
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
