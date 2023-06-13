import { Box, Button, Flex, Heading, Img, Text } from "@chakra-ui/react";
import styles from "../styles/Layout.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getItemsInCheckOutAction } from "@/actions/cartActions";
import payWithStripe from "@/actions/payment/payWithStripe";
import { useRouter } from "next/router";
const CheckOutPage = () => {
  const itemsToCheckOut = useSelector(
    (state) => state.cartReducer.itemsToCheckOut
  );
  const subTotal = useSelector((state) => state.cartReducer.checkOutSubTotal);
  const userState = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (userState) {
      dispatch(getItemsInCheckOutAction(userState?.result?.id));
    }
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {userState ? (
        <Box p={20} mt={20} mb={10}>
          {itemsToCheckOut.length > 0 ? (
            itemsToCheckOut.map((itemToCheckOut) => (
              <Box
                key={itemToCheckOut._id}
                mb={4}
                borderWidth="2px"
                borderRadius={10}
                p={10}
              >
                <Flex gap={6}>
                  <Img
                    width="10%"
                    height="10%"
                    src={itemToCheckOut.imgUrl}
                  ></Img>
                  <Box>
                    {" "}
                    <Text fontSize="2xl">{itemToCheckOut.title}</Text>
                    <Text fontSize="2xl" fontWeight="bold" color="orange.600">
                      $
                      {itemToCheckOut.isOnSale
                        ? itemToCheckOut.salePrice
                        : itemToCheckOut.price}
                    </Text>
                    <Text fontSize="2xl" fontWeight="bold">
                      Quantity: {itemToCheckOut.quantity}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            ))
          ) : (
            <Heading mt={4} mb={4}>
              Please select at least one item to check out
            </Heading>
          )}
          {itemsToCheckOut.length > 0 && (
            <>
              <Heading mb={5}>Subtotal: {subTotal} </Heading>
              <Button
                onClick={() => {
                  payWithStripe(userState?.result?.id, router);
                }}
                colorScheme="yellow"
              >
                Place order with Stripe
              </Button>
            </>
          )}
        </Box>
      ) : (
        <Heading>Unauthorized</Heading>
      )}
    </div>
  );
};
export default CheckOutPage;
