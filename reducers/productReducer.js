const productReducer = (
  state = { products: [], featuredProducts: [], productsOnSale: [] },
  action
) => {
  switch (action.type) {
    case "CREATE_PRODUCT":
      return { ...state, products: [action?.data, ...state.products] };
    case "GET_ALL_PRODUCTS":
      return { ...state, products: action?.data };
    case "GET_FEATURED_PRODUCTS":
      return { ...state, featuredProducts: action?.data };
    case "GET_PRODUCTS_ON_SALE":
      return { ...state, productsOnSale: action?.data };
    case "GET_PRODUCTS_BY_CATEGORY":
      return { ...state, products: action?.data };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action?.data._id ? action.data : product
        ),
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action?.data
        ),
      };
    default:
      return state;
  }
};
export default productReducer;
