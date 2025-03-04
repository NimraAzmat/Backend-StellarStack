const Onboarding = require("../models/Onboarding");
const User = require("../models/User");

//   Assign onboarding tasks (HR/Admin Only)
exports.assignTasks = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can assign onboarding tasks" });
    }

    const { employeeId, tasks } = req.body;

    const employee = await User.findById(employeeId);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    const onboarding = new Onboarding({ employee: employeeId, tasks });
    await onboarding.save();

    res.status(201).json({ message: "Onboarding tasks assigned", onboarding });
  } catch (error) {
    res.status(500).json({ message: "Error assigning tasks", error });
  }
};

//   Get onboarding tasks for an employee
exports.getEmployeeOnboarding = async (req, res) => {
  try {
    const onboarding = await Onboarding.findOne({ employee: req.user.id });
    if (!onboarding) return res.status(404).json({ message: "No onboarding tasks found" });

    res.json(onboarding);
  } catch (error) {
    res.status(500).json({ message: "Error fetching onboarding tasks", error });
  }
};

//   Mark task as completed
exports.completeTask = async (req, res) => {
  try {
    const { taskId } = req.body;
    const onboarding = await Onboarding.findOne({ employee: req.user.id });

    if (!onboarding) return res.status(404).json({ message: "No onboarding record found" });

    const task = onboarding.tasks.id(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.completed = true;
    await onboarding.save();

    res.json({ message: "Task marked as completed", onboarding });
  } catch (error) {
    res.status(500).json({ message: "Error completing task", error });
  }
};

//   Upload onboarding document
exports.uploadDocument = async (req, res) => {
  try {
    const { taskId } = req.body;
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const onboarding = await Onboarding.findOne({ employee: req.user.id });
    if (!onboarding) return res.status(404).json({ message: "No onboarding record found" });

    const task = onboarding.tasks.id(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.document = `/uploads/${req.file.filename}`;
    await onboarding.save();

    res.json({ message: "Document uploaded successfully", onboarding });
  } catch (error) {
    res.status(500).json({ message: "Error uploading document", error });
  }
};

//   Get all onboarding records (Admin Only)
exports.getAllOnboardingRecords = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can view onboarding records" });
    }

    const records = await Onboarding.find().populate("employee", "name email");
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching onboarding records", error });
  }
};
