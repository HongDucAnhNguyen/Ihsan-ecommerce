const logoutAction = () => async (dispatch) => {
  try {
    await fetch("/api/logout");
    dispatch({ type: "LOGOUT" });
  } catch (error) {
    console.log(error);
  }
};

export default logoutAction;
