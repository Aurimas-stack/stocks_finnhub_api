export const validateInput = (symbol) => {
  const validInputRegex = /^[a-zA-Z\s]*$/;
  if (symbol.length > 35) {
    return { valid: false, message: "You've reached 35 character limit!" };
  }
  if (!validInputRegex.test(symbol)) {
    return { valid: false, message: "Only letters and spaces are allowed!" };
  }
  return { valid: true, message: "" };
};
