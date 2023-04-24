import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
// import Image from "next/image";
// import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import { Divider } from "@chakra-ui/react";
import Testimonials from "@/components/Testimonials";
import OnSaleProducts from "@/components/OnSaleProducts";
import Recommendations from "@/components/Recommendations";

export default function Home() {
  return (
    <>
      
      <main className={styles.container}>
        <HeroSection></HeroSection>
        <FeaturedProducts></FeaturedProducts>
        <Divider></Divider>
        <OnSaleProducts></OnSaleProducts>
        <Divider></Divider>
        <Recommendations></Recommendations>
        <Divider></Divider>
        <Testimonials></Testimonials>
      </main>
    </>
  );
}
