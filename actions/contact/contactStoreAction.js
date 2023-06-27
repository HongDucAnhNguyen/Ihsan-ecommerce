export const contactStoreAction = (contactFormData) => async (dispatch) => {
  try {
    dispatch({ type: "IS_LOADING" });
    await fetch("/api/contactStore", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactFormData),
    });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log(error);
  }
};
