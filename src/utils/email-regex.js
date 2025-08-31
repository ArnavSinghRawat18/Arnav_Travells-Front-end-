export const validateEmail = (email) => {
  // More comprehensive email validation
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email) && email.length <= 254; // RFC 5321 limit
};
