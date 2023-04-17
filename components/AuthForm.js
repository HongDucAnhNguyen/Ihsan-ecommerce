import { Button, ButtonGroup, Heading, Input } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import styles from "../styles/AuthForm.module.css";
import useLogin from "@/hooks/useLogin";
import useRegister from "@/hooks/useRegister";
// import { useRouter } from "next/router";

const AuthForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(
        localStorage.getItem("userProfile")
          ? JSON.parse(localStorage.getItem("userProfile"))
          : null
      );
      if (user !== null) {
        setIsAuthenticated(true);
      }
    }
  }, []);
  if (isAuthenticated) {
    return (
      <div className={styles.container}>
        <Heading>
          Welcome {user.result.username}-{user.result.id}{" "}
        </Heading>
        <Button
          onClick={() => {
            localStorage.clear();
            setUser(null);
            setIsAuthenticated(false);
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
            useRegister(formData, setUser, setIsAuthenticated);
          } else {
            useLogin(formData, setUser, setIsAuthenticated);
          }
          

          setFormData({ username: "", password: "" });
        }}
      >
        <Heading>{isRegistering ? "Register" : "Login"}</Heading>
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
        <ButtonGroup spacing={2}>
          <Button variant="solid" colorScheme="blue" type="submit">
            {isRegistering ? "Register" : "Login"}
          </Button>
          <Button
            onClick={() => setIsRegistering(!isRegistering)}
            variant="ghost"
            colorScheme="blue"
          >
            {isRegistering
              ? "Have an account? Sign in"
              : "Not a user? Register"}
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
};

export default AuthForm;
