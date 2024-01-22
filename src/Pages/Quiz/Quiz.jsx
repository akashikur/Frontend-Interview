import { useEffect, useState } from "react";
import "./quiz.scss";
import axios from "axios";
import Start from "../../components/Start/Start";
import Questions from "../../components/Questions/Questions";
import Leaderboard from "../../components/LeaderBoard/Leaderboard";

const Quiz = () => {
  const [language, setLanguage] = useState();
  const [startQuiz, setStartQuiz] = useState(false);
  const [question, setQuestion] = useState();
  const [userData, setUserData] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAns, setCorrectAns] = useState(0);
  const [optionLanguage, setOptionLanguage] = useState();
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [count, setCount] = useState(0);

  //if the user not login we can get them to register
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
    }
  });

  //get the user when ever we login
  useEffect(() => {
    getUser();
  }, []);

  //API for get the one quiz randomly
  async function getQuiz() {
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/exercises/get-exercises/${language}`,
        {
          headers: { quiz: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        if (res.data.data[0]) {
          // setting the question
          setQuestion(res.data.data[0]);
          // after get the quiz make the button disable
          setButtonsDisabled(false);
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
  // API for get the user
  async function getUser() {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/user/get-user`, {
        headers: { quiz: localStorage.getItem("token") },
      })
      .then((res) => {
        // set the userData
        setUserData(res.data.data);
        // set the user prefered language for the language selection
        setOptionLanguage(res.data.data.languagePreferences);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
  // Api while submitting the ans
  async function submitAns(item, id) {
    const exerciseObj = {
      exerciseId: id,
      selectedOption: item,
    };
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/exercises/submit`,
        exerciseObj,
        {
          headers: { quiz: localStorage.getItem("token") },
        }
      )
      .then(async () => {
        // after the submit get the user Data to see the score and proficient
        getUser();
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }

  // function for the submit button
  function handleSubmit(item, id, correctAnswer) {
    // if the ans is correct to count the correct ans
    const isAnswerCorrect = item === correctAnswer;
    if (isAnswerCorrect) {
      setCorrectAns(correctAns + 1);
    }
    setIsCorrect(isAnswerCorrect);
    setSelectedOption(item);
    submitAns(item, id);
  }

  function handleQuiz() {
    // reset the quiz when you are in the home page reset
    //  the score and completed data quiz based on the language user select
    handleReset(language);
    getQuiz();
    getUser();
    setStartQuiz(true);
  }

  // reset function  to reset the score
  function handleReset(language) {
    const obj = {
      language,
    };
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/user/clear-user`, obj, {
        headers: { quiz: localStorage.getItem("token") },
      })
      .then(() => {
        setCorrectAns(0);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
  return (
    <>
      <div className="quiz">
        <div className="container">
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
              buttonsDisabled={buttonsDisabled}
              setButtonsDisabled={setButtonsDisabled}
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
        </div>
      </div>
    </>
  );
};

export default Quiz;
