const express = require("express");

const {createAppointment,getAllAppoinments,getOneAppoinment,appointmentCheckin}=require('./Appointment.controllers');

const router = express.Router();

// router.get("/",getAllAssignments);
router.post("/send_appointment/:doctorId",createAppointment)
router.get("/",getAllAppoinments);
router.get("/:appointmentId",getOneAppoinment);
router.get("/:appointmentId/confirm",appointmentCheckin);
module.exports=router;