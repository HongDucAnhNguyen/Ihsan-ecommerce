import {
  Button,
  Heading,
  Input,
  Alert,
  AlertIcon,
  CloseButton,
  Box,
  AlertDescription,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import styles from "../styles/AuthForm.module.css";
import useLogin from "@/hooks/useLogin";
import useRegister from "@/hooks/useRegister";
const AuthForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(
        localStorage.getItem("userProfile")
          ? JSON.parse(localStorage.getItem("userProfile"))
          : null
      );
    }
  }, []);
  if (user !== null) {
    return (
      <div className={styles.container}>
        <Heading>Welcome {user.result.username}</Heading>
        <Button
          onClick={() => {
            localStorage.clear();
            setUser(null);
          }}
        >
          LOG OUT
        </Button>
      </div>
    );
  }
  return (
    <div>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          if (isRegistering) {
            useRegister(formData, setUser, setErrorMessage);
          } else {
            useLogin(formData, setUser, setErrorMessage);
          }
          setFormData({ username: "", password: "" });
        }}
      >
        <Heading>{isRegistering ? "Register" : "Login"}</Heading>
        {errorMessage && (
          <Alert
            sx={{ display: "flex", justifyContent: "space-between" }}
            status="error"
          >
            <Box display="flex">
              <AlertIcon></AlertIcon>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Box>
            <CloseButton
              onClick={() => {
                setErrorMessage(null);
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
        <Button
          onClick={() => setIsRegistering(!isRegistering)}
          variant="ghost"
          colorScheme="blue"
        >
          {isRegistering ? "Have an account? Sign in" : "Not a user? Register"}
        </Button>
      </form>
    </div>
  );
};

export default AuthForm;
