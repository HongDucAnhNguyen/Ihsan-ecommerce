import HeroSection from "@/pageSections/HeroSection";
import FeaturedProductsSection from "@/pageSections/FeaturedProductsSection";
// import Image from "next/image";
// import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import { Box, Divider } from "@chakra-ui/react";
import Testimonials from "@/pageSections/Testimonials";
import OnSaleProductsSection from "@/pageSections/OnSaleProductsSection";
import Recommendations from "@/pageSections/Recommendations";
import { useEffect } from "react";

export default function Home() {
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
          <FeaturedProductsSection></FeaturedProductsSection>
          <Divider></Divider>
          <OnSaleProductsSection></OnSaleProductsSection>
          <Divider></Divider>
          <Recommendations></Recommendations>
          <Divider></Divider>
          <Testimonials></Testimonials>
        </Box>
      </Box>
    </main>
  );
}
