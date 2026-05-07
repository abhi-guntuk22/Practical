const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/collegeDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  course: String,
  marks: Number
});

const Student = mongoose.model("Student", studentSchema);


// ================= CRUD APIs =================

// 1. CREATE (POST)
app.post("/students", async (req, res) => {
  try {
    const student = new Student(req.body);
    const result = await student.save();
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 2. READ (GET)
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// 3. UPDATE (PUT)
app.put("/students/:id", async (req, res) => {
  const updated = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// 4. DELETE (DELETE)
app.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});


// Server Start
app.listen(3000, () => {
  console.log("Server running on port 3000");
});