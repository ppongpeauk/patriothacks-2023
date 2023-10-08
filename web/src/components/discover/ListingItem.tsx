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
    <Flex flexDir={"column"} w={72}>
      <Skeleton isLoaded={!skeleton}>
        <Link href={`/listing/${data?.id}`} textDecor={"none !important"}>
          <Image
            alt="Listing Thumbnail"
            src={data?.icon}
            aspectRatio={1.5 / 1}
            w={"100%"}
            border={"2px solid"}
            borderColor={"gray.200"}
            objectFit={"cover"}
          ></Image>
        </Link>
      </Skeleton>
      <Flex flexDir={"column"}>
        <Skeleton isLoaded={!skeleton} my={2}>
          <Badge variant={"solid"} colorScheme={"black"} px={4} py={0.5} my={1}>
            {data?.category}
          </Badge>
          <Flex flexDir={"row"} gap={2} align={"center"}>
            <Text fontSize={"xl"} fontWeight={"bold"} noOfLines={1}>
              {data?.name}
            </Text>
          </Flex>
          <Text fontSize={"sm"}>@{data?.author?.username}</Text>
          {/* <Flex>
            {Array.from(
              { length: Math.floor(data?.rating || 5) },
              (_, i) => i + 1
            ).map((_, i) => (
              <Text key={i} fontSize={"sm"}>
                ★
              </Text>
            ))}
          </Flex> */}
          <Text fontSize={"sm"}>${data?.price}</Text>
        </Skeleton>
      </Flex>
    </Flex>
  );
}
