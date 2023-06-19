export const createProductAction =
  (productFormData, toast, userId) => async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });
      await fetch("/api/auth/admin/adminActionsAuthorize", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userId),
      });
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productFormData),
      });
      const data = await response.json();
      if (data.message) {
        toast({
          position: "bottom-left",
          title: data.messageTitle,
          status: "error",
          description: data.message,
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      await fetch("/api/stripe/products", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          isOnSale: data.isOnSale,
          salePrice: data.salePrice,
          price: data.price,
          description: data.description,
          imgUrl: data.imgUrl,
          id: data._id,
        }),
      });
      dispatch({ type: "CREATE_PRODUCT", data: data });
      console.log(data);
      dispatch({ type: "END_LOADING" });
    } catch (error) {
      console.log(error);
    }
  };

export const getAllProductsAction = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "IS_LOADING" });
    await fetch("/api/auth/admin/adminActionsAuthorize", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userId),
    });
    const response = await fetch("/api/products");
    const allProducts = await response.json();
    dispatch({ type: "GET_ALL_PRODUCTS", data: allProducts });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log(error);
  }
};

// export const getRecommendedProductsAction = () => async (dispatch) => {
//   try {
//     dispatch({ type: "IS_LOADING" });

//     const response = await fetch("/api/products/recommendedProducts");
//     const recommendedProducts = await response.json();

//     dispatch({ type: "GET_RECOMMENDED_PRODUCTS", data: recommendedProducts });
//     dispatch({ type: "END_LOADING" });
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const getFeaturedProductsAction = () => async (dispatch) => {
//   try {
//     dispatch({ type: "IS_LOADING" });

//     const response = await fetch("/api/products/featuredProducts");
//     const featuredProducts = await response.json();
//     console.log(featuredProducts);
//     dispatch({ type: "GET_FEATURED_PRODUCTS", data: featuredProducts });
//     dispatch({ type: "END_LOADING" });
//   } catch (error) {
//     console.log(error);
//   }
// };
export const getProductsOnSaleAction =
  (productCategory) => async (dispatch) => {
    try {
      dispatch({ type: "IS_LOADING" });

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
export const deleteProductAction = (productId, userId) => async (dispatch) => {
  try {
    dispatch({ type: "IS_LOADING" });
    await fetch("/api/auth/admin/adminActionsAuthorize", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userId),
    });
    await fetch(`/api/products/${productId}`, { method: "DELETE" });
    await fetch(`/api/stripe/${productId}`, { method: "DELETE" });
    dispatch({ type: "DELETE_PRODUCT", data: productId });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log(error);
  }
};
export const updateProductAction =
  (productId, productFormData, toast, userId) => async (dispatch) => {
    try {
      await fetch("/api/auth/admin/adminActionsAuthorize", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userId),
      });
      const response = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productFormData),
      });
      const data = await response.json();
      if (data.message) {
        toast({
          position: "bottom-left",
          title: data.messageTitle,
          status: "error",
          description: data.message,
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      await fetch(`/api/stripe/${productId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: productFormData.title,

          price: productFormData.isOnSale
            ? productFormData.salePrice
            : productFormData.price,
          description: productFormData.description,
          imgUrl: productFormData.imgUrl,
        }),
      });
      dispatch({ type: "UPDATE_PRODUCT", data: data });
    } catch (error) {
      console.log(error);
    }
  };

// export const getProductsByCategoryAction = (category) => async (dispatch) => {
//   try {
//     dispatch({ type: "IS_LOADING" });

//     const response = await fetch(`/api/products/categories/${category}`);
//     const productsOfCategory = await response.json();

//     dispatch({ type: "GET_PRODUCTS_BY_CATEGORY", data: productsOfCategory });
//     dispatch({ type: "END_LOADING" });
//   } catch (error) {
//     console.log(error);
//   }
// };
export const searchProductsAction = (searchTerm) => async (dispatch) => {
  try {
    dispatch({ type: "IS_LOADING" });
    const response = await fetch(
      `/api/products/search?searchQuery=${searchTerm}`
    );
    const data = await response.json();

    dispatch({ type: "GET_SEARCH_RESULTS", data: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log(error);
  }
};
export const getProductsInWishList = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "IS_LOADING" });
    const response = await fetch(`/api/products/wishlist/${userId}`);
    const data = await response.json();
    //list of products that have been starred by user\

    dispatch({ type: "GET_WISH_LIST", data: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log(error);
  }
};
export const addProductToWishList =
  (userId, productId, toast) => async (dispatch) => {
    try {
      const response = await fetch(`/api/products/wishlist/${userId}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productId),
      });
      const data = await response.json();
      if (data.message) {
        toast({
          position: "bottom-left",
          title: "Existing item.",
          status: "error",
          description: data.message,
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          position: "bottom-left",
          title: "Added to Wish List.",
          status: "success",
          description: "Product successfully added to Wish List",
          duration: 5000,
          isClosable: true,
        });

        dispatch({ type: "ADD_TO_WISH_LIST", data: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
export const removeProductFromWishList =
  (userId, productId) => async (dispatch) => {
    try {
      await fetch(`/api/products/wishlist/remove/${userId}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productId),
      });

      dispatch({ type: "REMOVE_FROM_WISH_LIST", data: productId });
    } catch (error) {
      console.log(error);
    }
  };
