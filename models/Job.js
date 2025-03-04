const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: Number },
    type: { type: String, enum: ["full-time", "part-time", "contract"], required: true },
    recruiter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    applicants: [
      {
        applicantId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
      },
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
