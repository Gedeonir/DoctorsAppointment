const {Appointment}=require('../../models/appointments');
const {Doctor}=require('../../models/doctors')
const PassGenerator = require("generate-password");
const sendEmail = require("../utils/Email");
const emailValidator = require('deep-email-validator');


async function isEmailValid(email) {
    return emailValidator.validate(email)
  }


const createAppointment=async(req,res)=>{
    const doctorId=req.params.doctorId;
    const {
        lastName,
        firstName,
        email,
        phone,
        sessionDate,
        sessionTime,
    }=req.body;
    try {
        const doctor=await Doctor.findOne({_id:doctorId});

        const appoinment=await Appointment.findOne({sessionTime:sessionTime,sessionDate:sessionDate})

        const {valid, reason, validators} = await isEmailValid(email);

        if(!lastName ||!firstName||!email||!phone||!sessionDate||!sessionTime){
            return res.status(403).json({
                message:"All fields are required"
            })
        }

        if(!valid){
            return res.status(403).json({
                message:"please provide valid email"
            })
        }

        if(appoinment){
            return res.status(404).json({
                message:"Session time already taken"
            })
        }

        if (!doctor) {
            return res.status(404).json({
                message:"Doctor not found"
            });
        }

        const passCode = PassGenerator.generate({
            length: 5,
            numbers: true,
          });

        const saveAppoinment=await Appointment.create({
            document_id:passCode,
            firstName,
            lastName,
            email,
            phone,
            doctorId:doctor._id,
            doctorName:doctor.title + doctor.firstName + doctor.lastName,
            department:doctor.departmentName,
            sessionDate,
            sessionTime,
            status:"PENDING",
            createdAt:Date.now()
        })

        
        const message = `
        Your appoinment request received succesfully, Your document code is ${saveAppoinment.document_id}. Keep it safe as it will be used to search for your appoinment document.
        `;
        await sendEmail({
        email: saveAppoinment.email,
        subject: "Appointment feedbacks.",
        message,
        });
       
        return res.status(200).json({
            message:"Appointment sent succesfully",
            data:{
                saveAppoinment
            }
        });


    } catch (error) {
        return res.status(500).json({
            message:"Unable to send appointment",
            error:error
        })
    }
}

const getAllAppoinments=async(req,res)=>{
    try {
        const allApointments=await Appointment.find();

        return res.status(200).json({
            message:"All appointments",
            data:{
                allApointments
            }
        })
    } catch (error) {
        return res.status(500).json({
            message:"Unable to get appoinments",
            error:error
        })
    }
}

const getOneAppoinment=async(req,res)=>{
    const uuid=req.params.appointmentId
    try {
        const getOneAppoinment=await Appointment.findOne({_id:uuid});
        return res.status(200).json({
            message:"Appoinment succesfully fetched",
            data:{
                getOneAppoinment
            }
        })
    } catch (error) {
        return res.status(404).json({
            message:"Appoinment not found",
            error:error
        })
    }
}

const appointmentCheckin=async(req,res)=>{
    const appointment_id=req.params.ap_id
    try {
        const appointment=await Appointment.findOne({_id:appointment_id});
        if (appointment) {
            return res.status(404).json({
                message:"Appointment not found"
            })
        }

        appointment.status="Checked In"
        await appointment.save();
        return res.status(200).json({
            messsage:"Check in confirmed"
        })
    } catch (error) {
        return res.status(200).json({
            message:"Unable to check in appointment"
        })
    }
}


module.exports={
    createAppointment,
    getAllAppoinments,
    getOneAppoinment,
    appointmentCheckin
}