import { useEffect, useState } from "react";
import "./quiz.scss";
import Start from "../../components/Start/Start";
import Questions from "../../components/Questions/Questions";
import Leaderboard from "../../components/LeaderBoard/Leaderboard";
import { getQuizData } from "../../utility/getQuizData";
import { getUserData } from "../../utility/getUserData";
import { submitAns } from "../../utility/submitAns";
import { resetApi } from "../../utility/resetApi";
import Loader from "../../components/Loader/Loader";

const Quiz = () => {
  const [language, setLanguage] = useState();
  const [startQuiz, setStartQuiz] = useState(false);
  const [question, setQuestion] = useState();
  const [userData, setUserData] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAns, setCorrectAns] = useState(0);
  const [optionLanguage, setOptionLanguage] = useState();
  const [count, setCount] = useState(0);
  const [isLoader, setIsLoader] = useState(false);

  //if the user not login we can get them to register
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
    }
  });
  //get the user when ever we login
  useEffect(() => {
    const fetchData = async () => {
      await getUser();
    };
    fetchData();
  }, []);

  //API for get the one quiz randomly
  async function getQuiz() {
    try {
      const quizData = await getQuizData(language); //random quiz api

      if (quizData) {
        setQuestion(quizData);
      }
    } catch (error) {
      alert(error);
    }
  }

  // API for get the user
  async function getUser() {
    try {
      const { userData, languagePreferences } = await getUserData(); //get user Api

      if (userData) {
        setUserData(userData);
        setOptionLanguage(languagePreferences);
      }
    } catch (error) {
      alert(error);
    }
  }

  // Api while submitting the ans
  async function submit(item, id) {
    const exerciseObj = {
      exerciseId: id,
      selectedOption: item,
    };

    try {
      const submissionResult = await submitAns(exerciseObj); //submit api
      if (submissionResult) {
        await getUser();
      }
    } catch (error) {
      alert(error);
    }
  }

  async function handleSubmit(item, id, correctAnswer) {
    const isAnswerCorrect = item === correctAnswer;
    if (isAnswerCorrect) {
      setCorrectAns((prevCorrectAns) => prevCorrectAns + 1);
    }
    setIsCorrect(isAnswerCorrect);
    setSelectedOption(item);
    await submit(item, id);
  }

  async function handleQuiz() {
    // reset the quiz when you are in the home page reset
    //  the score and completed data quiz based on the language user select
    handleReset(language);
    setIsLoader(true);
    await getQuiz(); //get quiz
    await getUser(); //get user
    setStartQuiz(true);
    setIsLoader(false);
  }

  // reset function  to reset the score
  function handleReset(language) {
    resetApi(language);
    setCorrectAns(0);
  }

  return (
    <>
      <div className="quiz">
        <div className="container">
          {isLoader ? (
            <Loader />
          ) : (
            <>
              {/* home component for the quiz page  */}
              {!startQuiz && optionLanguage && (
                <Start
                  setLanguage={setLanguage}
                  language={language}
                  handleQuiz={handleQuiz}
                  optionLanguage={optionLanguage}
                  handleReset={handleReset}
                />
              )}
              {/* after selecting the component the Question component will render the quiz */}
              {startQuiz && question && count <= 10 && (
                <Questions
                  question={question}
                  userData={userData}
                  language={language}
                  handleSubmit={handleSubmit}
                  selectedOption={selectedOption}
                  isCorrect={isCorrect}
                  count={count}
                  getQuiz={getQuiz}
                  setCount={setCount}
                />
              )}
              {/* after we complete the 10 questions we can moke to the Leader board  */}
              {startQuiz && count > 10 && (
                <Leaderboard
                  language={language}
                  correctAns={correctAns}
                  optionLanguage={optionLanguage}
                  handleReset={handleReset}
                  setStartQuiz={setStartQuiz}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Quiz;
