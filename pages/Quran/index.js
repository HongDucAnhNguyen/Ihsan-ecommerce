import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Layout.module.css";
import { useEffect } from "react";
import { getProductsByCategoryAction } from "@/actions/productsActions";
import Products from "@/pageSections/components/Products";
import { useRouter } from "next/router";
const Quran = () => {
  const products = useSelector((state) => state.productReducer.products);
  const dispatch = useDispatch();
  const router = useRouter();
  const category = router.pathname.split("/")[1];
  useEffect(() => {
    dispatch(getProductsByCategoryAction(category));
  }, []);
  return (
    <div className={styles.container}>
      <Products products={products}></Products>
    </div>
  );
};
export default Quran;
