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
  } catch (error) {
    console.log(error);
  }
};
