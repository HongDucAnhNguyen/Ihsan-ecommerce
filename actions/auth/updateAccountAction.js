const updateAccountAction =
  (formData, userId, setMessage) => async (dispatch) => {
    try {
      const response = await fetch(`/api/accountConfig/${userId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      setMessage(data.message);

      console.log(data.result);
      dispatch({ type: "UPDATE_ACCOUNT", data: data.result });
    } catch (error) {
      console.log(error);
    }
  };
export default updateAccountAction;
