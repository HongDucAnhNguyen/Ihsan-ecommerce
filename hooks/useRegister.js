const useRegister = async (formData) => {
  const { data } = await fetch("/api/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};
export default useRegister;
