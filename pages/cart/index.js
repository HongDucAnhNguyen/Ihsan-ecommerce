import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Layout.module.css";
import { useEffect, useState } from "react";
import { getItemsInCartAction } from "@/actions/cartActions";
import Products from "@/pageSections/components/Products";
import { Heading } from "@chakra-ui/react";

const Cart = () => {
  const userState = useSelector((state) => state.authReducer.authData);
  const itemsInCart = useSelector((state) => state.cartReducer.itemsInCart);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    setCart(itemsInCart);
  }, [itemsInCart]);
  useEffect(() => {
    dispatch(getItemsInCartAction("645ec315624de563a4b83200"));
  }, []);
  if (cart.length === 0) {
    return (
      <div className={styles.container}>
        <Heading>Cart Is Empty</Heading>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <Products products={cart}></Products>
      {/* <div>
        {cart.map((itemId) => (
          <p key={itemId}>{itemId}</p>
        ))}
      </div> */}
    </div>
  );
};
export default Cart;
