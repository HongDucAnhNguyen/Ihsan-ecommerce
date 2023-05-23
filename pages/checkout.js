import { Box, Heading, Text } from "@chakra-ui/react";
import styles from "../styles/Layout.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getItemsInCheckOutAction } from "@/actions/cartActions";
const CheckOutPage = () => {
  const itemsToCheckOut = useSelector(
    (state) => state.cartReducer.itemsToCheckOut
  );
  const userState = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItemsInCheckOutAction(userState?.result?.id));
  }, [dispatch]);
  return (
    <div className={styles.container}>
      <Heading>CheckOutPage</Heading>
      {itemsToCheckOut.length > 0 && itemsToCheckOut.map(itemToCheckOut => (
        <Box key={itemToCheckOut._id} mb={4} border='3px solid orange'>
          <Text>{itemToCheckOut.price}</Text>
        </Box>
      ))}
    </div>
  );
};
export default CheckOutPage;
