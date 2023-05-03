const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "CREATE_PRODUCT":
      return [...products, action?.data];
    default:
      return state;
  }
};
export default productReducer;
