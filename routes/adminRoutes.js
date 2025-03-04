const express = require("express");
const { getUsers, deleteUser, updateUser, getAllJobs, deleteJob, updateJob, getUserById, getJobById } = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

//   Admin Routes
router.get("/users", protect, authorize("admin"), getUsers);
router.put("/users/:id", protect, authorize("admin"), updateUser);
router.delete("/users/:id", protect, authorize("admin"), deleteUser);
router.get("/jobs", protect, authorize("admin"), getAllJobs);
router.put("/jobs/:id", protect, authorize("admin"), updateJob);
router.delete("/jobs/:id", protect, authorize("admin"), deleteJob);
router.get("/users/:id", protect, authorize("admin"), getUserById);
router.get("/jobs/:id", protect, authorize("admin"), getJobById);

module.exports = router;
