import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import Product from "./Product";

const Products = ({ products }) => {
  return (
    <Flex
      gap={5}
      overflowX="auto"
      borderRadius={10}
      sx={{
        "&::-webkit-scrollbar": {
          height: "9px",
          borderRadius: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "gray.100",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "gray.600",
          borderRadius: "8px",
        },
      }}
    >
      {products.map((product) => (
        <Product key={product._id} product={product}></Product>
      ))}
    </Flex>
  );
};

export default Products;
