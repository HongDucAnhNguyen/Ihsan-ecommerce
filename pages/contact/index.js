import { Box, Button, Heading, Input, Textarea } from "@chakra-ui/react";
import styles from "../../styles/Layout.module.css";
const Contact = () => {
  return (
    <div className={styles.container}>
      <Box p={20}>
        <Heading mb={3}>Contact Us</Heading>
        <form action="https://youtu.be/xvFZjo5PgG0" target="_blank">
          <Input mb={3} required type="text" placeholder="Your Name*"></Input>
          <Input mb={3} required type="text" placeholder="Your Email*"></Input>
          <Input mb={3} required type="text" placeholder="Subject*"></Input>
          <Textarea mb={3} required placeholder="Your Message*"></Textarea>
          <Button type="submit">Send Away!</Button>
        </form>
      </Box>
    </div>
  );
};
export default Contact;
