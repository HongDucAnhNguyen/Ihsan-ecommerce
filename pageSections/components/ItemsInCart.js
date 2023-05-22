import {
  getItemsInCartAction,
  removeItemInCartAction,
} from "@/actions/cartActions";
import { Box, Heading, Select, Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Layout.module.css";
import { useRouter } from "next/router";
const ItemsInCart = () => {
  const userState = useSelector((state) => state.authReducer.authData);
  const itemsInCart = useSelector((state) => state.cartReducer.itemsInCart);
  // const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (userState) {
      dispatch(getItemsInCartAction(userState?.result?.id));
    }
  }, [dispatch]);

  if (itemsInCart.length === 0) {
    return <Text fontSize="2xl">Currently Empty</Text>;
  }

  return (
    <Box maxH="80%" overflow="auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/checkout");
        }}
      >
        {itemsInCart.map((item) => (
          <Box key={item._id} border="3px solid orange" p={3} mb={4} mt={4}>
            <Heading
              cursor="pointer"
              onClick={() => {
                router.push({
                  pathname: "/details",
                  query: { productId: item._id },
                });
              }}
              _hover={{
                color: "tan",
                transition: "all .3s ease-in-out",
              }}
              size="md"
            >
              {item.title}
            </Heading>
            <Text size="md">{item.description}</Text>

            {item.isOnSale ? (
              <Text>${item.salePrice}</Text>
            ) : (
              <Text size="md">${item.price}</Text>
            )}
            <Select maxW="50%" required placeholder="Quantity*" mb={4}>
              {Array.from({ length: item.maxQuantityPerPurchase }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </Select>

            <Button
              onClick={() => {
                dispatch(
                  removeItemInCartAction(item._id, userState?.result?.id)
                );
              }}
            >
              Remove
            </Button>
          </Box>
        ))}
        <Button type="submit">Check Out</Button>
      </form>
    </Box>
  );
};

export default ItemsInCart;
