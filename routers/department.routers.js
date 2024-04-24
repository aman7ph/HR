const express = require("express");
const router = express.Router();

const {
  createDepartment,
  getAllDepartment,
  getADepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controller/department.controller");

router.route("/create").post(createDepartment);
router.route("/get-all").get(getAllDepartment);
router.route("/get").get(getADepartment);
router.route("/update/:id").put(updateDepartment);
router.route("/delete/:id").delete(deleteDepartment);

module.exports = router;
