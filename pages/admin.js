import { useSelector } from "react-redux";
import styles from "../styles/Layout.module.css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
const Admin = () => {
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
      <motion.div
        style={{ backgroundColor: "whitesmoke",width:200, height:200, display:"flex", justifyContent: "center", alignItems: "center"}}
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ["0%", "0%", "50%", "50%", "0%"],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
      >
        Admin: {user?.result?.username}
      </motion.div>
    </div>
  );
};

export default Admin;
