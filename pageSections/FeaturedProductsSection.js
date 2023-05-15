import { Box, Heading, Text } from "@chakra-ui/react";

import Products from "./components/Products";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFeaturedProductsAction } from "@/actions/productsActions";
const FeaturedProductsSection = () => {
  const dispatch = useDispatch();
  const featuredProducts = useSelector(
    (state) => state.productReducer.featuredProducts
  );
  useEffect(() => {
    dispatch(getFeaturedProductsAction());
  }, []);

  return (
    <>
      <Heading mb={4}>Featured Products</Heading>
      {featuredProducts.length > 0 ? (
        <Products products={featuredProducts}></Products>
      ) : (
        <Text mb={3} fontSize="2xl">{process.env.NEXT_PUBLIC_EMPTY_MESSAGE}</Text>
      )}
    </>
  );
};

export default FeaturedProductsSection;
