import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Layout.module.css";
import { useEffect } from "react";
import { getProductsByCategoryAction } from "@/actions/productsActions";
import Products from "@/pageSections/components/Products";
import { useRouter } from "next/router";
import { Box, Heading } from "@chakra-ui/react";
const Quran = () => {
  const products = useSelector((state) => state.productReducer.products);
  const dispatch = useDispatch();
  const router = useRouter();
  const category = router.pathname.split("/")[1];
  useEffect(() => {
    dispatch(getProductsByCategoryAction(category));
  }, []);
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
          <Heading mb={6}>Qur'an</Heading>
          <Products products={products}></Products>
        </Box>
      </Box>
    </div>
  );
};
export default Quran;
