import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { AxiosInstanceProvider } from "../lib/axios";
import ApiCallerProvider from "../lib/axios/api-caller";
import { StoreProvider } from "../lib/store/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <AxiosInstanceProvider>
        <ApiCallerProvider>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </ApiCallerProvider>
      </AxiosInstanceProvider>
    </StoreProvider>
  );
}
