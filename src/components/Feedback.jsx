import React from 'react';

const Feedback = ({ results,score }) => {
  return (
    <div className="p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-green-600">Quiz Completed!</h2>
        <p className="mt-2 text-lg">Your Score: {score} / {results.length}</p>
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
