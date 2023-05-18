import { useEffect, useState } from "react";
import styles from "../../styles/Layout.module.css";
import ProductDetails from "@/pageSections/components/ProductDetails";
import { useSelector } from "react-redux";

const Details = ({ product }) => {
  const userState = useSelector((state) => state.authReducer.authData);
  
  return (
    <div className={styles.container}>
      <ProductDetails
        product={product}
        userId={userState?.result?.id}
      ></ProductDetails>
    </div>
  );
};

export default Details;

export async function getServerSideProps({ query }) {
  const { productId } = query; // get the product ID from the URL parameters
  const response = await fetch(
    `http://localhost:3000/api/products/${productId}`
  );
  const product = await response.json();
  return {
    props: {
      product,
    },
  };
}
