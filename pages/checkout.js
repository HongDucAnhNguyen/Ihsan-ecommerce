import { Box, Heading, Text } from "@chakra-ui/react";
import styles from "../styles/Layout.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getItemsInCheckOutAction } from "@/actions/cartActions";
const CheckOutPage = () => {
  const itemsToCheckOut = useSelector(
    (state) => state.cartReducer.itemsToCheckOut
  );
  const subTotal = useSelector((state) => state.cartReducer.checkOutSubTotal);
  const userState = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItemsInCheckOutAction(userState?.result?.id));
  }, [dispatch]);
  return (
    <div className={styles.container}>
      <Box>
        {itemsToCheckOut.length > 0 ? (
          itemsToCheckOut.map((itemToCheckOut) => (
            <Box key={itemToCheckOut._id} mb={4} border="3px solid orange">
              <Text fontSize="2xl">{itemToCheckOut.title}</Text>
              <Text fontSize="2xl" fontWeight="bold" color="orange.600">
                $
                {itemToCheckOut.isOnSale
                  ? itemToCheckOut.salePrice
                  : itemToCheckOut.price}
              </Text>
              <Text>Quantity: {itemToCheckOut.quantity}</Text>
            </Box>
          ))
        ) : (
          <Text>Please select at least one item to check out</Text>
        )}
        {itemsToCheckOut.length > 0 && <Heading>Subtotal: {subTotal} </Heading>}
      </Box>
    </div>
  );
};
export default CheckOutPage;
