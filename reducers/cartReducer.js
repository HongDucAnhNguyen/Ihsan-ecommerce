const cartReducer = (
  state = {
    itemsInCart: [],
    itemsToCheckOut: [],
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
      return { ...state, itemsInCart: [], itemsToCheckOut: [] };
    case "GET_ITEMS_IN_CHECKOUT":
      return { ...state, itemsToCheckOut: action?.data };
    case "ADD_ITEM_TO_CHECKOUT":
      return {
        ...state,
        itemsToCheckOut: [...state.itemsToCheckOut, action?.data],
      };
    case "REMOVE_FROM_CHECKOUT":
      return {
        ...state,
        itemsToCheckOut: state.itemsToCheckOut.filter(
          (item) => item._id !== action?.data
        ),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        itemsToCheckOut: state.itemsToCheckOut.map((itemToCheckOut) =>
          itemToCheckOut.itemId === action?.data?.productId
            ? { ...itemToCheckOut, quantity: action?.data?.quantity }
            : itemToCheckOut
        ),
      };

    default:
      return state;
  }
};
export default cartReducer;
