const {Appointments}=require('../../models/appointments.js');
const {Doctor}=require('../../models/doctors.js')


const registerDoctor = async (req, res) => {
  const {
    firstName,
    lastName,
    gender,
    email,
    telNumber,
    departmentId,
    departmentName,
    availableDays
  
  } = req.body;
  try {
    const doctor = await Doctor.findOne({ email: email });

    if (!firstName || !lastName || !gender || !email || !telNumber || !availableDays) {
      return res.status(403).json({
        message: "All fields are required",
      });
    }

    if (doctor) {
      return res.status(403).json({
        message: "Doctor Already exists",
      });
    }
    const newDoctor = await Doctor.create({
      firstName,
      lastName,
      gender,
      email,
      telNumber,
      departmentId,
      departmentName,
      availableDays
    });

    return res.status(200).json({
      message: "Doctor added successfully",
      data: {
        newDoctor,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to create doctor",
      error: error,
    });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("departmentId");

    return res.status(200).json({
      Count: doctors.length,
      data: {
        doctors,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to get doctors",
      error: error,
    });
  }
};

const getOneDoctor = async (req, res) => {
  const uuid = req.params.docId;

  try {
    const doctor = await Doctor.findOne({ _id: uuid }).populate("departmentId");

    return res.status(200).json({
      message: "Doctor fetched successfully",
      data: {
        doctor,
      },
    });
  } catch (error) {
    return res.status(404).json({
      message: "Doctor not found",
      error: error,
    });
  }
};

const deleteDoctor = async (req, res) => {
  const uuid = req.params.docId;
  try {
    const doctor = await Doctor.findByIdAndRemove({ _id: uuid });

    return res.status(200).json({
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to delete doctor",
      error: error,
    });
  }
};

const updateDoctor = async (req, res) => {
  const uuid = req.params.docId;
  const {
    firstName,
    lastName,
    gender,
    email,
    telNumber,
    departmentId,
    departmentName,
    availableDays
  } = req.body;

  try {
    const doctor = await Doctor.findOne({ _id: uuid });

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor does not exist",
      });
    }

    doctor.firstName = firstName;
    doctor.lastName = lastName;
    doctor.gender = gender;
    doctor.email = email;
    doctor.telNumber = telNumber;
    doctor.departmentId = departmentId;
    doctor.departmentName = departmentName;
    doctor.availableDays = availableDays;
    await doctor.save();

    return res.status(200).json({
      message: "Doctor updated successfully",
      data: {
        doctor,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to update doctor",
      error: error,
    });
  }
};

module.exports={
  registerDoctor,
  getAllDoctors,
  getOneDoctor,
  deleteDoctor,
  updateDoctor,
}

