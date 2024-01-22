/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import "./leaderBoard.scss";
import Score from "../Score/Score";
import Board from "../Board/Board";

const Leaderboard = ({
  language,
  correctAns,
  handleReset,
  optionLanguage,
  setStartQuiz,
}) => {
  const [tabCount, setTabCount] = useState(0);
  const [score, setScore] = useState();
  const [userObj, setUserObj] = useState();
  const [board, setBoard] = useState();
  const [Selectlanguage, setSelectLanguage] = useState(language);

  //function to caluclate the scores for each language
  function calculateLanguageScore(user, language) {
    return user.progress.proficiencyLevels[language].score;
  }
  //to generate the users who are prefered languages are same
  function generateLeaderboard(language, users) {
    if (!users) {
      console.log("Users not loaded yet");
      return;
    }
    //filtering the user based on the language
    const filteredUsers = users.filter((user) =>
      user.languagePreferences.includes(language)
    );
    //fetching the user score
    const usersWithScores = filteredUsers.map((user) => ({
      username: user.username,
      languageScore: calculateLanguageScore(user, language),
    }));

    //sorting them according to the score
    const sortedUsers = usersWithScores.sort(
      (a, b) => b.languageScore - a.languageScore
    );
    //set the score in the usestate
    setBoard(sortedUsers);
  }

  //API to get all users to get the leaderboard
  async function getAllUsers() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/get-all-user`,
        {
          headers: { quiz: localStorage.getItem("token") },
        }
      );
      return response.data.data;
    } catch (error) {
      alert(error.response.data.message);
      return null;
    }
  }
  //get the login user to get the language and a score of the paticular user
  async function getUser() {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/user/get-user`, {
        headers: { quiz: localStorage.getItem("token") },
      })
      .then((res) => {
        //setting the user data
        setUserObj(res.data.data);
        //setting the score
        setScore(res.data.data.progress.proficiencyLevels[language].score);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
  //calling all the function synchronously
  useEffect(() => {
    async function fetchData() {
      const users = await getAllUsers();
      // only if we have the allUser data we can fetch the scoreBoard
      if (users) {
        generateLeaderboard(Selectlanguage, users);
      }
    }
    fetchData();
    getUser();
  }, [Selectlanguage]);

  return (
    <div className="leaderBoard">
      <div className="headerTab">
        <div
          onClick={() => setTabCount(0)}
          className={tabCount == 0 && "active"}
        >
          <p>Score</p>
        </div>

        <div
          onClick={() => setTabCount(2)}
          className={tabCount == 2 && "active"}
        >
          <p>LeaderBoard</p>
        </div>
      </div>
      {tabCount == 0 && (
        <>
          <Score
            correctAns={correctAns}
            score={score}
            handleReset={handleReset}
            Selectlanguage={Selectlanguage}
          />
        </>
      )}
      {tabCount == 2 && (
        <div>
          {userObj && board && (
            <Board
              board={board}
              Selectlanguage={Selectlanguage}
              setSelectLanguage={setSelectLanguage}
              score={score}
              handleReset={handleReset}
              optionLanguage={optionLanguage}
              setStartQuiz={setStartQuiz}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
