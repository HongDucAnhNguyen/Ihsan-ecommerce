export const addItemToCartAction = (productId, user_id) => async (dispatch) => {
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

    const updatedCart = await response.json();
    dispatch({ type: "ADD_TO_CART", data: updatedCart });
  } catch (error) {
    console.log(error);
  }
};

export const getItemsInCartAction = (user_id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/cart/${user_id}`);
    const allItemsInCart = await response.json();
    
    console.log(allItemsInCart);
    dispatch({ type: "GET_ITEMS_IN_CART", data: allItemsInCart });
  } catch (error) {
    console.log(error);
  }
};
