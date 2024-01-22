import axios from "axios";
import { useState } from "react";
import "./adminlogin.scss";
const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const userObj = {
      username,
      password,
    };
    // login as a admin
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/admin/login`, userObj)
      .then((res) => {
        if (res.data.status === 200) {
          // set the token as adminToken to know that admin is logged in
          localStorage.setItem("adminToken", res.data.data);
          window.location.href = "/create-exercise";
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
  return (
    <div className="login">
      <h1>Admin Login </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

export default AdminLogin;
