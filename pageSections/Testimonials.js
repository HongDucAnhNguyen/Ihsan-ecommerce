import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  Box,
} from "@chakra-ui/react";
import React from "react";
import styles from '../styles/Testimonials.module.css'
const Testimonials = () => {
  return (
    //pull data from backend
    //data that does not update frequently
    <>
      <Heading mb={4}>Testimonials</Heading>
      <Box className={styles.testimonialsContainer}>
        <Card>
          <CardHeader>
            <Flex spacing="4">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar size="sm" />
                <Heading size="sm">Abdullah</Heading>
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody>
            <Text>
              I stumbled upon this store by chance, and it turned out to be a
              wonderful discovery. Their products are beautifully crafted, and
              the store ambiance is inviting.
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Flex spacing="4">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar size="sm" />

                <Heading size="sm">Moahtez</Heading>
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody>
            <Text>
              This store is a hidden gem! They offer a unique shopping
              experience with a fantastic range of products to choose from.
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Flex spacing="4">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar size="sm" />

                <Heading size="sm">Tayeb</Heading>
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody>
            <Text>
              I can't say enough good things about this store! Their customer
              service is exceptional, and their products are top-notch.
            </Text>
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

export default Testimonials;
