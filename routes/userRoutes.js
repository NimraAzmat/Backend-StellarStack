
const { userUpdate, getuserDetails } = require("../controllers/userController");
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.get('/me', protect, getuserDetails);
router.put('/update', protect, userUpdate);

module.exports = router; //export the router