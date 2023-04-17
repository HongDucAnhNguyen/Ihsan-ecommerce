import AuthForm from "@/components/AuthForm";
import styles from "../../styles/Account.module.css";
// import { useEffect, useState } from "react";
// import { Button, Heading } from "@chakra-ui/react";
// import { useRouter } from "next/router";
const Account = () => {
  return (
    <div className={styles.container}>
      <AuthForm></AuthForm>
    </div>
  );
};

export default Account;
