
export const fetchQuestions = async () => {
  const res = await fetch('http://localhost:3000/questions');  // 👈 This should be the correct URL
  if (!res.ok) throw new Error("Network response was not ok");
  const data = await res.json();
  return data;  // returns array, not { questions: [...] }
};
