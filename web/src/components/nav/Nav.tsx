"use client";

/* eslint-disable react-hooks/rules-of-hooks */

import { AuthContext, useAuthContext } from "@/contexts/AuthContext";
import {
  Avatar,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useRef, useState } from "react";

import { IoMdLock, IoMdSearch } from "react-icons/io";

function AvatarPopover() {
  const { currentUser } = useAuthContext();

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          ml={4}
          aria-label="User"
          icon={<Avatar src={"/assets/branding/logo2.png"} />}
          variant="ghost"
          rounded={"full"}
          transition={"filter 0.2s ease"}
          _hover={{
            filter: useColorModeValue("opacity(0.75)", "brightness(0.75)"),
          }}
          _active={{
            filter: useColorModeValue("opacity(0.5)", "brightness(0.5)"),
          }}
        />
      </PopoverTrigger>
      <PopoverContent m={8}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody p={6}>
          <Flex flexDir={"row"} align={"center"}>
            <Avatar src={"/assets/branding/logo2.png"} size={"xl"} />
            <Flex flexDir={"column"} ml={4}>
              <Text fontWeight={"bold"} fontSize={"lg"}>
                {currentUser?.name}
              </Text>
              <Text fontSize={"sm"}>{currentUser?.email}</Text>
              <Flex flexDir={"column"} fontSize={"sm"} w={"fit-content"} pt={2}>
                <Link href={"/settings"}>Settings</Link>
                <Link href={"/auth/logout"}>Logout</Link>
              </Flex>
            </Flex>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

// Contexts

function CategoryLink({ term, category }: { term: string; category: string }) {
  return (
    <>
      <Link href={`/discover?term=${term}`}>{category}</Link>
    </>
  );
}

function NavLink({
  href,
  variant = "ghost",
  path = "/",
  onClick,
  children,
}: {
  href: string;
  variant?: string;
  path?: string | null;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link as={NextLink} href={href}>
      <Button
        variant={path === href ? "solid" : variant}
        fontSize={["sm", "md"]}
      >
        <Text>{children}</Text>
      </Button>
    </Link>
  );
}

function NavButton({
  variant = "ghost",
  onClick,
  children,
}: {
  variant?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button variant={variant} onClick={onClick} fontSize={["md", "lg"]}>
      <Text>{children}</Text>
    </Button>
  );
}

function SearchPopover() {
  const { push } = useRouter();

  const handleSearchBarSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    push(`/discover?term=${e.currentTarget.search.value}`);
  };

  return (
    <>
      <chakra.form
        onSubmit={handleSearchBarSubmit}
        maxW={"md"}
        display={{ base: "none", md: "block" }}
      >
        <HStack align={"center"} justify={"center"} h={"100%"} pr={4}>
          <InputGroup flex={1} w={{ base: 0, md: "md", lg: "lg" }}>
            <InputLeftElement>
              <IoMdSearch />
            </InputLeftElement>
            <Input
              name={"search"}
              type="text"
              placeholder="Search for anything"
            />
          </InputGroup>
        </HStack>
      </chakra.form>
    </>
  );
}

export default function Nav({ type }: { type: string }) {
  const path = usePathname();
  const { currentUser, user, logOut } = useAuthContext();

  return (
    <>
      <Flex
        position={"sticky"}
        top={0}
        w={"100%"}
        zIndex={512}
        bg={useColorModeValue("white", "gray.800")}
        flexDir={"column"}
      >
        <Flex
          as={"nav"}
          alignItems={"center"}
          justifyContent={"space-between"}
          w={"100%"}
          h={"6rem"}
          py={4}
        >
          <Flex
            mr={4}
            borderRight={"1px solid"}
            borderColor={useColorModeValue("gray.200", "gray.700")}
            h={"100%"}
            align={"center"}
            px={[4, 8]}
          >
            <Link
              as={NextLink}
              href="/"
              filter={useColorModeValue("none", "invert(1)")}
              textDecor={"none !important"}
              alignItems={"center"}
            >
              <Image
                src={"/assets/branding/wordmark.png"}
                alt="Logo"
                height={currentUser ? 4 : 6}
                objectFit="contain"
                transition={"filter 0.2s ease"}
                _hover={{
                  filter: useColorModeValue(
                    "opacity(0.75)",
                    "brightness(0.75)"
                  ),
                }}
                _active={{
                  filter: useColorModeValue("opacity(0.5)", "brightness(0.5)"),
                }}
              />
              {currentUser && (
                <Text
                  as={"span"}
                  fontSize={"sm"}
                  fontWeight={"bold"}
                  color={useColorModeValue("black", "white")}
                  textTransform={"uppercase"}
                >
                  {currentUser?.college?.name}
                </Text>
              )}
            </Link>
          </Flex>
          <SearchPopover />
          <HStack
            px={[4, 8]}
            borderLeft={"1px solid"}
            borderColor={useColorModeValue("gray.200", "gray.700")}
            h={"100%"}
            spacing={2}
          >
            {!user ? (
              <>
                <NavLink href={"/auth/login"} path={path}>
                  Login 🔐
                </NavLink>
              </>
            ) : (
              <>
                {/* <NavLink href={"/home"} path={path}>
                  Home 🏡
                </NavLink> */}
                <NavLink href="/discover" path={path}>
                  Discover ✨
                </NavLink>
                <NavLink href="/sell" path={path} variant="outline">
                  Start Listing 💸
                </NavLink>
                {/* <IconButton
                  aria-label="Logout"
                  icon={<IoMdLock />}
                  colorScheme="red"
                  onClick={async () => {
                    await logOut();
                  }}
                /> */}
                <AvatarPopover />
              </>
            )}
          </HStack>
        </Flex>
        <HStack
          bg={"black"}
          w={"100%"}
          h={12}
          px={8}
          align={"center"}
          justify={"center"}
          color={"white"}
          divider={<Text px={2}>|</Text>}
        >
          <CategoryLink term={"music"} category={"Music"} />
          <CategoryLink term={"clothing"} category={"Clothing"} />
          <CategoryLink term={"books"} category={"Books"} />
          <CategoryLink term={"art"} category={"Art"} />
          <CategoryLink term={"beauty"} category={"Beauty"} />
        </HStack>
      </Flex>
    </>
  );
}
