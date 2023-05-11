import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import Products from "./components/Products";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFeaturedProductsAction } from "@/actions/productsActions";
const Recommendations = () => {
  const dispatch = useDispatch();
  const featuredProducts = useSelector(
    (state) => state.productReducer.featuredProducts
  );
  useEffect(() => {
    dispatch(getFeaturedProductsAction());
  }, []);
  return (
    <>
      <Heading mb={4}>Recommendations</Heading>
      <Products products={featuredProducts}></Products>
    </>
  );
};

export default Recommendations;
