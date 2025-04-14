
// src/dataservice.js
export const fetchQuestions = async () => {
  const response = await fetch('/github.json'); // Relative path to public folder
  if (!response.ok) throw new Error('Failed to load questions from static file');
  return response.json();
};