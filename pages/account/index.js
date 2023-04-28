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
  Heading,
  Input,
} from "@chakra-ui/react";
import deleteAccountAction from "@/actions/auth/deleteAccountAction";
import updateAccountAction from "@/actions/auth/updateAccountAction";
// import { Button, Heading } from "@chakra-ui/react";
// import { useRouter } from "next/router";
const Account = () => {
  const userState = useSelector((state) => state.authReducer.authData);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(userState);

    // const storedUser = localStorage.getItem("userProfile");
    // if (storedUser) {
    //   setUser(JSON.parse(storedUser));
    // } else {

    setUser(userState);
  }, [userState]);

  return (
    <div className={styles.container}>
      {/* <AuthForm></AuthForm> */}
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
        <div>
          {user ? (
            <>
              <Heading>Account Management</Heading>
              <br />
              <Heading size="lg">Profile</Heading>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch(
                    updateAccountAction(formData, user.result.id, setMessage)
                  );
                  setFormData({ username: "", password: "" });
                }}
              >
                <Input
                  required
                  type="text"
                  placeholder="Username*"
                  value={formData.username}
                  onChange={(e) => {
                    setFormData({ ...formData, username: e.target.value });
                  }}
                />
                {/* <Input
                  required
                  type="password"
                  placeholder="Password*"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                /> */}
                <Input
                  required
                  type="password"
                  placeholder="New Password*"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                />
                <Button type="submit">Update Account</Button>
              </form>

              <Button
                onClick={() => {
                  dispatch(deleteAccountAction(user.result.id, setMessage));
                }}
              >
                Delete Account
              </Button>
            </>
          ) : (
            <Heading>Please Log In or Register Account</Heading>
          )}
        </div>
      )}
    </div>
  );
};

export default Account;
