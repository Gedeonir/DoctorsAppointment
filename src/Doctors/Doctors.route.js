const express = require("express");
const router = express.Router();


const {
  registerDoctor,
  getAllDoctors,
  getOneDoctor,
  deleteDoctor,
  updateDoctor,
} = require("./Doctors.controllers");
     
// Register a new doctor
router.post("/", registerDoctor);

// Get all doctors
router.get("/", getAllDoctors);

// Get a single doctor by id
router.get("/:docId", getOneDoctor);

// Delete a doctor by id
router.delete("/:docId", deleteDoctor);

// Update a doctor by id
router.put("/:docId", updateDoctor);

module.exports = router;


