import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Feedback = ({ results, score }) => {
  return (
    <div className="p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-green-600">Quiz Completed!</h2>
        <div className="w-32 h-32 mx-auto my-6 flex flex-col">
          <CircularProgressbar
            value={score}
            maxValue={results.length}
            text={` ${score} / ${results.length}`}
            styles={buildStyles({
              textColor: '#000',
              pathColor: '#facc15',
              trailColor: '#e5e7eb',
              textSize: '16px',
            })}
          />
        </div>
        <p className='m-px text-3xl font-medium p-3'>Your Score</p>
      </div>

      <h2 className="text-2xl font-bold mb-4">Your Results</h2>
      <ul className="space-y-4">
        {results.map((res, idx) => (
          <li key={idx} className={`p-4 rounded shadow ${res.isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
            <p><strong>Question {idx + 1}:</strong> {res.question.question}</p>
            <p><strong>Your Answer:</strong> {res.userAnswer.join(", ")}</p>
            <p><strong>Correct Answer:</strong> {res.question.correctAnswer.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feedback;