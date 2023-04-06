import React from "react";

const Testimonials = () => {
  return (
    //pull data from backend
    //data that does not update frequently
    <div style={{ padding: 20 }}>
      <h1>Testimonials</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "",
          alignItems: "center",
          gap: 20,
        }}
      >
        <h1>Ahmed: Wow this is awesome</h1>
        <h1>Khadijjah: Good shop so many to choose from</h1>
        <h1>Sanya: Cute shop cute gifts</h1>
        <h1>Tariq: Quah1ty products </h1>
      </div>
    </div>
  );
};

export default Testimonials;
