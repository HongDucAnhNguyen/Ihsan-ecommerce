import { useSelector } from "react-redux";
import styles from "../styles/Layout.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
const Admin = () => {
  const router = useRouter();
  const userState = useSelector((state) => state.authReducer.authData);
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(userState);
    const storedUser = localStorage.getItem("userProfile");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(userState);
    }
    if (!userState || userState?.result?.id !== "6444b7e5c1115af830ba3746") {
      router.push("/");
    }
  }, [userState]);
  return (
    <div className={styles.container}>Admin: {user?.result?.username}</div>
  );
};

export default Admin;
