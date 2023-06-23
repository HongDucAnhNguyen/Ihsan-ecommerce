import "@/styles/globals.css";
import Navbar from "@/pageSections/components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "@/pageSections/Footer";
import { useRouter } from "next/router";
import connectMongo from "@/actions/database/db";
import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers/combinedReducers";
import { Provider } from "react-redux";
import Head from "next/head";

connectMongo();

const store = createStore(reducers, compose(applyMiddleware(thunk)));
export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <Provider store={store}>
      <ChakraProvider>
        
        <Navbar></Navbar>
        <Head>
          <title>Ihsan</title>
        </Head>
        <Component {...pageProps} />
        {router.pathname !== "/account" && router.pathname !== "/admin" && (
          <Footer></Footer>
        )}
      </ChakraProvider>
    </Provider>
  );
}
