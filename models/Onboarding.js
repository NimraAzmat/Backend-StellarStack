const mongoose = require("mongoose");

const OnboardingSchema = new mongoose.Schema(
  {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tasks: [
      {
        title: { type: String, required: true },
        description: { type: String },
        completed: { type: Boolean, default: false },
        document: { type: String },
      }
    ],
    status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Onboarding", OnboardingSchema);
