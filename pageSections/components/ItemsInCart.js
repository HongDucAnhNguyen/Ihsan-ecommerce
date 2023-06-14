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
  Img,
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
          <Box
            mt={3}
            mb={6}
            key={item.itemId}
            borderRadius={10}
            borderWidth="2px"
            p={10}
          >
            <Flex gap={6}>
              <Img width="30%" height="30%" src={item.imgUrl}></Img>
              <Box>
                <Flex gap={5} mb={3}>
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

                <Text width="70%">{item.description}</Text>

                {item.availableStock === 1 && (
                  <Text color="red.600">Only 1 left in stock!</Text>
                )}
                <Flex gap={3}>
                  <Text
                    color="blue.600"
                    fontSize="2xl"
                    sx={{
                      textDecorationLine: item.isOnSale && "line-through",
                    }}
                  >
                    ${item.price}
                  </Text>
                  {item.isOnSale && (
                    <Text color="orange.600" fontSize="3xl" fontWeight="bold">
                      ${item.salePrice}
                    </Text>
                  )}
                </Flex>
                {item.availableStock === 0 ? (
                  <Text mb={3} color="red.600" fontWeight="bold">
                    SOLD OUT
                  </Text>
                ) : (
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
                        (itemToCheckOut) =>
                          itemToCheckOut.itemId === item.itemId
                      )?.quantity
                    }
                  >
                    {Array.from(
                      { length: item.maxQuantityPerPurchase },
                      (_, i) => (
                        <option key={i} value={i + 1}>
                          Quantity: {i + 1}
                        </option>
                      )
                    )}
                  </Select>
                )}

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
            </Flex>
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
