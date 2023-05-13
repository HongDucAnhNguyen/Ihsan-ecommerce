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
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {  addItemToCartAction } from "@/actions/cartActions";
import { useEffect, useState } from "react";
const Product = ({ product }) => {
  const userState = useSelector((state) => state.authReducer.authData);
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(userState);
  }, [userState]);
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <Card minW="sm" maxW="sm" mb={4}>
      <CardHeader className={styles.cardHeader}>
        <ButtonGroup>
          <Button
            onClick={() => {
              router.push({
                pathname: "/details",
                query: { productId: product._id },
              });
            }}
          >
            View Item
          </Button>
          <IconButton
            bg="beige"
            onClick={() => {
              console.log("you liked this item");
            }}
          >
            <StarIcon></StarIcon>
          </IconButton>
        </ButtonGroup>
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
              sx={{ textDecorationLine: product.isOnSale && "line-through" }}
            >
              ${product.price}
            </Text>
            {product.isOnSale && (
              <Text color="blue.600" fontSize="1xl" fontWeight="bold">
                ${product.salePrice}
              </Text>
            )}
          </Flex>
        </Stack>
      </CardBody>
      <CardFooter>
        <ButtonGroup spacing={2}>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => {
              router.push("/checkout");
            }}
          >
            Buy Now
          </Button>
          <Button
            variant="ghost"
            colorScheme="blue"
            onClick={() => {
              dispatch(addItemToCartAction(product._id, user?.result?.id));
              router.push("/cart");
            }}
          >
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
