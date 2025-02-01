const router = require("express").Router();

const Task = require("../models/taskshema");
const user = require("../models/userschema");
const { authi } = require("./auth");

router.post("/add", authi, async (req, res) => {
  try {
    const { title, description } = req.body;

    const { id } = req.headers;

    const task = new Task({
      title,
      description,
    });
    const result = await task.save();
    const rid = result._id;

    // Add the task's ID to the user's tasks array
    await user.findByIdAndUpdate(
      id,
      { $push: { tasks: rid._id } },
      { new: true }
    );

    res.json(result);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send({ error: "Failed to create task and update user" });
  }
});

router.get("/all-tasks", authi, async (req, res) => {
  try {
    const { id } = req.headers;

    const userdata = await user
      .findById(id)
      .populate({ path: "tasks", options: { sort: { createdAt: -1 } } });
    // const tasks = await Task.findById(userid.tasks);
    res.json({ data: userdata });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send({ error: "Failed to get all tasks" });
  }
});

router.delete("/delete/:taskId", authi, async (req, res) => {
  try {
    console.log("delete task");
    const { taskId } = req.params;
    const userid = req.headers.id;
    await Task.findByIdAndDelete(taskId);
    await user.findByIdAndUpdate(userid, { $pull: { tasks: taskId } });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send({ error: "Failed to delete task" });
  }
});

router.put("/update/:taskId", authi, async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description } = req.body;
    await Task.findByIdAndUpdate(taskId, {
      title: title,
      description: description,
    });
    res.json({ message: "Task updated successfully" });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send({ error: "Failed to update task" });
  }
});
router.put("/update-important/:taskId", authi, async (req, res) => {
  try {
    const { taskId } = req.params; // Extract taskId from URL params

    // Find the task by ID
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Toggle the 'important' property
    task.important = !task.important;

    // Save the updated task
    await task.save();

    res.json({ message: "Task importance updated successfully", task });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send({ error: "Failed to update task importance" });
  }
});

router.put("/update-complete/:taskId", authi, async (req, res) => {
  try {
    // Get the taskId from the route parameter
    const { taskId } = req.params;

    // Fetch the current task to get the existing 'completed' value
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Toggle the 'completed' value
    task.completed = !task.completed;

    // Save the updated task
    await task.save();

    res.json({ message: "Task status updated successfully", task });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send({ error: "Failed to update task status" });
  }
});

router.get("/important-tasks", authi, async (req, res) => {
  try {
    const { id } = req.headers;
    const userdata = await user
      .findById(id)
      .populate({ path: "tasks", match: { important: true } });
    res.json({ data: userdata });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send({ error: "Failed to get important tasks" });
  }
});

router.get("/completed-tasks", authi, async (req, res) => {
  try {
    const { id } = req.headers;
    const userdata = await user
      .findById(id)
      .populate({ path: "tasks", match: { completed: true } });
    res.json({ data: userdata });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send({ error: "Failed to get completed tasks" });
  }
});

router.get("/uncompleted-tasks", authi, async (req, res) => {
  try {
    const { id } = req.headers;
    const userdata = await user
      .findById(id)
      .populate({ path: "tasks", match: { completed: false } });
    res.json({ data: userdata });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send({ error: "Failed to get uncompleted tasks" });
  }
});

module.exports = router;
