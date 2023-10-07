import { Link } from "@chakra-ui/next-js";
import { Box, Code, Container, Flex, HStack, Heading, Spacer, Text, useColorModeValue } from "@chakra-ui/react";

export default function Footer() {
    return <>
        <Flex
            w={'100%'}
            border={'1px solid'}
            borderColor={useColorModeValue("gray.200", "gray.700")}
            p={8}
            flexDir={'column'}
            align={'center'}
            justify={'center'}
        >
            <Text>© PeerPort LLC. <Text as={'strong'}>All rights reserved.</Text></Text>
            <HStack divider={<Text px={2}>|</Text>}>
                <Link href={'/legal/terms'}>Terms of Service</Link>
                <Link href={'/legal/privacy'}>Privacy Policy</Link>
            </HStack>
            <Link href={'https://patriothacks.org'} target='_blank'>
                <Code my={2} px={2} bg={'black'} color={'white'}>Made with ❤️ for PatriotHacks 2023</Code>
            </Link>
        </Flex>

    </>
}