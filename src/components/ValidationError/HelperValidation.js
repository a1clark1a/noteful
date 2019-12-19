export const validate = name => {
  const trimmedName = name.value.trim();
  if (trimmedName.length === 0) {
    return `${name.input} is required`;
  }
};
