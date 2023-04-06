import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "@/components/Footer";
export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      {" "}
      <Navbar></Navbar>
      <Component {...pageProps} />
      <Footer></Footer>
    </ChakraProvider>
  );
}
