export const dateToday = () => {
  return new Date().toISOString().slice(0, 10);
};
