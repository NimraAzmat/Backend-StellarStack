const mongoose = require("mongoose");

// application schema
const applicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
    status: { type: Boolean, default: false },
});
module.exports = mongoose.model("Application", applicationSchema);
