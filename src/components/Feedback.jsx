import React from 'react';

const Feedback = ({ results }) => {
  const score = results.filter(r => r.isCorrect).length;

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Feedback</h2>
        <p className="mb-6">Your Score: <span className="font-bold">{score}/10</span></p>

        <div className="space-y-4">
          {results.map((res, idx) => (
            <div key={idx} className={`p-4 rounded border ${res.isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
              <p className="mb-2"><span className="font-medium">Q{idx + 1}:</span> {res.question.sentence.join(' ')}</p>
              <p className="text-sm text-gray-700">Your Answer: {res.userAnswer.join(' ')}</p>
              {!res.isCorrect && (
                <p className="text-sm text-red-700">Correct Answer: {res.question.answer.join(' ')}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Feedback;