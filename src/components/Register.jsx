import React, { useState } from "react";
import axios from "../axios/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState({});
  const [serverError, setServerError] = useState({});
  const error = {};
  const navigate = useNavigate();

  const validation = () => {
    if (username.trim().length == 0) {
      error.username = "user name is required";
    }
    if (email.trim().length == 0) {
      error.email = "email is required";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      error.email = "invalid email id";
    }

    if (password.trim().length == 0) {
      error.password = "password is required";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(
        password
      )
    ) {
      error.password =
        "password must contain  at least 8 characters and one uppercase,lowercase letter, digit and one special character";
    } else if (confirmPassword !== password) {
      error.password = "password not matching";
    }
    if (confirmPassword.trim().length == 0) {
      error.confirmPassword = "confirm password is required";
    } else if (confirmPassword !== password) {
      error.confirmPassword = "password not matching";
    }

    setFormError(error);
    console.log(error);
    return Object.keys(error).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationResult = validation();
    if (validationResult == 0) {
      setFormError({});

      const body = { username, password, email };
      try {
        const registerResponse = await axios.post("/api/users/register", body);
        console.log(registerResponse);
        navigate("/login");
      } catch (e) {
        console.log(e);
        setServerError(e);
      }
    }
  };
  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Enter the username:</label>
        <br />
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => {
            setusername(e.target.value);
          }}
        />
        <br />
        {formError.username && (
          <span style={{ color: "red" }}>{formError.username}</span>
        )}
        <br />
        <label htmlFor="email">Enter the email:</label>
        <br />
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        {formError.email && (
          <span style={{ color: "red" }}>{formError.email}</span>
        )}

        <br />
        <label htmlFor="password">password:</label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        {formError.password && (
          <span style={{ color: "red" }}>{formError.password}</span>
        )}

        <br />
        <label htmlFor="confirmPassword">confirm password:</label>
        <br />
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <br />
        {formError.confirmPassword && (
          <span style={{ color: "red" }}>{formError.confirmPassword}</span>
        )}

        <br />
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
};

export default Register;
