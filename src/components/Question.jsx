import React from 'react';

const Question = ({ question, selectedWords, onSelectWord, onUnselectWord }) => {
  if (!question || !question.question || !question.options) {
    return <div className="text-center text-gray-500">Loading question...</div>;
  }

  // Split the question string by the blanks (4 blanks = 3 "_____")
  const parts = question.question.split("_____________");

  return (
    <div className="flex flex-col justify-around">
      <h3 className="text-xl mt-4 text-[#616464] flex  justify-center font-semibold mb-4 md:text-2xl">Select the missing words in the correct order</h3>

        <div className="w-full h-[166px] flex flex-col justify-around gap-4 overflow-hidden md:w-[80%] md:max-w-[811px] md:h-[200px] lg:w-[811px] lg:h-[166px]">
            <p className="text-20px/[26px] text-left text-2xl font-medium tracking-normal  ">
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

        <div className="grid grid-cols-4 w-[377px] h-[38px] gap-[16px] mx-auto min-h-[38px] min-w-[377px]">
            {question.options
            .filter(option => !selectedWords.includes(option))
            .map((option, idx) => (
            <button
                key={idx}
                onClick={() => onSelectWord(option)}
                disabled={selectedWords.includes(option)}
                className={`flex items-center justify-center w-[95px] h-[38px] p-[8px_10px] rounded-[8px] border border-[#BFC6C6] bg-white text-base font-medium text-[#414343] leading-[22px] tracking-[-0.01em] truncate transition-all  duration-200${
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
