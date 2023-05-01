import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React from "react";

const Testimonials = () => {
  return (
    //pull data from backend
    //data that does not update frequently
    <div style={{ padding: 20 }}>
      <Heading>Testimonials</Heading>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
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
            <Text>Amazing shop so many pretty Abayyah to choose from</Text>
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
            <Text>Amazing shop so many pretty Abayyah to choose from</Text>
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
            <Text>Amazing shop so many pretty Abayyah to choose from</Text>
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
            <Text>Amazing shop so many pretty Abayyah to choose from</Text>
          </CardBody>
        </Card>
      </SimpleGrid>
    </div>
  );
};

export default Testimonials;
