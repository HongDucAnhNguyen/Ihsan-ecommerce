import React from "react";
import styles from "../styles/Layout.module.css";
import { Box, Button, Heading } from "@chakra-ui/react";
import ReactConfetti from "react-confetti";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
const SuccessPage = () => {
  const userState = useSelector((state) => state.authReducer.authData);
  const [windowSize, setWindowSize] = useState({
    width: "",
    height: "",
  });
  const router = useRouter();
  const handleResize = () => {
    setWindowSize({
      width: (window.innerWidth * 95) / 100,
      height: window.innerHeight,
    });
  };
  useEffect(() => {
    setWindowSize({
      width: (window.innerWidth * 95) / 100,
      height: window.innerHeight,
    });
    // Event listener callback for window resize

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
 
  return (
    <div className={styles.container}>
      <ReactConfetti
        width={windowSize.width}
        height={windowSize.height}
      ></ReactConfetti>
      <Box textAlign="center">
        <Heading>Order Placed, thank you for shopping with Ihsan</Heading>
      </Box>
    </div>
  );
};

export default SuccessPage;
