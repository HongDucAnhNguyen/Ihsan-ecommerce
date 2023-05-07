const productReducer = (
  state = { products: [], featuredProducts: [], productsOnSale: [] },
  action
) => {
  switch (action.type) {
    case "CREATE_PRODUCT":
      return { ...state, products: [...products, action?.data] };
      case "GET_ALL_PRODUCTS":
        return { ...state, products: action?.data };
    case "GET_FEATURED_PRODUCTS":
      return { ...state, featuredProducts: action?.data };
    case "GET_PRODUCTS_ON_SALE":
      return { ...state, productsOnSale: action?.data };
    default:
      return state;
  }
};
export default productReducer;
