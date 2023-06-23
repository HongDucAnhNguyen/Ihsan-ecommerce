import {
  Box,
  Button,
  Flex,
  Heading,
  Img,
  Spinner,
  Text,
} from "@chakra-ui/react";
import styles from "../styles/Layout.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getItemsInCheckOutAction } from "@/actions/cartActions";
import payWithStripe from "@/actions/payment/payWithStripe";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import productCheckOutStyles from "../styles/Product.module.css";
const CheckOutPage = () => {
  const itemsToCheckOut = useSelector(
    (state) => state.cartReducer.itemsToCheckOut
  );
  const isLoading = useSelector((state) => state.cartReducer.isLoading);
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
  const subTotal = useSelector((state) => state.cartReducer.checkOutSubTotal);
  const userState = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (userState) {
      dispatch(getItemsInCheckOutAction(userState?.result?.id));
    }
  }, []);
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
      <motion.div variants={fadeInVariants} initial="initial" animate="animate">
        {itemsToCheckOut.length > 0 && !isLoading ? (
          <Box p={20} mt={20} mb={10}>
            {itemsToCheckOut.map((itemToCheckOut) => (
              <Box
                key={itemToCheckOut.itemId}
                mb={4}
                borderWidth="2px"
                borderRadius={10}
                p={10}
              >
                <Flex
                  gap={6}
                  className={productCheckOutStyles.itemToCheckOutInnerContainer}
                >
                  <Img
                    className={productCheckOutStyles.itemToCheckOutImage}
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
            ))}

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
          <Text fontSize="2xl">
            Please select at least one item to check out
          </Text>
        )}
      </motion.div>
    </div>
  );
};
export default CheckOutPage;
