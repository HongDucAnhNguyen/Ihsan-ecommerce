import React, { useEffect } from "react";
import styles from "../styles/Layout.module.css";
import { Box, Button, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import wishlistStyles from "../styles/Wishlist.module.css";
import {
  getProductsInWishList,
  removeProductFromWishList,
} from "@/actions/productsActions";
const WishList = () => {
  const fadeInVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };
  const userState = useSelector((state) => state.authReducer.authData);
  const productWishlist = useSelector(
    (state) => state.productReducer.productWishlist
  );
  const isLoading = useSelector((state) => state.cartReducer.isLoading);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsInWishList(userState?.result?.id));
  }, [dispatch]);
  useEffect(() => {
    dispatch(getProductsInWishList(userState?.result?.id));
  }, [userState]);
  if (isLoading) {
    return (
      <div className={styles.container}>
        {" "}
        <Flex gap={5}>
          <Text fontSize="2xl" fontWeight="bold">
            Loading...
          </Text>
          <Spinner ml={3} color="blue.600" size="md"></Spinner>
        </Flex>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <Box mt={20} p={20}>
        <motion.div
          variants={fadeInVariants}
          initial="initial"
          animate="animate"
        >
          <Heading>Your Wish List</Heading>
          {productWishlist.length > 0 ? (
            productWishlist.map((product) => (
              <Flex
                className={wishlistStyles.wishlistContainer}
                key={product._id}
                p={4}
                mt={4}
                borderRadius={10}
                border="3px solid lightblue"
                justifyContent="space-between"
              >
                <Text
                  className={wishlistStyles.wishlistProductTitle}
                  cursor="pointer"
                  mb={3}
                  _hover={{
                    color: "orange",
                    transition: "all .3s ease-in-out",
                  }}
                  onClick={() => {
                    router.push({
                      pathname: "/details",
                      query: {
                        productId: product._id,
                      },
                    });
                  }}
                >
                  {product.title}
                </Text>
                <Button
                  onClick={() => {
                    dispatch(
                      removeProductFromWishList(
                        userState?.result?.id,
                        product._id
                      )
                    );
                  }}
                >
                  Remove
                </Button>
              </Flex>
            ))
          ) : (
            <Text>Currently Empty</Text>
          )}
        </motion.div>
      </Box>
    </div>
  );
};

export default WishList;
