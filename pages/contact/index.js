import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import styles from "../../styles/Layout.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { contactStoreAction } from "@/actions/contact/contactStoreAction";
import { useToast } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
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
  const [formLoading, setFormLoading] = useState(false);
  const [isDoneLoading, setIsDoneLoading] = useState(false);
  const toast = useToast();
  useEffect(() => {
    if (isLoading) {
      setFormLoading(true);
    } else setFormLoading(false);
  }, [isLoading]);
  return (
    <div className={styles.container}>
      <Container maxW={500}>
        <Heading mb={3}>Contact Us</Heading>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            if (!isLoading) {
              setIsDoneLoading(true);
            }
            setTimeout(() => setIsDoneLoading(false), 3000);
            toast({
              position: "bottom-left",
              title: "Message Sent.",
              status: "success",
              description:
                "Ihsan has sent you a message. Please check your inbox or spam folder.",
              duration: 5000,
              isClosable: true,
            });
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

          <Button
            isLoading={formLoading}
            colorScheme={isDoneLoading ? "green" : "blue"}
            type="submit"
          >
            {isDoneLoading ? (
              <Text>
                Sent <CheckCircleIcon ml={2}></CheckCircleIcon>
              </Text>
            ) : (
              "Send Away!"
            )}
          </Button>
        </form>
      </Container>
    </div>
  );
};
export default Contact;
