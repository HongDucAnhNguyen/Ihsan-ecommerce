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
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import React from "react";
import styles from "../styles/Products.module.css";

const OnSaleProducts = () => {
  return (
    <Box sx={{ p: 5 }}>
      <Heading>Products On Sale!</Heading>
      <br />
      <Box style={{ display: "flex", justifyContent: "flex-start", gap: 20 }}>
        <Button>Quran</Button>
        <Button>Clothing</Button>
        <Button>Accessories</Button>
      </Box>
      <br />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Card maxW="md">
          <CardHeader className={styles.cardHeader}>
            <IconButton bg="white">
              <StarIcon></StarIcon>
            </IconButton>
          </CardHeader>
          <Box className={styles.productImgContainer}>
            <Image
              className={styles.cardImg}
              borderRadius="lg"
              src="https://www.kindpng.com/picc/m/204-2047627_64797-tajweed-quran-double-mosque-size-hd-png.png"
              alt="The noble Quran"
            />
          </Box>

          <CardBody>
            <Stack mt="6" spacing="3">
              <Heading size="md">The Noble Qur'an</Heading>
              <Text>The Noble Qur'an with Tajweed and color code</Text>
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

        <Card maxW="md">
          <CardHeader className={styles.cardHeader}>
            <IconButton bg="white">
              <StarIcon></StarIcon>
            </IconButton>
          </CardHeader>
          <Box className={styles.productImgContainer}>
            <Image
              className={styles.cardImg}
              borderRadius="lg"
              src="https://www.kindpng.com/picc/m/204-2047344_al-quran-mualim-tajweed-tajweedi-quran-lines-quran.png"
              alt="The Wise Quran"
            />
          </Box>

          <CardBody>
            <Stack mt="6" spacing="3">
              <Heading size="md">The Wise Qur'an</Heading>
              <Text>The Wise Qur'an with Tajweed and color code</Text>
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
        <Card maxW="md">
          <CardHeader className={styles.cardHeader}>
            <IconButton bg="white">
              <StarIcon></StarIcon>
            </IconButton>
          </CardHeader>
          <Box className={styles.productImgContainer}>
            <Image
              className={styles.cardImg}
              borderRadius="lg"
              src="https://www.kindpng.com/picc/m/204-2047627_64797-tajweed-quran-double-mosque-size-hd-png.png"
              alt="The noble Quran"
            />
          </Box>

          <CardBody>
            <Stack mt="6" spacing="3">
              <Heading size="md">The Noble Qur'an</Heading>
              <Text>The Noble Qur'an with Tajweed and color code</Text>
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
    </Box>
  );
};

export default OnSaleProducts;
