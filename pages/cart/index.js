import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Layout.module.css";
import { useEffect, useState } from "react";
import {
  getItemsInCartAction,
  removeItemInCartAction,
} from "@/actions/cartActions";
import Products from "@/pageSections/components/Products";
import { Box, Button, Heading, Select, Text } from "@chakra-ui/react";

const Cart = () => {
  const userState = useSelector((state) => state.authReducer.authData);
  const itemsInCart = useSelector((state) => state.cartReducer.itemsInCart);
  const [user, setUser] = useState(null);
  // const [cart, setCart] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setUser(userState);
  }, [userState]);
  useEffect(() => {
    if (userState) {
      dispatch(getItemsInCartAction(userState?.result?.id));
    }
  }, [dispatch]);
  if (!user) {
    return (
      <div className={styles.container}>
        <Heading>No User</Heading>
      </div>
    );
  } else if (user && itemsInCart.length === 0) {
    return (
      <div className={styles.container}>
        <Heading>Cart Is Empty</Heading>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      {itemsInCart.length > 0 && (
        <div>
          {itemsInCart.map((item) => (
            <div
              key={item._id}
              style={{
                margin: "5px",
                padding: "5px",
                border: "1px solid orange",
              }}
            >
              <Heading size="md">{item.title}</Heading>
              <Text size="md">{item.description}</Text>
              {item.isOnSale ? (
                <Text>${item.salePrice}</Text>
              ) : (
                <Text size="md">${item.price}</Text>
              )}
              <Select maxW="30%" required placeholder="Select Quantity*">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
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
            </div>
          ))}
        </div>
      )}
      {/*  */}
    </div>
  );
};
export default Cart;
