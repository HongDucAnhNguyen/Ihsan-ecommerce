import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import Products from "./components/Products";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRecommendedProductsAction } from "@/actions/productsActions";
const Recommendations = () => {
  const dispatch = useDispatch();
  const recommendedProducts = useSelector(
    (state) => state.productReducer.recommendedProducts
  );
  useEffect(() => {
    dispatch(getRecommendedProductsAction());
  }, []);
  return (
    <>
      <Heading mb={4}>Recommendations</Heading>
      <Products products={recommendedProducts}></Products>
    </>
  );
};

export default Recommendations;
