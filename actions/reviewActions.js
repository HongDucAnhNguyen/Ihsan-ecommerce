export const createReviewAction = (reviewData) => async (dispatch) => {
  try {
    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(reviewData),
    });
    const data = await response.json();
    if (data.message) {
      return;
    }
    dispatch({ type: "CREATE_REVIEW", data: data });
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
