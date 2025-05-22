const databaseQuery = require("../config/databaseQuery");
const { validDateFrom, validDataTo } = require("../utils/date");
const getDataSheets = require("../utils/getDataSheets");

exports.readDepartmentSheets = async (req, res) => {
  //   const {
  //     body: { department_type },
  //   } = req;

  try {
    const employeeValues = await getDataSheets("TEST");
    return res.status(200).send(employeeValues);
  } catch (error) {
    if (error) {
      res.send({
        errorType: error.status,
        message: error.response.data,
      });
    } else if (error.status == 404) {
      res.send({
        errorType: error.status,
        message: `NO department was found`,
      });
    }
  }
}; 

exports.addMealPoints = async (req, res) => {
  const queryInsertMealPoints =
    "INSERT INTO tb_mealpoints(`employee_ID`, `employee_mealpoints`, `valid_from`, `valid_to`) VALUE( ?, ?, ?, ?)";

  try {
    const employeeHeadCounts = await getDataSheets("TEST");
    const filterNameIdEmployee = employeeHeadCounts.filter(
      (emp) => emp["employee_id"] && emp["meal_points"]
    );
    await Promise.all(
      filterNameIdEmployee.map((emp) => {
        const values = [
          emp["employee_id"],
          parseInt(emp["meal_points"]) || 0,
          validDateFrom(),
          validDataTo(),
        ];

        return databaseQuery(queryInsertMealPoints, values);
      })
    );
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error.",
      error: error,
    });
  }
};
