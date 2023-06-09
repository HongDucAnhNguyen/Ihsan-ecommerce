import {
  Button,
  Heading,
  Input,
  Alert,
  AlertIcon,
  CloseButton,
  Box,
  AlertDescription,
  Text,
  Flex,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import styles from "../../styles/AuthForm.module.css";
import {
  logoutAction,
  registerAction,
  loginAction,
} from "@/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { getItemsInCartAction } from "@/actions/cartActions";
const AuthForm = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.authReducer.authData);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);

  const [message, setMessage] = useState(null);
  useEffect(() => {
    // console.log(userState);
    // const storedUser = localStorage.getItem("userProfile");
    // if (storedUser) {
    //   setUser(JSON.parse(storedUser));
    // } else {}
    setUser(userState);
  }, [userState]);
  if (user !== null) {
    return (
      <Box p={5}>
        <Heading>Welcome {user?.result?.username}</Heading>
        <Button colorScheme="red" mt={3}
          onClick={() => {
            dispatch(logoutAction());
          }}
        >
          LOG OUT
        </Button>
      </Box>
    );
  }
  return (
    <div>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          if (isRegistering) {
            dispatch(registerAction(formData, setMessage));
          } else {
            dispatch(loginAction(formData, setMessage));
          }
          setFormData({ username: "", password: "" });
        }}
      >
        <Heading>{isRegistering ? "Register" : "Login"}</Heading>
        {message && (
          <Alert
            sx={{ display: "flex", justifyContent: "space-between" }}
            status="error"
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
        )}

        <Input
          required
          type="text"
          placeholder="Username*"
          value={formData.username}
          onChange={(e) => {
            setFormData({ ...formData, username: e.target.value });
          }}
        />
        <Input
          required
          type="password"
          placeholder="Password*"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
        />

        <Button variant="solid" colorScheme="blue" type="submit">
          {isRegistering ? "Register" : "Login"}
        </Button>
        <Text
          align="center"
          cursor="pointer"
          color="steelblue"
          _hover={{ textDecoration: "underline" }}
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? "Have an account? Sign in" : "Not a user? Register"}
        </Text>
        {!isRegistering && (
          <Flex gap={4} justifyContent="center">
            {" "}
            <Text
              cursor="pointer"
              color="darkred"
              _hover={{ textDecoration: "underline" }}
            >
              Forgot Password?
            </Text>
            <Text
              cursor="pointer"
              color="darkred"
              _hover={{ textDecoration: "underline" }}
            >
              Forgot username?
            </Text>
          </Flex>
        )}
      </form>
    </div>
  );
};

export default AuthForm;
