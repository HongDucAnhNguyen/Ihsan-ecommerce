import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import connectMongo from "@/database/db";
import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers/combinedReducers";
import { Provider } from "react-redux";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

export default function App({ Component, pageProps }) {
  // connectMongo();
  const router = useRouter();
  if (router.pathname === "/account") {
    return (
      <Provider store={store}>
        {" "}
        <ChakraProvider>
          {" "}
          <Navbar></Navbar>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    );
  }
  return (
    <Provider store={store}>
      <ChakraProvider>
        {" "}
        <Navbar></Navbar>
        <Component {...pageProps} />
        <Footer></Footer>
      </ChakraProvider>
    </Provider>
  );
}
