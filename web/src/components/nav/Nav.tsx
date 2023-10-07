"use client";

import { AuthContext } from "@/contexts/AuthContext";
import {
    Button,
    Flex,
    HStack,
    Image,
    Link,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useRef, useState } from "react";

// Assets
import logo from "@/assets/branding/logo.png";

// Contexts

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
            <Button variant={path === href ? "solid" : variant} fontSize={["md", "lg"]}>
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

export default function Nav({ type }: { type: string }) {
    // Auth context
    // const { user } = useContext(AuthContext) as any;

    // Path
    const path = usePathname();

    // Search bar refs
    const searchBarContainer = useRef<HTMLDivElement>(null);
    const searchBar = useRef<HTMLInputElement>(null);

    // Modal states
    const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);

    // Search bar borders on focus and blur
    // useEffect(() => {
    //   searchBar.current?.addEventListener("focus", () => {
    //     searchBarContainer.current?.classList.add(styles.nav__searchBar__focused);
    //   });
    //   searchBar.current?.addEventListener("blur", () => {
    //     searchBarContainer.current?.classList.remove(
    //       styles.nav__searchBar__focused
    //     );
    //   });
    // }, [searchBar, searchBarContainer]);

    return (
        <>
            <Flex
                position={"sticky"}
                top={0}
                w={"100%"}
                zIndex={512}
                bg={useColorModeValue("white", "gray.800")}
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
                        <Link as={NextLink} href="/">
                            <Image
                                src={'/assets/branding/wordmark.png'}
                                alt="Logo"
                                height={"24px"}
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
                        </Link>
                    </Flex>
                    {/* <HStack
            display={["none", "flex"]}
            direction={["column", "row"]}
            align={"center"}
            justify={"center"}
            flexGrow={1}
            spacing={4}
            width={"max-content"}
            h={"100%"}
          >
            <InputGroup maxW={"240px"} flex={1} flexGrow={4}>
              <InputLeftElement>
                <IoMdSearch />
              </InputLeftElement>
              <Input
                variant="filled"
                type="text"
                placeholder="Search for items"
                ref={searchBar}
              />
            </InputGroup>
            <InputGroup maxW={"384px"} flex={1} flexGrow={6}>
              <InputLeftElement>
                <IoMdSchool />
              </InputLeftElement>
              <Input
                variant="filled"
                disabled={user?.university ? true : false}
                type="text"
                placeholder="Enter a university"
                defaultValue={user?.university?.name ?? ""}
              />
            </InputGroup>
          </HStack> */}

                    <HStack
                        px={[4, 8]}
                        borderLeft={"1px solid"}
                        borderColor={useColorModeValue("gray.200", "gray.700")}
                        h={"100%"}
                        spacing={2}
                    >
                        <NavLink href="/sell" path={path} variant="solid">
                            Start Listing
                        </NavLink>
                        <NavLink href="/sell" path={path}>
                            Discover
                        </NavLink>
                        <NavLink href={"/auth/login"} path={path}>
                            Login
                        </NavLink>
                    </HStack>
                </Flex>
            </Flex>
        </>
    );
}
