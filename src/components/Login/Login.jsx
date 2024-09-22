import React, { useState } from "react";
import "./Login.css";
import LoginAPI from "../../api/Auth/LoginAPI";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const LoginApi = () => {
    if (email === "" || password === "") {
      setError("Please fill in all fields");
    } else {
      const data = {
        email,
        password,
        role: "Admin",
      };
      LoginAPI(data, setError);
    }
  };
  return (
    <section className="login">
      <div className="login_container">
        <h3>Login</h3>
        <div className="login_form">
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error}
          <button onClick={LoginApi}>Login</button>
        </div>
      </div>
    </section>
  );
};

export default Login;
