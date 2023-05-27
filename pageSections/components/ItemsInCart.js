import {
  addItemToCheckOutAction,
  getItemsInCartAction,
  getItemsInCheckOutAction,
  removeItemFromCheckOutAction,
  removeItemInCartAction,
  setItemQuantityAction,
  toggleSelectStatus,
} from "@/actions/cartActions";
import {
  Box,
  Heading,
  Select,
  Button,
  Text,
  Checkbox,
  Flex,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const ItemsInCart = () => {
  const userState = useSelector((state) => state.authReducer.authData);
  const itemsInCart = useSelector((state) => state.cartReducer.itemsInCart);
  const itemsToCheckOut = useSelector(
    (state) => state.cartReducer.itemsToCheckOut
  );
  
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (userState) {
      dispatch(getItemsInCartAction(userState?.result?.id));
      dispatch(getItemsInCheckOutAction(userState?.result?.id));
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
          <Box key={item.itemId} border="3px solid orange" p={3} mb={4} mt={4}>
            <Flex gap={5}>
              <Checkbox
                isChecked={item.isSelectedForCheckOut}
                onChange={(e) => {
                  //if is checked add to itemsToCheckOut
                  //if false, remove from itemsToCheckOut

                  dispatch(
                    toggleSelectStatus(
                      item.itemId,
                      userState?.result?.id,
                      e.target.checked
                    )
                  );
                  if (e.target.checked === true) {
                    dispatch(
                      addItemToCheckOutAction(
                        item.itemId,
                        userState?.result?.id
                      )
                    );
                  } else {
                    dispatch(
                      removeItemFromCheckOutAction(
                        item.itemId,
                        userState?.result?.id
                      )
                    );
                  }
                }}
              ></Checkbox>
              <Heading
                cursor="pointer"
                onClick={() => {
                  router.push({
                    pathname: "/details",
                    query: { productId: item.itemId },
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
            </Flex>

            <Text size="md">{item.description}</Text>

            {item.isOnSale ? (
              <Text>${item.salePrice}</Text>
            ) : (
              <Text size="md">${item.price}</Text>
            )}

            <Select
              onChange={(e) => {
                //dispatch action to update quantity of item
                console.log(e.target.value);
                dispatch(
                  setItemQuantityAction(
                    item.itemId,
                    e.target.value,
                    userState?.result?.id
                  )
                );
              }}
              maxW="50%"
              required
              mb={4}
              value={
                itemsToCheckOut.find(
                  (itemToCheckOut) => itemToCheckOut.itemId === item.itemId
                )?.quantity
              }
            >
              {Array.from({ length: item.maxQuantityPerPurchase }, (_, i) => (
                <option key={i} value={i + 1}>
                  Quantity: {i + 1}
                </option>
              ))}
            </Select>

            <Button
              onClick={() => {
                dispatch(
                  removeItemFromCheckOutAction(
                    item.itemId,
                    userState?.result?.id
                  )
                );
                dispatch(
                  removeItemInCartAction(item.itemId, userState?.result?.id)
                );
              }}
            >
              Remove
            </Button>
          </Box>
        ))}

        <Button colorScheme="yellow" type="submit">
          Proceed to Check Out
        </Button>
      </form>
    </Box>
  );
};

export default ItemsInCart;
