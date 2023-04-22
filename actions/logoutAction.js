const logoutAction =  () => async (dispatch) => {
  try {

    dispatch({ type: "LOGOUT" });
  } catch (error) {
    console.log(error);
  }
};

export default logoutAction;
