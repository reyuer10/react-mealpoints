const { google } = require("googleapis");

const getDataSheets = async (value) => {
  // Create cleint instance for auth

  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.CREDENTIALS_FILE,
    scopes: process.env.KEY_SCOPE,
  });

  const spreadsheetId = process.env.SHEETS_ID;

  const client = await auth.getClient();

  // Instance of Googel Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  // Get metadata about spreadsheet
  const metadata = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  const sheets = metadata.data.sheets;
  //   const sheetsTitle = sheets.map((sheets) => sheets.properties.title);

  const getDepartmentSheetsOf = (department_type) => {
    const sheetsTitle = sheets.find(
      (sheets) => sheets.properties.title == department_type
    );
    return sheetsTitle ? sheetsTitle.properties.title : null;
  };

  try {
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: getDepartmentSheetsOf(value),
    });

    const sheetsValue = getRows.data.values;

    // "No."
    // "Employee ID"
    // "Department"
    // "Amount (150 per meal)"

    const headerRow = sheetsValue.find((sheets) =>
      sheets.includes("Last Name, First Name")
    );
    const headerRowIndex = sheetsValue.indexOf(headerRow);
    const dataRows = sheetsValue.slice(headerRowIndex + 1);

    const employeeValues = dataRows.map((row) => {
      const obj = {};

      headerRow.forEach((key, index) => {
        obj[key] = row[index] || "";
      });

      return obj;
    });
    const empJsonFormat = employeeValues.map((emp) => ({
      employee_id: emp["Employee ID"],
      employee_name: emp["Last Name, First Name"],
      meal_points: emp["Amount (150 per meal)"],
    }));

    return empJsonFormat;
  } catch (error) {
    throw error;
  }
};

module.exports = getDataSheets;
