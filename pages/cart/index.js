import { Box, Heading } from "@chakra-ui/react";
import styles from "../../styles/Layout.module.css";

import ItemsInCart from "@/pageSections/components/ItemsInCart";

const Cart = () => {
  return (
    <div className={styles.container}>
      <Box>
        <Heading>Your Cart</Heading>
        <ItemsInCart></ItemsInCart>
      </Box>

      {/*  */}
    </div>
  );
};
export default Cart;
