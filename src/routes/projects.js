const express = require("express");
const mongoose = require("mongoose");
const Project = require("../models/Project");

const router = express.Router();

// CREATE
router.post("/", async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    const populated = await project.populate("owner", "name email");
    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    next(error);
  }
});

// READ ALL
router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.find()
      .populate("owner", "name email")
      .sort({ createdAt: -1 });
    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    next(error);
  }
});

// READ ONE
router.get("/:id", async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("owner", "name email");
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
});

// UPDATE
router.put("/:id", async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("owner", "name email");

    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });

    // Remove tasks belonging to the deleted project.
    const Task = require("../models/Task");
    await Task.deleteMany({ project: project._id });

    res.json({ success: true, message: "Project and its tasks deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;