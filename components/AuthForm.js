import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { useState } from "react";

const registerUser = async (formData) => {
  await fetch("/api/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};
const AuthForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  return (
    <div>
      <form
        onSubmit={() => {
          registerUser(formData);
          setFormData({ username: "", password: "" });
        }}
      >
        <FormLabel>Username</FormLabel>
        <Input
          required
          type="text"
          placeholder="username"
          value={formData.username}
          onChange={(e) => {
            setFormData({ ...formData, username: e.target.value });
          }}
        />
        <FormLabel>password</FormLabel>
        <Input
          required
          type="password"
          placeholder="password"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
        />
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default AuthForm;
