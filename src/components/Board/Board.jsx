/* eslint-disable react/prop-types */
import "./board.scss";
const Board = ({
  board,
  Selectlanguage,
  score,
  setSelectLanguage,
  optionLanguage,
}) => {
  return (
    <div className="board">
      <h1>Leader Board Top score in {Selectlanguage}</h1>
      <label>Language</label>
      <select
        value={Selectlanguage}
        onChange={(e) => setSelectLanguage(e.target.value)}
      >
        {optionLanguage.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <div className="score">
        <ul>
          {board.map((item, index) => (
            <li key={index}>
              <p>{index + 1}</p>
              <p>{item.username}</p>
              <p>{item.languageScore}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        Your score in {Selectlanguage} : {score}
      </div>
      <button
        onClick={() => {
          window.location.reload();
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default Board;
