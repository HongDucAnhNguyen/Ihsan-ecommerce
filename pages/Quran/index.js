import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Layout.module.css";
import { useEffect } from "react";
import { getProductsByCategoryAction } from "@/actions/productsActions";
import Products from "@/pageSections/components/Products";
import { useRouter } from "next/router";
import { Box, Heading } from "@chakra-ui/react";
const Quran = ({ products }) => {
  // const products = useSelector((state) => state.productReducer.products);
  const isLoading = useSelector((state) => state.cartReducer.isLoading);
  // const dispatch = useDispatch();
  // const router = useRouter();
  // const category = router.pathname.split("/")[1];

  // useEffect(() => {
  //   dispatch(getProductsByCategoryAction(category));
  // }, []);
  if (!isLoading && products.length === 0) {
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
          mt: 20,
          width: "100%",
          p: 5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box maxW="100%" width={1200} textAlign="center">
          <Heading mb={6}>Qur'an</Heading>
          <Products products={products}></Products>
        </Box>
      </Box>
    </div>
  );
};
export default Quran;
export async function getServerSideProps(context) {
  // get the product ID from the URL parameters
  const url = context.resolvedUrl.split("/");
  const category = url[url.length - 1];
  const productsByCategoryRes = await fetch(
    `${process.env.BASE_APP_URL}/api/products/categories/${category}`
  );
  const productsByCategoryData = await productsByCategoryRes.json();
  return {
    props: {
      products: productsByCategoryData,
    },
  };
}
