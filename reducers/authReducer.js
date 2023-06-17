const authReducer = (
  state = {
    authData:
      typeof window !== "undefined" && localStorage.getItem("userProfile")
        ? JSON.parse(localStorage.getItem("userProfile"))
        : null,
    isAuthorizedAsAdmin: null,
  },
  action
) => {
  switch (action.type) {
    case "AUTH":
      console.log("AUTH");
      //just incase i want to add more to auth state down the line
      localStorage.setItem("userProfile", JSON.stringify(action?.data));
      return { ...state, authData: action?.data };
    case "ADMIN_VERIFY":
      //just incase i want to add more to auth state down the line

      return { ...state, isAuthorizedAsAdmin: action?.data };
   
    case "UPDATE_ACCOUNT":
      console.log(action?.data);
      localStorage.setItem("userProfile", JSON.stringify(action?.data));
      return { ...state, authData: action?.data };
    case "LOGOUT":
      console.log("LOGOUT");
      localStorage.clear();
      return { ...state, authData: null, isAuthorizedAsAdmin: null };
    default:
      return state;
  }
};
export default authReducer;
