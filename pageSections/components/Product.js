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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react";

import { StarIcon } from "@chakra-ui/icons";
import styles from "../../styles/Product.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  addItemToCartAction,
  addItemToCheckOutAction,
  setCheckOutBuyNowAction,
  toggleSelectStatus,
} from "@/actions/cartActions";
import { useEffect, useState } from "react";
import ItemsInCart from "./ItemsInCart";
import {
  addProductToWishList,
  getAllProductsAction,
  getProductsOnSaleAction,
  getRecommendedProductsAction,
} from "@/actions/productsActions";
import { useToast } from "@chakra-ui/react";
import AuthForm from "./AuthForm";

const Product = ({ product }) => {
  const userState = useSelector((state) => state.authReducer.authData);
  const itemsInCart = useSelector((state) => state.cartReducer.itemsInCart);

  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   setUser(userState);
  // }, [userState]);

  const toast = useToast();

  const router = useRouter();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddedToWishList, setIsAddedToWishList] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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
            {userState && (
              <IconButton
                title="Add product to Wish List"
                bg="beige"
                onClick={() => {
                  dispatch(
                    addProductToWishList(
                      userState?.result?.id,
                      product._id,
                      toast
                    )
                  );
                  setIsAddedToWishList(true);
                }}
              >
                <StarIcon
                  color={
                    isAddedToWishList ||
                    product.likes.find(
                      (userId) => userId === userState?.result?.id
                    )
                      ? "blue.600"
                      : "primary"
                  }
                ></StarIcon>
              </IconButton>
            )}
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
            {product.rating > 0 && <Text>{product.rating} stars</Text>}
            {product.availableStock === 1 && (
              <Text color="red.600">Only 1 left in stock!</Text>
            )}
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
            <Tag fontSize="lg" variant="solid" size="lg" colorScheme="red">
              SOLD OUT
            </Tag>
          ) : (
            <>
              <ButtonGroup spacing={2}>
                <Button
                  variant="solid"
                  colorScheme="blue"
                  onClick={() => {
                    //dispatch(buy now action)
                    if (!userState) {
                      openModal();
                      return;
                    }
                    dispatch(
                      addItemToCartAction(product._id, userState?.result?.id)
                    );
                    dispatch(
                      setCheckOutBuyNowAction(
                        product._id,
                        userState?.result?.id
                      )
                    );
                    itemsInCart.map((itemInCart) => {
                      if (itemInCart.itemId !== product._id) {
                        dispatch(
                          toggleSelectStatus(
                            itemInCart.itemId,
                            userState?.result?.id,
                            false
                          )
                        );
                      } else
                        dispatch(
                          toggleSelectStatus(
                            itemInCart.itemId,
                            userState?.result?.id,
                            true
                          )
                        );
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
                    if (!userState) {
                      openModal();
                      return;
                    }
                    dispatch(
                      addItemToCartAction(
                        product._id,
                        userState?.result?.id,
                        toast
                      )
                    );
                    dispatch(
                      addItemToCheckOutAction(
                        product._id,
                        userState?.result?.id
                      )
                    );

                    onOpen();
                  }}
                >
                  Add to Cart
                </Button>
              </ButtonGroup>
              <Modal
                blockScrollOnMount={false}
                isCentered={true}
                isOpen={isModalOpen}
                onOpen={openModal}
                onClose={closeModal}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalCloseButton />
                  <AuthForm></AuthForm>
                </ModalContent>
              </Modal>
            </>
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

          <DrawerBody>
            <ItemsInCart></ItemsInCart>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Product;
