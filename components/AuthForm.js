import { Button, ButtonGroup, Heading, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import styles from "../styles/AuthForm.module.css";
import useLogin from "@/hooks/useLogin";
import useRegister from "@/hooks/useRegister";

const AuthForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);
  return (
    <div className={styles.formContainer}>
      <form
        className={styles.form}
        onSubmit={() => {
          if (isRegistering) {
            useRegister(formData);
          } else {
            useLogin(formData);
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
