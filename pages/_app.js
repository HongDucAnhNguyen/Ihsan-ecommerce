import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  if (router.pathname === "/account") {
    return (
      <ChakraProvider>
        {" "}
        <Navbar></Navbar>
        <Component {...pageProps} />
      </ChakraProvider>
    );
  }
  return (
    <ChakraProvider>
      {" "}
      <Navbar></Navbar>
      <Component {...pageProps} />
      <Footer></Footer>
    </ChakraProvider>
  );
}
