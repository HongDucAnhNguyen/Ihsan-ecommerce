const deleteAccountAction = (userId, setMessage) => async (dispatch) => {
  try {
    const response = await fetch(`/api/accountConfig/${userId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    setMessage(data.message);
    dispatch({ type: "LOGOUT" });
  } catch (error) {
    console.log(error);
    setMessage(error.message);
  }
};
export default deleteAccountAction;
