/* eslint-disable no-undef */
import { useState } from "react";
import "./register.scss";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  function handleLanguage(e) {
    const selectedLanguage = e.target.value;
    setLanguage((prevLanguages) => [...prevLanguages, selectedLanguage]);
  }

  function handleDelete(index) {
    setLanguage((prevLanguages) => prevLanguages.filter((_, i) => i !== index));
  }

  const optionLanguages = ["english", "spanish", "french", "japanese"];

  function handleSubmit(e) {
    setIsLoad(true);
    e.preventDefault();
    const userObj = {
      username,
      email,
      password,
      language,
    };
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/user/register`, userObj)
      .then((res) => {
        if (res.data.status === 201) {
          window.location.href = "/login";
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
        setIsLoad(false);
        setEmail("");
        setUsername("");
        password("");
      });
  }

  return (
    <>
      {isLoad ? (
        <Loader />
      ) : (
        <div className="register">
          <form onSubmit={handleSubmit}>
            <label>UserName</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Language</label>
            <select value={language} onChange={handleLanguage}>
              <option>Select a language</option>
              {optionLanguages.map(
                (item, index) =>
                  !language.includes(item) && (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  )
              )}
            </select>
            <p>Selected Languages:</p>
            <div className="optionContainer">
              {language &&
                language.map((lang, index) => (
                  <div key={index} className="selectedOptions">
                    <p>{lang}</p>
                    <span
                      onClick={() => handleDelete(index)}
                      className="material-symbols-outlined"
                    >
                      close
                    </span>
                  </div>
                ))}
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
