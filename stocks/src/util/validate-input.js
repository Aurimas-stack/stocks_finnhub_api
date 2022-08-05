export const validateInput = (symbol) => {
  const validInputRegex = /^[a-zA-Z\s]*$/;
  if (symbol.length > 35) {
    return { valid: false, message: "You've reached 35 character limit!" };
  }
  if (!validInputRegex.test(symbol)) {
    return {
      valid: false,
      message: "Only English alphabet letters and spaces are allowed!",
    };
  }
  if (symbol.trim().length === 0) {
    return { valid: false, message: "Can't submit an empty search phrase!" };
  }
  return { valid: true, message: "" };
};
