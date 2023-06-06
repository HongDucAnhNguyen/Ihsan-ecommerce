import React, { useEffect } from "react";
import styles from "../styles/Layout.module.css";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsInWishList,
  removeProductFromWishList,
} from "@/actions/productsActions";
const WishList = () => {
  const userState = useSelector((state) => state.authReducer.authData);
  const productWishlist = useSelector(
    (state) => state.productReducer.productWishlist
  );

  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsInWishList(userState?.result?.id));
  }, [dispatch]);
  return (
    <div className={styles.container}>
      <Box>
        <Heading>Your Wish List</Heading>
        {productWishlist.length > 0 ? (
          productWishlist.map((product) => (
            <Flex
              key={product._id}
              p={4}
              border="3px solid lightblue"
              justifyContent="space-between"
            >
              <Text
                maxW="50%"
                cursor="pointer"
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
      </Box>
    </div>
  );
};

export default WishList;
