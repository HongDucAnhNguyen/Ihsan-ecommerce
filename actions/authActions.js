export const loginAction = (formData, setErrorMessage) => async (dispatch) => {
  try {
    const response = await fetch("/api/auth/login", {
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
export const registerAction =
  (formData, setErrorMessage) => async (dispatch) => {
    try {
      const response = await fetch("/api/auth/register", {
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
export const logoutAction = () => async (dispatch) => {
  try {
    await fetch("/api/auth/logout");
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "CLEAR_CART" });
  } catch (error) {
    console.log(error);
  }
};
export const updateAccountAction =
  (formData, userId, setMessage) => async (dispatch) => {
    try {
      const response = await fetch(`/api/auth/accountConfig/${userId}`, {
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
      if (data.result) {
        dispatch({ type: "UPDATE_ACCOUNT", data: data.result });
      }
    } catch (error) {
      console.log(error);
    }
  };
export const deleteAccountAction = (userId, setMessage) => async (dispatch) => {
  try {
    const response = await fetch(`/api/auth/accountConfig/${userId}`, {
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
/**this function authorizes only admin to interact with the admin page*/
export const adminAuthorizeAction =
  (providedCreds, setMessage) => async (dispatch) => {
    try {
      const response = await fetch("/api/auth/adminAuthorize", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(providedCreds),
      });

      if (response.ok) {
        dispatch({ type: "ADMIN_AUTHORIZE", data: true });
      } else {
        const data = await response.json();
        setMessage(data.message);
        dispatch({ type: "ADMIN_AUTHORIZE", data: false });
      }
    } catch (error) {
      console.log(error);
      
    }
  };
