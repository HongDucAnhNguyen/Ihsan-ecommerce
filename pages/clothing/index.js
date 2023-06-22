import { useRouter } from "next/router";
import styles from "../../styles/Layout.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Box, Heading } from "@chakra-ui/react";
import Products from "@/pageSections/components/Products";
import { useEffect } from "react";
import { getProductsByCategoryAction } from "@/actions/productsActions";
const Clothing = ({products}) => {
  
  

  // const dispatch = useDispatch();
  // const router = useRouter();

  // useEffect(() => {
  //   const category =
  //     router.pathname.split("/")[router.pathname.split("/").length - 1];
  //   dispatch(getProductsByCategoryAction(category));
  // }, []);
  if (products.length === 0) {
    return (
      <div className={styles.container}>
        <Heading>No Products Available</Heading>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <Box
        sx={{
          width: "100%",
          p: 5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box maxW="100%" width={1200} textAlign="center">
          <Heading mb={6}>All Clothing Products</Heading>
          <Products products={products}></Products>
        </Box>
      </Box>
    </div>
  );
};

export default Clothing;
export async function getServerSideProps(context) {
  // get the product ID from the URL parameters
  const url = context.resolvedUrl.split("/");
  const category = url[url.length - 1];
  const productsByCategoryRes = await fetch(
    `${process.env.BASE_URL}/api/products/categories/${category}`
  );
  const productsByCategoryData = await productsByCategoryRes.json();
  return {
    props: {
      products: productsByCategoryData,
    },
  };
}