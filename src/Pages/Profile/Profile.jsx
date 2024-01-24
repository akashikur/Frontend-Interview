import { useEffect, useState } from "react";
import "./profile.scss";
import Loader from "../../components/Loader/Loader";
import { getUserData } from "../../utility/getUserData";
import { resetApi } from "../../utility/resetApi";
import { addLanguageApi } from "../../utility/addLanguageApi";

const Profile = () => {
  const [userObj, setUserObj] = useState();
  const [addLanguage, setAddLanguage] = useState(false);
  const [language, setLanguage] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const optionLanguages = ["english", "spanish", "french", "japanese"];

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
    }
  });

  // when we are in the profile page we get the userData who logged in
  useEffect(() => {
    fetchUserData();
  }, []);
  // API to fetch the user data
  const fetchUserData = async () => {
    setIsLoad(true);
    try {
      const { userData, languagePreferences } = await getUserData();
      if (userData && languagePreferences) {
        setUserObj(userData);
        setLanguage(languagePreferences);
        setIsLoad(false);
      }
    } catch (error) {
      alert(error);
    }
  };

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
  async function handleAddLanguage() {
    const lang = {
      languagePreferences: language,
    };
    try {
      const addlang = await addLanguageApi(lang);
      fetchUserData();
      if (addlang) {
        setAddLanguage(false);
      }
    } catch (error) {
      alert(error);
    }
  }
  // API to reset the scores
  async function handleReset(language) {
    try {
      const rest = await resetApi(language);
      if (rest) {
        fetchUserData();
      }
    } catch (error) {
      alert(error);
    }
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
