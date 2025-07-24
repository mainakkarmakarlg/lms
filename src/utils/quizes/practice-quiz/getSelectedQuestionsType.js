const getSelectedQuestionsTypes = (name, selectedQuestionsTypes) => {
  return (
    selectedQuestionsTypes?.find((item) => item?.name === name)?.value ?? false
  );
};

export default getSelectedQuestionsTypes;
