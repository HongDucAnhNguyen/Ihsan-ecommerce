const cartReducer = (
  state = {
    itemsInCart:
      typeof window !== "undefined" && localStorage.getItem("itemsInCart")
        ? JSON.parse(localStorage.getItem("itemsInCart"))
        : [],
  },
  action
) => {
  switch (action.type) {
    case "GET_ITEMS_IN_CART":
      localStorage.setItem("itemsInCart", JSON.stringify(action?.data));
      return { ...state, itemsInCart: action?.data };
    case "ADD_TO_CART":
      localStorage.setItem("itemsInCart", JSON.stringify(action?.data));
      return { ...state, itemsInCart: action?.data };
    default:
      return state;
  }
};
export default cartReducer;
