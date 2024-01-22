import { useState } from "react";
import "./createexercise.scss";
import axios from "axios";

const CreateEx = () => {
  const [exerciseData, setExerciseData] = useState({
    language: "",
    difficulty: 1,
    question: "",
    options: ["", "", "", ""],
    correctOption: "",
  });
  //only this option language question can be choosen
  const optionLanguages = ["english", "spanish", "french", "japanese"];
  //handle the changes that was made in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExerciseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...exerciseData.options];
    newOptions[index] = value;
    setExerciseData((prevData) => ({
      ...prevData,
      options: newOptions,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/exercises/create-exercises`,
        exerciseData
      )
      .then((res) => {
        alert(res.data.message);
        setExerciseData({
          language: "",
          difficulty: 1,
          question: "",
          options: ["", "", "", ""],
          correctOption: "",
        });
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <div className="exercise ">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Language</label>
          <select
            value={exerciseData.language}
            name="language"
            onChange={handleChange}
          >
            <option>Select a language</option>
            {optionLanguages.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Difficulty (1-5):</label>
          <input
            type="number"
            id="difficulty"
            name="difficulty"
            value={exerciseData.difficulty}
            onChange={handleChange}
            required
            min="1"
            max="5"
          />
        </div>
        <div>
          <label>Question:</label>
          <textarea
            id="question"
            name="question"
            value={exerciseData.question}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <div>
            {exerciseData.options.map((option, index) => (
              <div key={index}>
                <label>{`Option ${index + 1}`}</label>
                <input
                  type="text"
                  name="options"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <label>Correct Option:</label>
          <input
            type="text"
            id="correctOption"
            name="correctOption"
            value={exerciseData.correctOption}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreateEx;
