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
  Img,
} from "@chakra-ui/react";

import { StarIcon } from "@chakra-ui/icons";
import styles from "../../styles/Product.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  addItemToCartAction,
  addItemToCheckOutAction,
  getItemsInCartAction,
  setCheckOutBuyNowAction,
  toggleSelectStatus,
} from "@/actions/cartActions";
import { useEffect, useState } from "react";
import ItemsInCart from "./ItemsInCart";
import { addProductToWishList } from "@/actions/productsActions";
import { useToast } from "@chakra-ui/react";
import AuthForm from "./AuthForm";
import ReactStars from "react-rating-stars-component";

const Product = ({ product }) => {
  const userState = useSelector((state) => state.authReducer.authData);
  const itemsInCart = useSelector((state) => state.cartReducer.itemsInCart);

  const toast = useToast();

  const router = useRouter();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddedToWishList, setIsAddedToWishList] = useState(false);
  const [isBuyNowAction, setIsBuyNowAction] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setIsBuyNowAction(false);
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

            <ReactStars
              value={product.rating}
              isHalf={true}
              edit={false}
              size={24}
              activeColor="#ffd700"
            ></ReactStars>

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
                    setIsBuyNowAction(true);
                    openModal();
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
                  {userState && isBuyNowAction ? (
                    <Box p={10}>
                      <Flex gap={6}>
                        <Img
                          width="40%"
                          height="40%"
                          src={product.imgUrl}
                        ></Img>
                        <Box>
                          {" "}
                          <Text>{product.title}</Text>
                          <Text
                            fontSize="2xl"
                            fontWeight="bold"
                            color="orange.600"
                          >
                            $
                            {product.isOnSale
                              ? product.salePrice
                              : product.price}
                          </Text>
                          <Text fontWeight="bold">Quantity: 1</Text>
                        </Box>
                      </Flex>
                      <Button
                        mt={3}
                        onClick={() => {
                          closeModal()
                          router.push("/checkout");
                        }}
                        colorScheme="yellow"
                      >
                        Proceed to Check Out
                      </Button>
                    </Box>
                  ) : (
                    <AuthForm></AuthForm>
                  )}
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
