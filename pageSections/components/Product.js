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
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

import { StarIcon } from "@chakra-ui/icons";
import styles from "../../styles/Product.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  addItemToCartAction,
  addItemToCheckOutAction,
  getItemsInCartAction,
  removeItemFromCheckOutAction,
  toggleSelectStatus,
} from "@/actions/cartActions";
import { useEffect, useState } from "react";
import ItemsInCart from "./ItemsInCart";
const Product = ({ product }) => {
  const userState = useSelector((state) => state.authReducer.authData);
  const itemsInCart = useSelector((state) => state.cartReducer.itemsInCart);
  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   setUser(userState);
  // }, [userState]);
  const router = useRouter();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <>
      <Card boxShadow="lg" minW="sm" maxW="sm" mb={4}>
        <CardHeader className={styles.cardHeader}>
          <ButtonGroup>
            <Button
              bg="beige"
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
                  //dispatch(buy now action)
                  dispatch(
                    addItemToCartAction(
                      product._id,
                      userState?.result?.id,
                      setErrorMessage
                    )
                  );
                  dispatch(
                    addItemToCheckOutAction(product._id, userState?.result?.id)
                  );
                  itemsInCart.map((itemInCart) => {
                    if (
                      itemInCart.itemId !== product._id &&
                      itemInCart.isSelectedForCheckOut === true
                    ) {
                      dispatch(
                        removeItemFromCheckOutAction(
                          itemInCart.itemId,
                          userState?.result?.id
                        )
                      );
                      dispatch(
                        toggleSelectStatus(
                          itemInCart.itemId,
                          userState?.result?.id,
                          itemInCart.isSelectedForCheckOut
                        )
                      );
                    }
                  });

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
                    addItemToCartAction(
                      product._id,
                      userState?.result?.id,
                      setErrorMessage
                    )
                  );
                  dispatch(
                    addItemToCheckOutAction(product._id, userState?.result?.id)
                  );
                  
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
        size="lg"
        zIndex={999999999}
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Cart</DrawerHeader>
          {errorMessage && (
            <Alert
              ml={4}
              mr={4}
              maxW="50%"
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
              status="error"
            >
              <Box display="flex">
                <AlertIcon></AlertIcon>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Box>
              <CloseButton
                onClick={() => {
                  setErrorMessage(null);
                }}
              ></CloseButton>
            </Alert>
          )}
          <DrawerBody>
            <ItemsInCart></ItemsInCart>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Product;
