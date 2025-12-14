export const checkValidData = (email, password, fullName = null) => {
  if (fullName !== null) {
    const isValidFullName = /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})/.test(fullName);
    if (!isValidFullName) return "Name is invalid";
  }

  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  if (!isEmailValid) return "Email is invalid";

  const isPasswordValid =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$.!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  if (!isPasswordValid) return "Password is invalid";

  return null;
};
