const getTokenAction = (userState) => async (dispatch) => {
  try {
    const response = await fetch("/api/getToken");
    const data = await response.json();

    if (data === "" && userState !== null) {
      dispatch({ type: "LOGOUT" });
    }
  } catch (error) {
    console.log(error);
  }
};

export default getTokenAction;
