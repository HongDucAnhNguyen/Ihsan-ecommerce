import { useEffect, useState } from "react";
import styles from "../../styles/Layout.module.css";
import ProductDetails from "@/pageSections/components/ProductDetails";

const Details = ({ product }) => {
  return (
    <div className={styles.container}>
      <ProductDetails product={product}></ProductDetails>
    </div>
  );
};

export default Details;

export async function getServerSideProps({ query }) {
  const { productId } = query; // get the product ID from the URL parameters
  const response = await fetch(
    `https://ihsan-ecommerce.vercel.app/api/products/${productId}`
  );
  const product = await response.json();
  return {
    props: {
      product,
    },
  };
}
