const express=require("express");
const cors=require("cors");
const swaggerUI = require("swagger-ui-express")
const swaggerDocumentation = require("./src/docs/swagger.js")

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to dr appoinment project",
  })
})

app.use(
  "/documentation",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocumentation)
)

module.exports = app
