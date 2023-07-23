import HeroSection from "@/pageSections/HeroSection";

import styles from "../styles/Home.module.css";
import { Box, Divider, Heading } from "@chakra-ui/react";
import Testimonials from "@/pageSections/Testimonials";
import OnSaleProductsSection from "@/pageSections/OnSaleProductsSection";

import Products from "@/pageSections/components/Products";

export default function Home({ featuredProducts, recommendedProducts }) {
  return (
    <main className={styles.main}>
      <HeroSection></HeroSection>
      <Box
        sx={{
          width: "100%",
          p: 5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box maxW="100%" width={1200}>
          <Heading mb={4}>Featured Products</Heading>

          {featuredProducts.length > 0 && (
            <Products products={featuredProducts}></Products>
          )}
          <Divider></Divider>
          <OnSaleProductsSection></OnSaleProductsSection>
          <Divider></Divider>
          <Heading mt={5} mb={4}>
            Recommendations
          </Heading>
          {recommendedProducts.length > 0 && (
            <Products products={recommendedProducts}></Products>
          )}
          <Divider></Divider>
          <Testimonials></Testimonials>
        </Box>
      </Box>
    </main>
  );
}
export async function getServerSideProps() {
  const featuredProductsRes = await fetch(
    `${process.env.BASE_APP_URL}/api/products/featuredProducts`
  );
  const featuredProductsData = await featuredProductsRes.json();
  const recommendedProductsRes = await fetch(
    `${process.env.BASE_APP_URL}/api/products/recommendedProducts`
  );
  const recommendedProductsData = await recommendedProductsRes.json();
  return {
    props: {
      featuredProducts: featuredProductsData,
      recommendedProducts: recommendedProductsData,
    },
  };
}
