import React,{useState} from "react";
import axios from "../axios/axios";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState({});
  const [serverError, setServerError] = useState({});
  const error = {};
  const navigate = useNavigate();

  const validation = () => {
    if (email.trim().length == 0) {
      error.email = "email is required";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      error.email = "invalid email id";
    }

    if (password.trim().length == 0) {
      error.password = "password is required";
    }

    setFormError(error);
    return Object.keys(error).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationResult = validation();
    if (validationResult == 0) {
      setFormError({});

      const body = { password, email };
      try {
        const loginResponse = await axios.post("/api/users/login", body);
        console.log(loginResponse);
        navigate("/dashboard");
      } catch (e) {
        console.log(e);
        setServerError(e);
      }
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <input type="submit" value="Log in" />
      </form>
    </div>
  );
};

export default Login;
