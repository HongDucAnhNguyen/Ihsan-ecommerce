import { SimpleGrid } from "@chakra-ui/react";
import Product from "./Product";
import { useEffect } from "react";

const Products = ({ products }) => {
  return (
    <>
      <SimpleGrid
        spacing={3}
        templateColumns="repeat(auto-fill, minmax(400px,1fr))"
      >
        {/**iterate through array to render products */}
        {products.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </SimpleGrid>
    </>
  );
};

export default Products;
