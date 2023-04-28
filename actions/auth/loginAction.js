const loginAction = (formData, setErrorMessage) => async (dispatch) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();

    if (data.message) {
      setErrorMessage(data.message);
    } else {
      dispatch({ type: "AUTH", data: data });
    }
  } catch (error) {
    console.log(error);
  }
};

export default loginAction;
