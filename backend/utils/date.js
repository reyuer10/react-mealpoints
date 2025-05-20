export const validDateFrom = () => {
  let date = new Date();
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
};

export const validDataTo = () => {
  let date = new Date();
  return new Date(date.getFullYear(), date.getMonth() + 2, 0);
};
