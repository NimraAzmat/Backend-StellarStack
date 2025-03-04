const express = require("express");
const { checkIfApplied, applyForJob, getJobApplicants, updateApplicationStatus } = require("../controllers/applicationController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:id/apply", protect, authorize("employee"), applyForJob);
router.get("/:id/applicants", protect, authorize("recruiter"), getJobApplicants);
router.put("/:id/applicants/:applicantId", protect, authorize("recruiter"), updateApplicationStatus);
router.get("/:jobId/check/:userId", protect, authorize("employee"), checkIfApplied);
module.exports = router;
