const cartReducer = (
  state = {
    itemsInCart: [],
    itemsToCheckOut: [],
    checkOutSubTotal: 0,
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
          (item) => item.itemId !== action?.data
        ),
      };
    case "CLEAR_CART":
      return { ...state, itemsInCart: [], itemsToCheckOut: [] };
    case "TOGGLE_ITEM_SELECTION":
      return {
        ...state,
        itemsInCart: state.itemsInCart.map((item) =>
          item.itemId === action?.data?.itemId
            ? {
                ...item,
                isSelectedForCheckOut: action?.data?.selected,
              }
            : item
        ),
      };
    case "GET_ITEMS_IN_CHECKOUT":
      return { ...state, itemsToCheckOut: action?.data };
    case "BUY_NOW":
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
          (item) => item.itemId !== action?.data
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
    case "CALCULATE_SUBTOTAL":
      let total = 0;

      state.itemsToCheckOut.forEach((itemToCheckOut) => {
        if (itemToCheckOut.isOnSale) {
          total += itemToCheckOut.salePrice * itemToCheckOut.quantity;
        } else total += itemToCheckOut.price * itemToCheckOut.quantity;
      });
      return {
        ...state,
        checkOutSubTotal: total,
      };
    default:
      return state;
  }
};
export default cartReducer;
