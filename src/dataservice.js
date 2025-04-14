
// src/dataservice.js
export const fetchQuestions = async () => {
  try {
    console.log('Attempting to fetch /github.json');
    const response = await fetch('/github.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    console.log('Fetch successful, data:', data);
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
    throw new Error('Failed to load questions from static file. Check console for details.');
  }
};