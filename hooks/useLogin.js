const useLogin = async (formData, setUser, setIsAuthenticated) => {
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
    localStorage.setItem("userProfile", JSON.stringify(data));
    setUser(JSON.parse(localStorage.getItem("userProfile")));
    setIsAuthenticated(true);
  } catch (error) {
    console.log(error);
  }
};
export default useLogin;
