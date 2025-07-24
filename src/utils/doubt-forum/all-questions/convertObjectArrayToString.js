export const convertObjectArrayToString = (array) => {
  let str = "[";
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    const id = item?.value;
    if (str.length > 1) {
      str = str.concat(",");
    }
    str = str.concat(`${id}`);
  }
  str = str.concat("]");

  return str;
};
