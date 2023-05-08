import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import styles from "../../styles/Product.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const Product = ({ product }) => {
  const userState = useSelector((state) => state.authReducer.authData);
  // const [user,setUser] = useState(null)
  // useEffect(() => {
  //   setUser(userState);
  // }, [userState]);
  return (
    <Card minW="sm">
      <CardHeader className={styles.cardHeader}>
        <IconButton
          bg="beige"
          onClick={() => {
            console.log("you liked this item");
          }}
        >
          <StarIcon></StarIcon>
        </IconButton>
      </CardHeader>
      <Box className={styles.productImgContainer}>
        <Image
          className={styles.cardImg}
          borderRadius="lg"
          src={product.imgUrl}
          alt={product.title}
        />
      </Box>

      <CardBody>
        <Stack mt="6" spacing="3">
          <Heading size="md">{product.title}</Heading>
          <Text>{product.description}</Text>
          <Flex gap={3}>
            <Text
              color="blue.600"
              fontSize="1xl"
              sx={{ textDecorationLine: product.salePrice && "line-through" }}
            >
              ${product.price}
            </Text>
            {product.salePrice && (
              <Text color="blue.600" fontSize="1xl" fontWeight="bold">
                ${product.salePrice}
              </Text>
            )}
          </Flex>
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
          {/* {userState?.result?.id === "6446ddb6685eec4e5df21f7b" && (
            <Button variant="solid" colorScheme="red">
              Delete Item
            </Button>
          )} */}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Product;
