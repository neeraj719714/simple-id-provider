// check if string is alphaNumeric
function isAlphaNumeric(char: string): boolean {
  return /^[a-z\d]+$/i.test(char);
}

export { isAlphaNumeric };
