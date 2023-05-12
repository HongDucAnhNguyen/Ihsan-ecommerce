import React from "react";
import styles from "../styles/Footer.module.css";
import { Divider, Heading, Text } from "@chakra-ui/react";
const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerSectionsContainer}>
        <div className={styles.footerLeftSection}>
          <Heading fontSize="3xl">Logo</Heading>
          <div>
            <Text fontSize="xl">Accepted Payments</Text>
            <div className={styles.paymentsContainer}>
              <Text fontSize="xl">Visa</Text>
              <Text fontSize="xl">Stripe</Text>
            </div>
          </div>
        </div>
        <div className={styles.footerRightSection}>
          <div>
            {" "}
            <Heading fontSize="3xl">Departments</Heading>
            <Text>Qur'an</Text>
            <Text>Clothing</Text>
            <Text>Accessories</Text>
          </div>
          <div>
            {" "}
            <Heading fontSize="3xl">About Us</Heading>
            <Text>About Ihsan</Text>
            <Text>Contact</Text>
            <Text>About the Developer</Text>
          </div>
          <div>
            {" "}
            <Heading fontSize="3xl">Services</Heading>
            <Text>Account</Text>
          </div>
        </div>
      </div>
      <Divider></Divider>
      <div style={{ textAlign: "center" }}>
        © 2022 Hong Duc Anh Nguyen. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
