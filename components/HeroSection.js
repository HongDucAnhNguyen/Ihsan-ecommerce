import React from "react";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { Button, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import heroImg from "../public/heroImg.jpg";
const HeroSection = () => {
  return (
    <div className={styles.heroSection}>
      <Image className={styles.heroImg} src={heroImg} alt="quran"></Image>
      <div className={styles.heroDescription}>
        <Heading fontSize={48} flexGrow={1}>
          Islamic Gift Shop.
        </Heading>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text fontSize="2xl" sx={{ maxWidth: 400 }}>
            Providing the best products and gifts for Muslims, by Muslims.
          </Text>
        </div>
        <br></br>
        <Link href="/Quran">
          <Button
            sx={{
              border: "1px solid white",
              background: "transparent",
              "&:hover": { background: "black" },
            }}
          >
            Shop Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;