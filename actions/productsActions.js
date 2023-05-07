export const createProductAction = (productFormData) => async (dispatch) => {
  try {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productFormData),
    });
    const data = await response.json();
    // dispatch({ type: "CREATE_PRODUCT", data: data });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
export const getAllProductsAction = () => async (dispatch) => {
  try {
    const response = await fetch("/api/products");
    const allProducts = await response.json();
    dispatch({ type: "GET_ALL_PRODUCTS", data: allProducts });
  } catch (error) {
    console.log(error);
  }
};
export const getFeaturedProductsAction = () => async (dispatch) => {
  try {
    const response = await fetch("/api/products/featuredProducts");
    const featuredProducts = await response.json();
    dispatch({ type: "GET_FEATURED_PRODUCTS", data: featuredProducts });
  } catch (error) {
    console.log(error);
  }
};
export const getProductsOnSaleAction = () => async (dispatch) => {
  try {
    const response = await fetch("/api/products/productsOnSale");
    const productsOnSale = await response.json();
    dispatch({ type: "GET_PRODUCTS_ON_SALE", data: productsOnSale });
  } catch (error) {
    console.log(error);
  }
};