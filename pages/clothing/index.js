import { useRouter } from "next/router";
import styles from "../../styles/Layout.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Heading } from "@chakra-ui/react";
import Products from "@/pageSections/components/Products";
import { useEffect } from "react";
import { getProductsByCategoryAction } from "@/actions/productsActions";
const Clothing = () => {
  const products = useSelector((state) => state.productReducer.products);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const category =
      router.pathname.split("/")[router.pathname.split("/").length - 1];
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
      <Products products={products}></Products>
    </div>
  );
};

export default Clothing;
