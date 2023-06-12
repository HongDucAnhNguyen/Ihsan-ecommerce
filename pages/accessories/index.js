import styles from "../../styles/Layout.module.css";
import Products from "@/pageSections/components/Products";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getProductsByCategoryAction } from "@/actions/productsActions";
import { Box, Heading } from "@chakra-ui/react";
import { useEffect } from "react";

const Accessories = () => {
  const products = useSelector((state) => state.productReducer.products);
  const isLoading = useSelector((state) => state.productReducer.isLoading);
  const dispatch = useDispatch();
  const router = useRouter();
  const category =
    router.pathname.split("/")[router.pathname.split("/").length - 1];
  useEffect(() => {
    dispatch(getProductsByCategoryAction(category));
  }, []);
  if (products.length === 0 && !isLoading) {
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
          <Heading mb={6}>Accessories</Heading>
          <Products products={products}></Products>
        </Box>
      </Box>
    </div>
  );
};
export default Accessories;
