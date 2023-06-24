import { Box, Heading } from "@chakra-ui/react";
import styles from "../../styles/Layout.module.css";
import itemsInCartStyles from "../../styles/Product.module.css";
import ItemsInCart from "@/pageSections/components/ItemsInCart";
import { motion } from "framer-motion";
const Cart = () => {
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
    <div className={styles.container}>
      <motion.div variants={fadeInVariants} initial="initial" animate="animate">
        <Box mt={20} className={itemsInCartStyles.itemsInCartPageContainer}>
          <Heading>Your Cart</Heading>
          <ItemsInCart></ItemsInCart>
        </Box>
      </motion.div>

      {/*  */}
    </div>
  );
};
export default Cart;
