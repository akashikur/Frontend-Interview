import axios from "axios";
import { useState } from "react";
import "./login.scss";
import Loader from "../../components/Loader/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoad, setIsLoad] = useState(false);

  //to login and generate the token
  function handleSubmit(e) {
    setIsLoad(true);
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
        setIsLoad(false);
        setEmail("");
        setPassword("");
      });
  }

  return (
    <>
      {isLoad ? (
        <Loader />
      ) : (
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
      )}
    </>
  );
};

export default Login;
