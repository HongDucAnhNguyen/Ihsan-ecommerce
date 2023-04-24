import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Layout.module.css";
import { useEffect, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  CloseButton,
} from "@chakra-ui/react";
import deleteAccountAction from "@/actions/deleteAccountAction";
// import { Button, Heading } from "@chakra-ui/react";
// import { useRouter } from "next/router";
const Account = () => {
  const userState = useSelector((state) => state.authReducer.authData);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(userState);

    // const storedUser = localStorage.getItem("userProfile");
    // if (storedUser) {
    //   setUser(JSON.parse(storedUser));
    // } else {

    setUser(userState);
  }, [userState]);
  if (!user?.result) {
    return (
      <div className={styles.container}>
        {message ? (
          <Alert
            sx={{
              maxWidth: 400,
              display: "flex",
              justifyContent: "space-between",
            }}
            status="success"
          >
            <Box display="flex">
              <AlertIcon></AlertIcon>
              <AlertDescription>{message}</AlertDescription>
            </Box>
            <CloseButton
              onClick={() => {
                setMessage(null);
              }}
            ></CloseButton>
          </Alert>
        ) : (
          "Please Log In or Create an Account"
        )}
      </div>
    );
  }
  return (
    <div className={styles.container}>
      {/* <AuthForm></AuthForm> */}
      Account Management: {user.result?.username}
      <Button
        onClick={() => {
          dispatch(deleteAccountAction(user.result?.id, setMessage));
        }}
      >
        Delete Account
      </Button>
    </div>
  );
};

export default Account;
