import {
  getItemsInCartAction,
  removeItemInCartAction,
} from "@/actions/cartActions";
import { Box, Heading, Select, Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Layout.module.css";
const ItemsInCart = () => {
  const userState = useSelector((state) => state.authReducer.authData);
  const itemsInCart = useSelector((state) => state.cartReducer.itemsInCart);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setUser(userState);
  }, [userState]);
  useEffect(() => {
    if (userState) {
      dispatch(getItemsInCartAction(userState?.result?.id));
    }
  }, []);
  if (itemsInCart.length === 0) {
    return <Text fontSize="2xl">Currently Empty</Text>;
  }

  return (
    <Box maxH="80%" overflow="auto">
      {itemsInCart.map((item) => (
        <Box key={item._id} border="1px solid orange" p={3} mb={4} mt={4}>
          <Heading size="md">{item.title}</Heading>
          <Text size="md">{item.description}</Text>

          {item.isOnSale ? (
            <Text>${item.salePrice}</Text>
          ) : (
            <Text size="md">${item.price}</Text>
          )}
          <Select maxW="50%" required placeholder="Quantity*">
            {Array.from({ length: item.maxQuantityPerPurchase }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Select>
          <Button
            onClick={() => {
              dispatch(removeItemInCartAction(item._id, userState?.result?.id));
            }}
          >
            Remove
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default ItemsInCart;
