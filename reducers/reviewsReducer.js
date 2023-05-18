const reviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case "CREATE_REVIEW":
      return { ...state, reviews: [action?.data, ...state.reviews] };
    case "GET_ALL_REVIEWS":
      return { ...state, reviews: action?.data };
    case "DELETE_REVIEW":
      return {
        ...state,
        reviews: state.reviews.filter((review) => review._id !== action?.data),
      };
    case "UPDATE_REVIEW":
      return {
        ...state,
        reviews: state.reviews.map((review) =>
          review._id === action?.data?._id ? action?.data : review
        ),
      };
    default:
      return state;
  }
};
export default reviewsReducer;
