import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import React from "react";
import styles from "../styles/Product.module.css";
const OnSaleProductsSection = () => {
  return (
    <Box sx={{ p: 5 }}>
      <Heading>Products On Sale!</Heading>
      <br />
      <Tabs>
        <TabList>
          <Tab>Quran</Tab>
          <Tab>Clothing</Tab>
          <Tab>Accessories</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Qurans</TabPanel>
          <TabPanel>Modest Clothing for Men and Women</TabPanel>
          <TabPanel>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                overflowX: "auto",
              }}
            >
              <Card minW="sm">
                <CardHeader className={styles.cardHeader}>
                  <IconButton bg="beige">
                    <StarIcon></StarIcon>
                  </IconButton>
                </CardHeader>
                <Box className={styles.productImgContainer}>
                  <Image
                    className={styles.cardImg}
                    borderRadius="lg"
                    src="/localProducts/rug1.png"
                    alt="Prayer Rug"
                  />
                </Box>

                <CardBody>
                  <Stack mt="6" spacing="3">
                    <Heading size="md">Turkish Prayer Rug</Heading>
                    <Text>Handmade Turkish Prayer rug</Text>
                    <Text color="blue.600" fontSize="1xl">
                      $45
                    </Text>
                  </Stack>
                </CardBody>
                <CardFooter>
                  <ButtonGroup spacing={2}>
                    <Button variant="solid" colorScheme="blue">
                      Buy Now
                    </Button>
                    <Button variant="ghost" colorScheme="blue">
                      Add to Cart
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>

              <Card minW="sm">
                <CardHeader className={styles.cardHeader}>
                  <IconButton bg="beige">
                    <StarIcon></StarIcon>
                  </IconButton>
                </CardHeader>
                <Box className={styles.productImgContainer}>
                  <Image
                    className={styles.cardImg}
                    borderRadius="lg"
                    src="/localProducts/rug2.png"
                    alt="The Wise Quran"
                  />
                </Box>

                <CardBody>
                  <Stack mt="6" spacing="3">
                    <Heading size="md">Red Traditional Prayer Rug</Heading>
                    <Text>Red Prayer Rug with traditional Embroidery</Text>
                    <Text color="blue.600" fontSize="1xl">
                      $32
                    </Text>
                  </Stack>
                </CardBody>
                <CardFooter>
                  <ButtonGroup spacing={2}>
                    <Button variant="solid" colorScheme="blue">
                      Buy Now
                    </Button>
                    <Button variant="ghost" colorScheme="blue">
                      Add to Cart
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
              <Card minW="sm">
                <CardHeader className={styles.cardHeader}>
                  <IconButton bg="beige">
                    <StarIcon></StarIcon>
                  </IconButton>
                </CardHeader>
                <Box className={styles.productImgContainer}>
                  <Image
                    className={styles.cardImg}
                    borderRadius="lg"
                    src="https://www.kindpng.com/picc/m/28-285765_islamic-muslim-hat-png-transparent-png.png"
                    alt="Skull cap"
                  />
                </Box>

                <CardBody>
                  <Stack mt="6" spacing="3">
                    <Heading size="md">Men's Taqiyah/Kufi</Heading>
                    <Text>White Simple Men's Taqiyah/Kufi</Text>
                    <Text color="blue.600" fontSize="1xl">
                      $32
                    </Text>
                  </Stack>
                </CardBody>
                <CardFooter>
                  <ButtonGroup spacing={2}>
                    <Button variant="solid" colorScheme="blue">
                      Buy Now
                    </Button>
                    <Button variant="ghost" colorScheme="blue">
                      Add to Cart
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <br />
    </Box>
  );
};

export default OnSaleProductsSection;
