const express = require("express");
const {
  assignTasks,
  getEmployeeOnboarding,
  completeTask,
  uploadDocument,
  getAllOnboardingRecords,
} = require("../controllers/onboardingController");
const { protect, authorize } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/assign", protect, authorize("admin"), assignTasks);
router.get("/", protect, authorize("employee"), getEmployeeOnboarding);
router.put("/complete", protect, authorize("employee"), completeTask);
router.post("/upload", protect, authorize("employee"), upload.single("document"), uploadDocument);
router.get("/all", protect, authorize("admin"), getAllOnboardingRecords);

module.exports = router;
