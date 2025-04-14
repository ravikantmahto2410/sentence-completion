import React, { useEffect, useState, useRef } from 'react';
import { fetchQuestions } from './dataservice';
import { useLocation, useNavigate } from 'react-router-dom';
import Question from './components/Question';
import Timer from './components/Timer';
import Feedback from './components/Feedback';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currIdx, setCurrIdx] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [results, setResults] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const isInitialMount = useRef(true); // Track initial mount

  // Fetch questions on initial load
  useEffect(() => {
    fetchQuestions()
      .then(data => {
        setQuestions(data);
      })
      .catch(err => console.error("Failed to fetch questions:", err));
  }, []);

  // Handle initial mount and redirect on reload
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false; // Mark as not initial after first run
      // Check if this is a reload (no sessionStorage from front page)
      const fromFrontPage = sessionStorage.getItem('fromFrontPage') === 'true';
      if (location.pathname === '/quiz' && !fromFrontPage) {
        // Reset state and redirect to front page on reload
        setCurrIdx(0);
        setSelectedWords([]);
        setTimeLeft(30);
        setResults([]);
        setShowFeedback(false);
        setScore(0);
        sessionStorage.removeItem('fromFrontPage'); // Clear the flag
        navigate('/', { replace: true }); // Redirect to front page
      } else if (fromFrontPage) {
        sessionStorage.removeItem('fromFrontPage'); // Clear after confirming
      }
    }
  }, [location, navigate]);

  const currentQuestion = questions[currIdx];

  const handleSelectWord = (word) => {
    const next = [...selectedWords];
    const firstEmpty = next.findIndex(w => !w);
    if (firstEmpty === -1) next.push(word);
    else next[firstEmpty] = word;
    setSelectedWords(next);
  };

  const handleUnselectWord = (index) => {
    const newWords = [...selectedWords];
    newWords[index] = null;
    setSelectedWords(newWords.filter(Boolean));
  };

  const handleNext = () => {
    if (!currentQuestion || !currentQuestion.correctAnswer) return;
    const isCorrect = JSON.stringify(selectedWords) === JSON.stringify(currentQuestion.correctAnswer);

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setResults([...results, { question: currentQuestion, userAnswer: selectedWords, isCorrect }]);
    if (currIdx + 1 < questions.length) {
      setCurrIdx(currIdx + 1);
      setSelectedWords([]);
      setTimeLeft(30);
    } else {
      setShowFeedback(true);
    }
  };

  const handleTimeEnd = () => handleNext();

  if (showFeedback) return <Feedback results={results} score={score} />;

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#F8F8F8] flex flex-col justify-center flex-wrap">
      <div className="w-[975px] h-[650px] mt-[112px] ml-[196px] bg-white rounded-[24px] p-[40px] shadow-lg">
        {currentQuestion ? (
          <>
            <div>
              <div className='flex flex-row justify-between'>
                <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} onTimeEnd={handleTimeEnd} />
                <button className="border-2 border-black rounded-md px-2 py-0.5">Quit</button>
              </div>
              <div className="flex gap-1 w-full max-w-md mx-auto mt-10">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`flex-1 h-2 rounded transition-all duration-300 ${
                      index <= currIdx ? 'bg-yellow-400' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
            <Question
              question={currentQuestion}
              selectedWords={selectedWords}
              onSelectWord={handleSelectWord}
              onUnselectWord={handleUnselectWord}
            />
            <div className="mt-6 text-right">
              <button
                disabled={
                  !currentQuestion.correctAnswer ||
                  selectedWords.filter(Boolean).length !== currentQuestion.correctAnswer.length
                }
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">Loading...</div>
        )}
      </div>
    </div>
  );
}

export default Quiz;