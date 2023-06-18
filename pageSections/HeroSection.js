import React from "react";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { Button, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import heroImg from "../public/heroImg.jpg";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const HeroSection = () => {
  const router = useRouter();
  // Define the animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };
  return (
    <motion.div
      className={styles.heroSection}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={imageVariants}>
        <Image className={styles.heroImg} src={heroImg} alt="quran"></Image>
      </motion.div>
      <motion.div variants={textVariants} className={styles.heroDescription}>
        <Heading mt={12} size="2xl">Islamic Gift Shop.</Heading>

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

        <Button
          size="lg"
          onClick={() => {
            router.push("/Quran");
          }}
          border="1px solid white"
          bg="transparent"
          _hover={{ bg: "black" }}
        >
          Shop Now
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
