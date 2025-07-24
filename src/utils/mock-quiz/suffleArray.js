const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.8);
};

export default shuffleArray;
