export const createProductAction = (productFormData) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING" });
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productFormData),
    });
    const data = await response.json();
    dispatch({ type: "CREATE_PRODUCT", data: data });
    console.log(data);
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log(error);
  }
};
export const getAllProductsAction = () => async (dispatch) => {
  try {
    dispatch({ type: "LOADING" });

    const response = await fetch("/api/products");
    const allProducts = await response.json();
    dispatch({ type: "GET_ALL_PRODUCTS", data: allProducts });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log(error);
  }
};

export const getFeaturedProductsAction = () => async (dispatch) => {
  try {
    dispatch({ type: "LOADING" });

    const response = await fetch("/api/products/featuredProducts");
    const featuredProducts = await response.json();
    dispatch({ type: "GET_FEATURED_PRODUCTS", data: featuredProducts });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log(error);
  }
};
export const getProductsOnSaleAction =
  (productCategory) => async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });

      const response = await fetch(
        `/api/products/productsOnSale/${productCategory}`
      );
      const productsOnSale = await response.json();
      console.log(productsOnSale);
      dispatch({ type: "GET_PRODUCTS_ON_SALE", data: productsOnSale });
      dispatch({ type: "END_LOADING" });
    } catch (error) {
      console.log(error);
    }
  };
export const deleteProductAction = (productId) => async (dispatch) => {
  try {
    await fetch(`/api/products/${productId}`, { method: "DELETE" });
    dispatch({ type: "DELETE_PRODUCT", data: productId });
  } catch (error) {
    console.log(error);
  }
};
export const updateProductAction =
  (productId, productFormData) => async (dispatch) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productFormData),
      });
      const updatedProduct = await response.json();
      dispatch({ type: "UPDATE_PRODUCT", data: updatedProduct });
    } catch (error) {
      console.log(error);
    }
  };
export const getProductsByCategoryAction = (category) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING" });

    const response = await fetch(`/api/products/categories/${category}`);
    const productsOfCategory = await response.json();

    dispatch({ type: "GET_PRODUCTS_BY_CATEGORY", data: productsOfCategory });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log(error);
  }
};
// export const getProductAction = (productId) => async (dispatch) => {
//   try {
//     const response = await fetch(`/api/products/${productId}`);
//     const data = await response.json();
//     console.log(data);
//     dispatch({ type: "GET_PRODUCT", data: data });
//   } catch (error) {
//     console.log(error);
//   }
// };
