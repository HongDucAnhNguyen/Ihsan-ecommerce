export const addItemToCartAction =
  (productId, user_id, toast) => async (dispatch) => {
    try {
      //call to add product id to user's cart
      const response = await fetch(`/api/cart/${user_id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productId),
      });
      //call to add product object to cart reducer, rendered on page

      const data = await response.json();
      if (data.message) {
        toast &&
          toast({
            position: "bottom-left",
            title: data.messageTitle,
            status: "error",
            description: data.message,
            duration: 5000,
            isClosable: true,
          });
        return;
      }
      dispatch({ type: "ADD_TO_CART", data: data });
    } catch (error) {
      console.log(error);
    }
  };

export const getItemsInCartAction = (user_id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/cart/${user_id}`);
    const data = await response.json();

    dispatch({ type: "GET_ITEMS_IN_CART", data: data });
  } catch (error) {
    console.log(error);
  }
};
export const toggleSelectStatus =
  (productId, user_id, selectedValue) => async (dispatch) => {
    try {
      await fetch(`/api/cart/select_toggle/${user_id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, selectedValue }),
      });
      dispatch({
        type: "TOGGLE_ITEM_SELECTION",
        data: { itemId: productId, selected: selectedValue },
      });
    } catch (error) {
      console.log(error);
    }
  };
export const removeItemInCartAction =
  (productId, user_id) => async (dispatch) => {
    try {
      await fetch(`/api/cart/remove/${user_id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productId),
      });
      dispatch({ type: "REMOVE_FROM_CART", data: productId });
    } catch (error) {
      console.log(error);
    }
  };

export const addItemToCheckOutAction =
  (productId, userId) => async (dispatch) => {
    try {
      const response = await fetch(`/api/checkout/${userId}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: productId, quantity: 1 }),
      });
      const data = await response.json();

      dispatch({ type: "ADD_ITEM_TO_CHECKOUT", data: data });
      dispatch({ type: "CALCULATE_SUBTOTAL" });
    } catch (error) {
      console.log(error);
    }
  };
export const removeItemFromCheckOutAction =
  (productId, userId) => async (dispatch) => {
    try {
      await fetch(`/api/checkout/remove/${userId}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productId),
      });
      // const data = await response.json();
      dispatch({ type: "REMOVE_FROM_CHECKOUT", data: productId });
      dispatch({ type: "CALCULATE_SUBTOTAL" });
    } catch (error) {
      console.log(error);
    }
  };
export const getItemsInCheckOutAction = (userId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/checkout/${userId}`);
    const data = await response.json();
    dispatch({ type: "GET_ITEMS_IN_CHECKOUT", data: data });
    dispatch({ type: "CALCULATE_SUBTOTAL" });
  } catch (error) {
    console.log(error);
  }
};
export const setItemQuantityAction =
  (productId, quantity, userId) => async (dispatch) => {
    try {
      await fetch(`/api/checkout/quantity/${userId}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });
      dispatch({
        type: "UPDATE_QUANTITY",
        data: { productId, quantity },
      });
      dispatch({ type: "CALCULATE_SUBTOTAL" });
    } catch (error) {
      console.log(error);
    }
  };
export const setCheckOutBuyNowAction =
  (productId, userId) => async (dispatch) => {
    try {
      const response = await fetch(`/api/checkout/buynow/${userId}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      const data = await response.json();
      dispatch({ type: "BUY_NOW", data: data });
    } catch (error) {
      console.log(error);
    }
  };
