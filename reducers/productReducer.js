const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "CREATE_PRODUCT":
      return { ...state, products: [...products, action?.data] };
    case "GET_PRODUCTS":
      return { ...state, products: action?.data };
    default:
      return state;
  }
};
export default productReducer;
