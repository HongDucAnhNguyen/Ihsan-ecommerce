import { Box, Heading, Input, Text } from "@chakra-ui/react";
import styles from "../../styles/Layout.module.css";
const Contact = () => {
  return (
    <div className={styles.container}>
      <Box>
        <Heading>Contact Us</Heading>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Input required type="text" placeholder="Your Name"></Input>
          <Input required type="text" placeholder="Your Email"></Input>
          <Input required type="text" placeholder="Subject"></Input>
          <Input required type="text" placeholder="Your Message"></Input>
        </form>
      </Box>
    </div>
  );
};
export default Contact;
