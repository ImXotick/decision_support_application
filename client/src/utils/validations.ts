export const validateAHPInput = (inputValue: string): boolean => {
  if (inputValue === "") {
    return true; // Empty string is allowed
  }

  // Check for whole numbers
  if (/^\d+$/.test(inputValue)) {
    return true;
  }

  // Check for fractions of the form 1/3, 2/5, etc.
  if (/^\d+\/\d+$/.test(inputValue)) {
    return true;
  }

  return false;
};

export default validateAHPInput;
