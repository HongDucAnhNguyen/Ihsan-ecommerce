const cartReducer = (
  state = {
    itemsInCart: [],
  },
  action
) => {
  switch (action.type) {
    case "GET_ITEMS_IN_CART":
      localStorage.setItem("itemsInCart", JSON.stringify(action?.data));
      return { ...state, itemsInCart: action?.data };
    case "ADD_TO_CART":
      return { ...state, itemsInCart: [...state.itemsInCart, action?.data] };
    case "REMOVE_FROM_CART":
      const currentCart = JSON.parse(localStorage.getItem("itemsInCart"));
      const updatedCart = currentCart.filter(
        (item) => item._id !== action?.data
      );
      localStorage.setItem("itemsInCart", JSON.stringify(updatedCart));
      return {
        ...state,
        itemsInCart: state.itemsInCart.filter(
          (item) => item._id !== action?.data
        ),
      };
    default:
      return state;
  }
};
export default cartReducer;
