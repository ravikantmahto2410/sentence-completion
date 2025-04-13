import React from 'react';

const Question = ({ question, selectedWords, onSelectWord, onUnselectWord }) => {
  if (!question || !question.question || !question.options) {
    return <div className="text-center text-gray-500">Loading question...</div>;
  }

  // Split the question string by the blanks (4 blanks = 3 "_____")
  const parts = question.question.split("_____________");

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-4">Select the missing words in the correct order</h3>

      <p className="text-xl font-medium mb-6 flex flex-wrap">
        {parts.map((part, idx) => (
          <React.Fragment key={idx}>
            <span>{part.trim()}</span>
            {idx < question.correctAnswer.length && (
              <span
                onClick={() => onUnselectWord(idx)}
                className="inline-block border-b-2 border-black px-3 mx-1 cursor-pointer bg-yellow-100 rounded min-w-[60px] text-center"
              >
                {selectedWords[idx] || "____"}
              </span>
            )}
          </React.Fragment>
        ))}
      </p>

      <div className="flex flex-wrap gap-3">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onSelectWord(option)}
            disabled={selectedWords.includes(option)}
            className={`px-4 py-2 rounded-lg font-medium border transition ${
              selectedWords.includes(option)
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
