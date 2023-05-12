import { useRouter } from "next/router";
import styles from "../../styles/Layout.module.css";
const Details = () => {
  const router = useRouter();
  const { productId } = router.query;

  return <div className={styles.container}>Details for product: {productId}</div>;
};

export default Details;
