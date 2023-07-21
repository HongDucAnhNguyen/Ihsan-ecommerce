import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Product from "./Product";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import productStyles from "../../styles/Product.module.css";
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
      <Box
        className={productStyles.productsLayoutContainer}
        // spacing={10}
        // columns={{ xs: 1, sm: 2, md: 3 }}
        // sx={{
        //   "&::-webkit-scrollbar": {
        //     height: "9px",
        //     borderRadius: "8px",
        //   },
        //   "&::-webkit-scrollbar-track": {
        //     background: "gray.100",
        //   },
        //   "&::-webkit-scrollbar-thumb": {
        //     backgroundColor: "gray.600",
        //     borderRadius: "8px",
        //   },
        // }}
      >
        {products.length > 0 &&
          products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        {/* {!isLoading && products.length === 0 && (
          <Text fontSize="2xl">No Products availabled</Text>
        )} */}
      </Box>
    </motion.div>
  );
};

export default Products;
