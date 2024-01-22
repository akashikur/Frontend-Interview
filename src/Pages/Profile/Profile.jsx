import { useEffect, useState } from "react";
import "./profile.scss";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
// import Nav from "../../components/Navigater/Nav";

const Profile = () => {
  const [userObj, setUserObj] = useState();
  const [addLanguage, setAddLanguage] = useState(false);
  const [language, setLanguage] = useState([]);
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
    }
  });

  // when we are in the profile page we get the userData who login
  useEffect(() => {
    fetchUserData();
  }, []);
  // API to fetch the user data
  const fetchUserData = () => {
    setIsLoad(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/user/get-user`, {
        headers: { quiz: localStorage.getItem("token") },
      })
      .then((res) => {
        setUserObj(res.data.data);
        setLanguage(res.data.data.languagePreferences);
        setIsLoad(false);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const optionLanguages = ["english", "spanish", "french", "japanese"];

  // function to add a prefered language
  function handleLanguage(e) {
    const selectedLanguage = e.target.value;
    setLanguage((prevLanguages) => [...prevLanguages, selectedLanguage]);
  }
  // function to delet the selected language
  function handleDelete(index) {
    setLanguage((prevLanguages) => prevLanguages.filter((_, i) => i !== index));
  }

  // API to update the language
  function handleAddLanguage() {
    const blogObj = {
      languagePreferences: language,
    };
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/user/updateLanguage`, blogObj, {
        headers: { quiz: localStorage.getItem("token") },
      })
      .then(() => {
        fetchUserData();
        setAddLanguage(false);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
  // API to reset the scores
  function handleReset(language) {
    const obj = {
      language,
    };
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/user/clear-user`, obj, {
        headers: { quiz: localStorage.getItem("token") },
      })
      .then(() => {
        fetchUserData();
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }

  return (
    <>
      {isLoad ? (
        <Loader />
      ) : (
        <>
          {userObj && (
            <div className="profile">
              <div className="profile-header">
                <h1>Hi {userObj.username}</h1>
                <p>Email:{userObj.email}</p>
                <h2>Welcome to language quiz game</h2>
              </div>
              {addLanguage ? (
                <div className="edit-lang">
                  <div className="lang-input">
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
                    <button onClick={handleAddLanguage}>Save</button>
                  </div>
                  <div className="lang-div">
                    {language &&
                      language.map((lang, index) => (
                        <div key={index}>
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
                </div>
              ) : (
                <div className="pref-lang">
                  <h2>Your Prefered language:</h2>
                  <div className="lang-div">
                    {language.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                  <button onClick={() => setAddLanguage(true)}>Add More</button>
                </div>
              )}

              <div className="proficiency">
                <h1>Your Proficiency Level</h1>
                <div className="prof-lang">
                  {/* get the score based on the language that user prefered */}
                  {Object.entries(userObj.progress.proficiencyLevels).map(
                    ([language, proficiency]) => (
                      <div key={language} className="lang">
                        <p>{language}:</p>
                        <div className="score">
                          <p>Level: {proficiency.level}</p>
                          <p>Score: {proficiency.score}</p>

                          <button onClick={() => handleReset(language)}>
                            <span className="material-symbols-outlined">
                              restart_alt
                            </span>
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
