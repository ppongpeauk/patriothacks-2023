import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";

import AuthProvider, { AuthContext } from "@/contexts/AuthContext";
import PurchaseProvider from "@/contexts/PurchaseContext";
import theme from "@/theme";
import { Familjen_Grotesk } from "next/font/google";
const font = Familjen_Grotesk({ subsets: ["latin"] });

export default function App({ Component, pageProps }: any) {
  const getLayout = Component.getLayout || ((page: any) => page);

  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-familjen: ${font.style.fontFamily};
          }
        `}
      </style>
      <ChakraProvider theme={theme} cssVarsRoot={"body"}>
        <AuthProvider>
          <PurchaseProvider>
            {getLayout(<Component {...pageProps} />)}
          </PurchaseProvider>
        </AuthProvider>
      </ChakraProvider>
    </>
  );
}
