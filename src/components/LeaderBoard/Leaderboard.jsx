/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./leaderBoard.scss";
import Score from "../Score/Score";
import Board from "../Board/Board";
import { generateLeaderboard } from "../../utility/generateLeaderboard";
import { getUserData } from "../../utility/getUserData";
import { getAllUsers } from "../../utility/getAllUser";

const Leaderboard = ({ language, correctAns, optionLanguage }) => {
  const [tabCount, setTabCount] = useState(0);
  const [score, setScore] = useState();
  const [userObj, setUserObj] = useState();
  const [board, setBoard] = useState();
  const [Selectlanguage, setSelectLanguage] = useState(language);

  //get the login user to get the language and a score of the paticular user
  async function getUser() {
    try {
      const { userData, score } = await getUserData(Selectlanguage);
      if (userData) {
        setUserObj(userData);
        setScore(score);
      }
    } catch (error) {
      alert(error);
    }
  }

  //calling all the function synchronously
  useEffect(() => {
    async function fetchData() {
      const users = await getAllUsers();
      // only if we have the allUser data we can fetch the scoreBoard
      if (users) {
        const Leaderboard = generateLeaderboard(Selectlanguage, users);
        setBoard(Leaderboard);
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
          <Score correctAns={correctAns} score={score} />
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
              optionLanguage={optionLanguage}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
