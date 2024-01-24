/* eslint-disable react/prop-types */
import "./score.scss";
const Score = ({ correctAns, score }) => {
  // calculating the score and a total score and also the correct ans
  const circleWidth = 200;
  const percentage = correctAns;
  const radius = 85;
  const dashArray = radius * Math.PI * 2;
  const dashOffSet = dashArray - (dashArray * percentage) / 10;

  return (
    <div className="scoreBoard">
      <svg
        width={circleWidth}
        height={circleWidth}
        viewBox={`0 0 ${circleWidth} ${circleWidth}`}
      >
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="15px"
          r={radius}
          className="circleRadius"
        />
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="15px"
          r={radius}
          className="circleProgress"
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffSet,
          }}
          transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
        />
        <text
          x={circleWidth / 2}
          y={circleWidth / 2}
          fontSize="30"
          textAnchor="middle"
          dy="8"
          fill="#000000"
        >
          {correctAns}/10
        </text>
      </svg>
      <p>Score:{score}</p>
      {/* reset the game if you want to play again */}
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

export default Score;
