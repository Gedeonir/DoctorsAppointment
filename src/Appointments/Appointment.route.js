const express = require("express");

const {createAppointment,getAllAppoinments,getOneAppoinment,sendSMS}=require('./Appointment.controllers');

const router = express.Router();

// router.get("/",getAllAssignments);
router.post("/send_appointment/:doctorId",createAppointment)
router.get("/",getAllAppoinments);
router.get("/:appointmentId",getOneAppoinment);
router.get("/sendSms/1",sendSMS);
module.exports=router;