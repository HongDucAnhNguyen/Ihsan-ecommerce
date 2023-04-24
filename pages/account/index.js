import { useSelector } from "react-redux";
import styles from "../../styles/Layout.module.css";
import { useEffect, useState } from "react";
// import { Button, Heading } from "@chakra-ui/react";
// import { useRouter } from "next/router";
const Account = () => {
  const userState = useSelector((state) => state.authReducer.authData);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // console.log(userState);

    // const storedUser = localStorage.getItem("userProfile");
    // if (storedUser) {
    //   setUser(JSON.parse(storedUser));
    // } else {

    setUser(userState);
  }, [userState]);
  if (!user || user?.result?.id !== process.env.NEXT_PUBLIC_ADMIN_ID) {
    return <div className={styles.container}>Unauthorized</div>;
  }
  return (
    <div className={styles.container}>
      {/* <AuthForm></AuthForm> */}
      Account Management
    </div>
  );
};

export default Account;
