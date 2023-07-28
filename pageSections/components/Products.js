import {
  Box,

} from "@chakra-ui/react";
import Product from "./Product";
import { motion } from "framer-motion";
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
      >
        {products.length > 0 &&
          products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        
      </Box>
    </motion.div>
  );
};

export default Products;
