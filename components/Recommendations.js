import React from "react";

const Recommendations = () => {
  return (
    <div style={{padding: 20}}>
      <h1>Weekly Recommendations</h1>
      <div
        style={{
         
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div>Product 1</div>
        <div>Product 2</div>
        <div>Product 3</div>
        <div>Product 4</div>
        <div>Product 5</div>
        <div>Product 6</div>
        <div>Product 7</div>
      </div>
    </div>
  );
};

export default Recommendations;