const useRegister = async (formData, setUser, setErrorMessage) => {
  try {
    const response = await fetch("/api/register", {
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
      localStorage.setItem("userProfile", JSON.stringify(data));
      setUser(JSON.parse(localStorage.getItem("userProfile")));
    }
  } catch (error) {
    console.log(error);
  }
};
export default useRegister;
