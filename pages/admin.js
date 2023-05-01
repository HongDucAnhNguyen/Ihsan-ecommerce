import { useSelector } from "react-redux";
import styles from "../styles/Layout.module.css";
import { useState, useEffect } from "react";
const Admin = () => {
  const userState = useSelector((state) => state.authReducer.authData);
  const [user, setUser] = useState(null);

  useEffect(() => {
    

    setUser(userState);
  }, [userState]);
  if (!user || user?.result?.id !== '6446ddb6685eec4e5df21f7b') {
    return <div className={styles.container}>Unauthorized</div>;
  }
  return (
    <div className={styles.container}>
      
    </div>
  );
};

export default Admin;
