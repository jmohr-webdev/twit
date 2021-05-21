export const twitsToArr = (obj) => {
  let arr = [];
  for (const twit in obj) {
    arr.push(twit);
  }

  console.log('from utility: ' + arr);
  console.log(typeof arr);
  return arr;
};
