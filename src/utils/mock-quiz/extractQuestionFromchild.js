const extractQuestionFromchild = (data) => {
  const result = [];

  const recurse = (items) => {
    items?.forEach((item) => {
      if (item.Questions?.length) {
        recurse(item.Questions); // Only recurse, don't push parent
      } else {
        const { Questions, ...rest } = item;
        result.push(rest); // Push only leaf nodes
      }
    });
  };

  recurse(data);
  return result;
};

export default extractQuestionFromchild;
