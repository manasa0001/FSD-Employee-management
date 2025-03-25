const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// Get all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error.message);
    res.status(500).json({ error: "Server error while fetching employees" });
  }
});

// Add a new employee
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, designation, salary } = req.body;

    // Input validation (ensure required fields are present)
    if (!name || !email || !phone || !designation || !salary) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newEmployee = new Employee({ name, email, phone, designation, salary });
    await newEmployee.save();

    res.status(201).json(newEmployee);
  } catch (error) {
    console.error("Error adding employee:", error.message);
    res.status(500).json({ error: "Failed to add employee" });
  }
});

// Update an existing employee
router.put("/:id", async (req, res) => {
  try {
    const { name, email, phone, designation, salary } = req.body;

    // Validate that all fields are provided
    if (!name || !email || !phone || !designation || !salary) {
      return res.status(400).json({ error: "All fields are required for update" });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, designation, salary },
      { new: true, runValidators: true } // Returns the updated employee
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error.message);
    res.status(500).json({ error: "Failed to update employee" });
  }
});

// Delete an employee
router.delete("/:id", async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);

    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error.message);
    res.status(500).json({ error: "Failed to delete employee" });
  }
});

module.exports = router;
