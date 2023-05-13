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

    const data = await response.json();
    if (data.message) {
      console.log(data.message);
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

    console.log(data);
    dispatch({ type: "GET_ITEMS_IN_CART", data: data });
  } catch (error) {
    console.log(error);
  }
};
