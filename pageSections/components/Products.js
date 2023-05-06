import { SimpleGrid } from "@chakra-ui/react";
import Product from "./Product";

const Products = ({ products }) => {
  return (
    <>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
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
