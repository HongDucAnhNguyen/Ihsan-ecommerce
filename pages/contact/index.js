import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import styles from "../../styles/Layout.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { contactStoreAction } from "@/actions/contact/contactStoreAction";
const Contact = () => {
  const isLoading = useSelector((state) => state.cartReducer.isLoading);
  const dispatch = useDispatch();
  const [contactFormData, setContactFormData] = useState({
    contactName: "",
    contactEmail: "",
    contactSubject: "",
    contactMessage: "",
  });
  const handleSubmit = () => {
    dispatch(contactStoreAction(contactFormData));
    setContactFormData({
      contactName: "",
      contactEmail: "",
      contactSubject: "",
      contactMessage: "",
    });
  };
  return (
    <div className={styles.container}>
      <Container maxW={500}>
        <Heading mb={3}>Contact Us</Heading>
        <form
          isRequired
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <FormLabel>Your Name</FormLabel>
          <Input
            value={contactFormData.contactName}
            mb={3}
            required
            type="text"
            placeholder="Enter your Name*"
            onChange={(e) => {
              setContactFormData({
                ...contactFormData,
                contactName: e.target.value,
              });
            }}
          ></Input>
          <FormLabel>Your Email</FormLabel>
          <Input
            value={contactFormData.contactEmail}
            mb={3}
            required
            type="email"
            placeholder="Enter your Email*"
            onChange={(e) => {
              setContactFormData({
                ...contactFormData,
                contactEmail: e.target.value,
              });
            }}
          ></Input>
          <FormLabel>Subject</FormLabel>
          <Input
            value={contactFormData.contactSubject}
            mb={3}
            required
            type="text"
            placeholder="Enter your Subject*"
            onChange={(e) => {
              setContactFormData({
                ...contactFormData,
                contactSubject: e.target.value,
              });
            }}
          ></Input>
          <FormLabel>Message</FormLabel>
          <Textarea
            value={contactFormData.contactMessage}
            mb={3}
            required
            placeholder="Enter your Message*"
            onChange={(e) => {
              setContactFormData({
                ...contactFormData,
                contactMessage: e.target.value,
              });
            }}
          ></Textarea>

          <Button type="submit">Send Away!</Button>
        </form>
      </Container>
    </div>
  );
};
export default Contact;
