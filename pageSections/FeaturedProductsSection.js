import { Box, Heading } from "@chakra-ui/react";

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
    <Box
      sx={{
        width: "100%",
        p: 5,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box maxW="100%" width={1200}>
        <Heading mb={4}>Featured Products</Heading>
        <Products products={featuredProducts}></Products>
      </Box>
    </Box>
  );
};

export default FeaturedProductsSection;
