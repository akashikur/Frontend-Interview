/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Question.scss";
const Questions = ({
  question,
  userData,
  language,
  handleSubmit,
  selectedOption,
  isCorrect,
  count,
  setCount,
  getQuiz,
}) => {
  // to make the next Button display one when the ans clicked
  const [nextBtn, setNextBtn] = useState(false);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  const handleButtonClick = (item, id, correctOption) => {
    setNextBtn(true);
    setButtonsDisabled(true); // Disable all buttons
    handleSubmit(item, id, correctOption);
  };

  const handleNextButtonClick = async () => {
    await getQuiz();
    setButtonsDisabled(false);
    setNextBtn(false);
    setCount(count + 1);
  };

  return (
    <div className="wrapper">
      <div className="header">
        <p className="lang">language:{question.language}</p>
        <div className="right">
          <p>{count}/10</p>
          <p>points:{question.difficulty}</p>
          <p>
            Proficiency Level:
            {userData.progress.proficiencyLevels[language].level}
          </p>
          <p>score:{userData.progress.proficiencyLevels[language].score}</p>
        </div>
      </div>
      <div className="question">
        <p>{question.question}</p>
        <div className="ans">
          {question.options.map((item, index) => (
            <button
              key={index}
              onClick={() =>
                handleButtonClick(item, question._id, question.correctOption)
              }
              style={{
                backgroundColor:
                  selectedOption === item //if the ans is correct the color change to green
                    ? isCorrect
                      ? "green"
                      : "red" //if the ans is wrong it change to red
                    : "initial",
              }}
              disabled={buttonsDisabled}
            >
              {item}
            </button>
          ))}
        </div>
        {nextBtn && (
          <button className="nextBtn" onClick={handleNextButtonClick}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Questions;
