import React from 'react';
import { useNavigate } from 'react-router-dom';

const FrontPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    console.log("Back button clicked - no action defined yet");
  };

  const handleStart = () => {
    sessionStorage.setItem('fromFrontPage', 'true');
    navigate('/quiz', { state: { fromFrontPage: true } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="flex flex-col items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Sentence Construction</h1>
        <p className="text-gray-600 text-center max-w-xl">
          Select the correct words to complete the sentence by arranging the provided options in the right order.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-8 text-center mb-10">
        <div>
          <p className="text-sm text-gray-500">Time Per Question</p>
          <p className="text-lg font-semibold text-gray-800">30 sec</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Questions</p>
          <p className="text-lg font-semibold text-gray-800">10</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Coins</p>
          <p className="text-lg font-semibold text-yellow-400">0 🪙</p>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          className="border border-purple-500 text-purple-500 px-6 py-2 rounded-md hover:bg-purple-50"
          onClick={handleBack}
        >
          Back
        </button>
        <button
          className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 border-2 border-pink-500"
          onClick={handleStart}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default FrontPage;