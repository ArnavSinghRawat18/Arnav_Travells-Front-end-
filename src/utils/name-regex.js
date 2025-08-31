export const validateName = (name) => {
  // Allow letters, spaces, and common name characters, minimum 2 characters
  const regex = /^[a-zA-Z][a-zA-Z\s.'-]{1,49}$/;
  return regex.test(name) && name.trim().length >= 2;
};
