const Job = require("../models/Job");

//Create a job (Recruiter only)
exports.createJob = async (req, res) => {
  try {
    // console.log("jobs posting:", req.user.role)
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Only recruiters can post jobs" });
    }
    // console.log("job body:", { ...req.body, recruiter: req.user.id })

    const job = new Job({ ...req.body, recruiter: req.user.id });
    await job.save();
    res.status(201).json({ message: "Job posted successfully", job });
  } catch (error) {
    res.status(500).json({ message: "Error creating job", error });
  }
};

//Get all jobs (Anyone) - Now with filtering
exports.getJobs = async (req, res) => {
  try {
    const { title, location, salaryMin, salaryMax, type } = req.query;

    let filter = {};

    if (title) filter.title = { $regex: title, $options: "i" };
    if (location) filter.location = { $regex: location, $options: "i" };
    if (type) filter.type = type;
    if (salaryMin || salaryMax) {
      filter.salary = {};
      if (salaryMin) filter.salary.$gte = parseInt(salaryMin);
      if (salaryMax) filter.salary.$lte = parseInt(salaryMax);
    }

    const jobs = await Job.find(filter).populate("recruiter", "name email");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
};

//Get a single job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("recruiter", "name email");
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job", error });
  }
};

//Update a job (Only Recruiter who created it)
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (req.user.id !== job.recruiter.toString()) {
      return res.status(403).json({ message: "Not authorized to update this job" });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    res.status(500).json({ message: "Error updating job", error });
  }
};

//Delete a job (Only Recruiter who created it)
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (req.user.id !== job.recruiter.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this job" });
    }

    await job.deleteOne();
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job", error });
  }
};

