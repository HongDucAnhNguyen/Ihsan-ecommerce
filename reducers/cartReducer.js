const cartReducer = (
  state = {
    itemsInCart: [],
  },
  action
) => {
  switch (action.type) {
    case "GET_ITEMS_IN_CART":
      return { ...state, itemsInCart: action?.data };
    case "ADD_TO_CART":
      return { ...state, itemsInCart: [...state.itemsInCart, action?.data] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        itemsInCart: state.itemsInCart.filter(
          (item) => item._id !== action?.data
        ),
      };
    case "CLEAR_CART":
      return { ...state, itemsInCart: [] };
    default:
      return state;
  }
};
export default cartReducer;
