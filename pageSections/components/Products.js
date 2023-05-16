import { Box, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import Product from "./Product";
import { motion } from "framer-motion";

const Products = ({ products }) => {
  const fadeInVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div variants={fadeInVariants} initial="initial" animate="animate">
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
          <Product product={product}></Product>
        ))}
      </Flex>
    </motion.div>
  );
};

export default Products;
