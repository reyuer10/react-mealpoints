const express = require("express");
const router = express.Router();
const sheetsController = require("../controller/sheetsController");

router.get("/", sheetsController.readDepartmentSheets);
router.get("/add", sheetsController.addMealPoints);

module.exports = router;
