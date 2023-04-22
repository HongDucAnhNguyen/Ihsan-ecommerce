const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case "AUTH":
      console.log("AUTH");
      //just incase i want to add more to auth state down the line
      return { ...state, authData: action?.data };
    case "LOGOUT":
      console.log("LOGOUT");
      return { ...state, authData: null };
    default:
      return state;
  }
};
export default authReducer;
