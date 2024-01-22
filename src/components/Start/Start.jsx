/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import "./start.scss";
const Start = ({ language, setLanguage, optionLanguage, handleQuiz }) => {
  return (
    <div className="start">
      <h1>Select the language</h1>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option>Select a language</option>
        {optionLanguage.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      {language && <button onClick={handleQuiz}>Click to Start</button>}
    </div>
  );
};

export default Start;
