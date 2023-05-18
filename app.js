const express=require("express");
const cors=require("cors");
const swaggerUI = require("swagger-ui-express")
const swaggerDocumentation = require("./src/docs/swagger.js")
const departmentsRouter=require("./src/Departments/departments.route.js");
const appoinmentRouter=require("./src/Appointments/Appointment.route.js");
const authenticationRouter=require("./src/Authentication/Authentication.route.js")
const doctorsRouter=require("./src/Doctors/Doctors.route.js");
//const bodyParser = require('body-parser')


const app = express()
app.use(express.json())
//app.use(bodyParser.json())
app.use(cors())

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to r appoinment project",
  })
})



app.use(
  "/documentation",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocumentation)
)

app.use("/api/v1/departments", departmentsRouter);
app.use("/api/v1/appointments",appoinmentRouter);
app.use("/api/v1/users",authenticationRouter);
app.use("/api/v1/doctors",doctorsRouter);



module.exports = app
