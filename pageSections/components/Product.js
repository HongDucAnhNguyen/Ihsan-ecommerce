import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  Tag,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { StarIcon } from "@chakra-ui/icons";
import styles from "../../styles/Product.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  addItemToCartAction,
  getItemsInCartAction,
} from "@/actions/cartActions";
import { useEffect, useState } from "react";
import ItemsInCart from "./ItemsInCart";
const Product = ({ product }) => {
  const userState = useSelector((state) => state.authReducer.authData);
  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   setUser(userState);
  // }, [userState]);
  const router = useRouter();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
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
                fontSize="2xl"
                sx={{ textDecorationLine: product.isOnSale && "line-through" }}
              >
                ${product.price}
              </Text>
              {product.isOnSale && (
                <Text color="orange.600" fontSize="3xl" fontWeight="bold">
                  ${product.salePrice}
                </Text>
              )}
            </Flex>
          </Stack>
        </CardBody>
        <CardFooter>
          {product.availableStock === 0 ? (
            <Tag variant="solid" size="lg" colorScheme="red">
              Sold Out
            </Tag>
          ) : (
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
                  dispatch(
                    addItemToCartAction(product._id, userState?.result?.id)
                  );
                  dispatch(getItemsInCartAction(userState?.result?.id));
                  onOpen();
                }}
              >
                Add to Cart
              </Button>
            </ButtonGroup>
          )}
        </CardFooter>
      </Card>
      <Drawer
        zIndex={999999999}
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Cart</DrawerHeader>

          <DrawerBody>
            <ItemsInCart></ItemsInCart>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Product;
