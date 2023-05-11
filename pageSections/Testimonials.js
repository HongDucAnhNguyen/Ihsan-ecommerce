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

const Testimonials = () => {
  return (
    //pull data from backend
    //data that does not update frequently
    <Box
      sx={{
        p: 5,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box width={1200}>
        <Heading mb={4}>Testimonials</Heading>
        <SimpleGrid spacing={4} templateColumns="repeat(3, 1fr)">
          <Card>
            <CardHeader>
              <Flex spacing="4">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar size="sm" />

                  <Heading size="sm">Ahmed</Heading>
                </Flex>
              </Flex>
            </CardHeader>
            <CardBody>
              <Text>dfgsdfgsdfgdsfg</Text>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <Flex spacing="4">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar size="sm" />

                  <Heading size="sm">Khadijjah</Heading>
                </Flex>
              </Flex>
            </CardHeader>
            <CardBody>
              <Text>sdfsdfsdfsdf</Text>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <Flex spacing="4">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar size="sm" />

                  <Heading size="sm">Khadijjah</Heading>
                </Flex>
              </Flex>
            </CardHeader>
            <CardBody>
              <Text>asdfasgasgsag</Text>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <Flex spacing="4">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar size="sm" />

                  <Heading size="sm">Khadijjah</Heading>
                </Flex>
              </Flex>
            </CardHeader>
            <CardBody>
              <Text>asgsadfweasgsgewag</Text>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Testimonials;
