const payWithStripe = async (userId, router) => {
  try {
    const response = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userId),
    });
    const data = await response.json();
    console.log(data);
    router.push(data);
  } catch (error) {
    console.log(error);
  }
};
export default payWithStripe;
