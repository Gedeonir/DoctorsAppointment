const {Appointment}=require('../../models/appointments');
const {Doctor}=require('../../models/doctors')

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

        const saveAppoinment=await Appointment.create({
            firstName,
            lastName,
            email,
            phone,
            doctorId:doctor._id,
            doctorName:doctor.title + doctor.firstName + doctor.lastName,
            department:doctor.departmentName,
            sessionDate,
            sessionTime,
            createdAt:Date.now()
        })

        return res.status(200).json({
            message:"Appointment sent succesfully",
            data:{
                saveAppoinment
            }
        })


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


module.exports={
    createAppointment,
    getAllAppoinments,
    getOneAppoinment
}