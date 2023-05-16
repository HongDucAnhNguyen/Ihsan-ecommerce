import styles from "../../styles/Layout.module.css";
import Products from "@/pageSections/components/Products";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getProductsByCategoryAction } from "@/actions/productsActions";
import { Heading } from "@chakra-ui/react";
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
      <Products products={products}></Products>
    </div>
  );
};
export default Accessories;
