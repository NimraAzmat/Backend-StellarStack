const Job = require("../models/Job");
const User = require("../models/User");
const Application = require("../models/Application");
const mongoose = require("mongoose");
//Accept or Reject a Job Application
// Update application status (Recruiter only)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id, applicantId } = req.params; // Get job ID and applicant ID from URL
    const { status } = req.body; // Get new status from request body
    console.log(id, applicantId, status)

    // Ensure only the recruiter who posted the job can update applications
    const job = await Job.findById(id);
    console.log("job:", job)
    if (!job) return res.status(404).json({ message: "Job not found" });
    if (req.user.id !== job.recruiter.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    console.log(job.applicants);
    const applicantIndex = job.applicants.findIndex(applicant => applicant._id.toString() === applicantId);
    console.log("applicantIndex:", applicantIndex)
    if (applicantIndex === -1) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    console.log(status);
    job.applicants[applicantIndex].status = status;
    await job.save();

    res.json({ message: `Application ${status} successfully!`, job });
  } catch (error) {
    res.status(500).json({ message: "Error updating application status", error });
  }
};
// exports.updateApplicationStatus = async (req, res) => {
//   try {
//     const { status } = req.body; // accepted or rejected
//     console.log(status)
//     const job = await Job.findById(req.params.id);
//     console.log("app status:", job, req.params.id)
//     if (!job) return res.status(404).json({ message: "Job not found" });

//     // Ensure only the recruiter who posted the job can update applications
//     if (req.user.id !== job.recruiter.toString()) {
//       return res.status(403).json({ message: "Not authorized" });
//     }

//     // Check if the applicant exists in the job
//     const applicantIndex = job.applicants.findIndex(applicant => applicant.toString() === req.params.applicantId);
//     if (applicantIndex === -1) {
//       return res.status(404).json({ message: "Applicant not found" });
//     }

//     // Store application status in an object
//     job.applicants = job.applicants || {};
//     job.applicants[req.params.applicantId] = status;

//     await job.save();
//     res.json({ message: `Application ${status} successfully!`, job });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating application status", error });
//   }
// };
//Apply for a job (Only Employees)
exports.applyForJob = async (req, res) => {
  try {
    if (req.user.role !== "employee") {
      return res.status(403).json({ message: "Only employees can apply for jobs" });
    }

    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.applicants.includes(req.user.id)) {
      return res.status(400).json({ message: "Already applied for this job" });
    }

    job.applicants.push(req.user.id);
    await job.save();
    const application = new Application({
      jobId: job._id,
      userId: req.user.id,
      status: "true"
    });

    await application.save();

    res.json({ message: "Application submitted successfully", job });
  } catch (error) {
    res.status(500).json({ message: "Error applying for job", error });
  }
};

//Get applicants for a job (Only Recruiter)
exports.getJobApplicants = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // console.log("Job Object:", job);
    // console.log("Raw Applicants List:", job.applicants);

    //Extract only the _id values
    const applicantIds = job.applicants.map(applicant => applicant._id);
    // console.log("Extracted Applicant IDs:", applicantIds);

    //Fetch user details using these IDs
    const users = await User.find({ _id: { $in: applicantIds } }).select("name email");
    // console.log("Fetched Users:", users);

    //Convert users array to an object for quick lookup
    const userMap = {};
    users.forEach(user => {
      userMap[user._id.toString()] = { name: user.name, email: user.email };
    });
    // console.log("User Map:", userMap);

    //Merge applicants with user data
    const applicants = job.applicants.map(applicant => {
      const userData = userMap[applicant._id.toString()] || { name: "Unknown", email: "Unknown" };
      return {
        _id: applicant._id,
        name: userData.name,
        email: userData.email,
        status: applicant.status,
      };
    });

    // console.log("Final Applicants List:", applicants);
    res.json(applicants);
  } catch (error) {
    console.error("Error fetching applicants:", error);
    res.status(500).json({ message: "Error fetching applicants", error });
  }
};

exports.checkIfApplied = async (req, res) => {
  try {
    const jobId = new mongoose.Types.ObjectId(req.params.jobId);
    const userId = new mongoose.Types.ObjectId(req.params.userId);
    console.log("check IfApplied function called", jobId, userId);

    const application = await Application.findOne({ jobId, userId });
    console.log("applied status", application)

    if (application) {
      if (application.status) {
        res.json({ applied: true });
      } else {
        res.json({ applied: false });
      }
    } else {
      res.json({ applied: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to check application status' });
  }
}