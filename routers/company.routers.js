const express = require("express");
const router = express.Router();

const {
  CreateCompany,
  getAllCompany,
  getACompany,
  updateCompany,
  deleteCompany,
} = require("../controller/company.controller.js");

router.route("/create").post(CreateCompany);
router.route("/get-all").get(getAllCompany);
router.route("/get").get(getACompany);
router.route("/update/:id").put(updateCompany);
router.route("/delete/:id").delete(deleteCompany);

module.exports = router;
