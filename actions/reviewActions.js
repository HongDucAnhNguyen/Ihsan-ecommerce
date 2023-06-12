export const createReviewAction = (reviewData, toast) => async (dispatch) => {
  try {
    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });
    const data = await response.json();
    if (data.message) {
      toast({
        position: "bottom-left",
        title: "Existing Comment.",
        status: "error",
        description: data.message,
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    dispatch({ type: "CREATE_REVIEW", data: data });
    const { productId } = reviewData;
    const updatedUserRes = await fetch(`/api/products/calcRating/${productId}`);
    const updatedUserData = await updatedUserRes.json();

    dispatch({ type: "UPDATE_PRODUCT", data: updatedUserData });
  } catch (error) {
    console.log(error);
  }
};
export const getReviewsAction = (productId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/reviews/${productId}`);
    const data = await response.json();
    dispatch({ type: "GET_ALL_REVIEWS", data: data });
  } catch (error) {}
};
export const deleteReviewAction = (reviewId, productId) => async (dispatch) => {
  try {
    await fetch(`/api/reviews/reviewConfig/${reviewId}`, { method: "DELETE" });

    dispatch({ type: "DELETE_REVIEW", data: reviewId });

    const updatedUserRes = await fetch(`/api/products/calcRating/${productId}`);
    const updatedUserData = await updatedUserRes.json();

    dispatch({ type: "UPDATE_PRODUCT", data: updatedUserData });
  } catch (error) {}
};
export const updateReviewAction =
  (reviewId, reviewData) => async (dispatch) => {
    try {
      const response = await fetch(`/api/reviews/reviewConfig/${reviewId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });
      const data = await response.json();
      dispatch({ type: "UPDATE_REVIEW", data: data });
      const { productId } = reviewData;
      const updatedUserRes = await fetch(
        `/api/products/calcRating/${productId}`
      );
      const updatedUserData = await updatedUserRes.json();

      dispatch({ type: "UPDATE_PRODUCT", data: updatedUserData });
    } catch (error) {}
  };
