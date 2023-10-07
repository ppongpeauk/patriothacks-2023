import { useAuthContext } from "@/contexts/AuthContext";
import { Container, Flex, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Logout() {
  const { push } = useRouter();
  const { logOut } = useAuthContext();

  useEffect(() => {
    logOut();
    push("/");
  }, [logOut, push]);

  return (
    <Flex align={"center"} justify={"center"} h={"100dvh"}>
      <Spinner size={"lg"} />
    </Flex>
  );
}
