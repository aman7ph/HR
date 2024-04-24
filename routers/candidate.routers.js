const express = require("express");
const router = express.Router();

const {
  createCandidate,
  getAllCandidate,
  getACandidate,
  updateCandidate,
  deleteCandidate,
} = require("../controller/candidate.controller");

router.route("/create").post(createCandidate);
router.route("/get-all").get(getAllCandidate);
router.route("/get").get(getACandidate);
router.route("/update/:id").put(updateCandidate);
router.route("/delete/:id").delete(deleteCandidate);

module.exports = router;
