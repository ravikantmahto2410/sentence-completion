
export const fetchQuestions = async () => {
    const response = await fetch("http://localhost:3000/questions");
    const data = await response.json();
    return data;
  };
