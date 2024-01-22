import axios from "axios";
import { useState } from "react";
import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //to login and generate the token
  function handleSubmit(e) {
    e.preventDefault();

    const userObj = {
      email,
      password,
    };
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, userObj)
      .then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("token", res.data.data);
          window.location.href = "/profile";
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
