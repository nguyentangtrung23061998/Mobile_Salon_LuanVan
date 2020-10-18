export const inputHhmm = (value) => {
  const firstChar = value?.charAt(0);
  const secondChar = value?.charAt(1);
  const thirdChar = value?.charAt(3);
  const lastChar = value?.charAt(4);

  const firstNum = firstChar ? parseInt(firstChar) : null;
  const secondNum = secondChar ? parseInt(secondChar) : null;
  const thirdNum = thirdChar ? parseInt(thirdChar) : null;
  const lastNum = lastChar ? parseInt(lastChar) : null;

  if (firstNum && firstNum >= 3) {
    value = value.substr(1);
  }
  if (firstNum === 2 && secondNum > 4) {
    value = value.substr(0, 1);
  }
  if (thirdNum && thirdNum > 6) {
    value = value.substr(0, 3);
  }
  if (thirdNum == 6 && lastNum > 0) {
    value = value.substr(0, 4);
  }
  return value;
};
