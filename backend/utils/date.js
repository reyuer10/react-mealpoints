const validDateFrom = () => {
  let date = new Date();
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
};

const validDataTo = () => {
  let date = new Date();
  return new Date(date.getFullYear(), date.getMonth() + 2, 0);
};

module.exports = {
  validDataTo,
  validDateFrom,
};
