import React from "react";
import styles from "../styles/Layout.module.css";
import { Heading } from "@chakra-ui/react";
const SuccessPage = () => {
  return (
    <div className={styles.container}>
      <Heading>Order Placed, thank you for shopping with Ihsan</Heading>
    </div>
  );
};

export default SuccessPage;
