const express = require("express");
const { updateApplicationStatus } = require("../controllers/applicationController"); //   Import function
const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, authorize("recruiter"), createJob);
router.get("/", getJobs);
router.get("/:id", getJobById);
router.put("/:id", protect, authorize("recruiter"), updateJob);
router.delete("/:id", protect, authorize("recruiter"), deleteJob);
router.put("/:id/applicants/:applicantId", protect, authorize("recruiter"), updateApplicationStatus);

module.exports = router;
