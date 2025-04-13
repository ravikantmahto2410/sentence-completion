import React from 'react';

const Question = ({ question, selectedWords, onSelectWord, onUnselectWord }) => {
  if (!question || !question.question || !question.options) {
    return <div className="text-center text-gray-500">Loading question...</div>;
  }

  // Split the question string by the blanks (4 blanks = 3 "_____")
  const parts = question.question.split("_____________");

  return (
    <div className="flex flex-col justify-around">
      <h3 className="text-xl mt-2 text-[#616464] flex  justify-center font-semibold mb-4">Select the missing words in the correct order</h3>

        <div className="w-[811px] h-[166px] flex flex-col justify-around  gap-[18px]">
            <p className="text-2xl font-medium tracking-normal ">
                {parts.map((part, idx) => (
                <React.Fragment key={idx}>
                    <span>{part.trim()}</span>
                    {idx < question.correctAnswer.length && (
                    <span
                        onClick={() => onUnselectWord(idx)}
                        className=" border-b-2 bg-white px-3 mx-1 cursor-pointer rounded min-w-[60px] text-center"
                    >
                        {selectedWords[idx] || "_____________"}
                    </span>
                    )}
                </React.Fragment>
                ))}
            </p>
        </div>

        <div className="flex flex-row w-[377px] h-[38px] justify-around gap-1">
            {question.options
            .filter(option => !selectedWords.includes(option))
            .map((option, idx) => (
            <button
                key={idx}
                onClick={() => onSelectWord(option)}
                disabled={selectedWords.includes(option)}
                className={` rounded-lg text-16px/[22px] flex flex-row  text-base border border-[#BFC6C6] transition ${
                selectedWords.includes(option)
                    ? 'bg-[#FFFFFF] text-[#414343] cursor-not-allowed'
                    : 'bg-[#FFFFFF] text-[#414343] hover:bg-blue-200'
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
