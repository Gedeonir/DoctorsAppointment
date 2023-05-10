import 'dotenv/config'
const PORT = process.env.PORT || 5000;
const AuthenticationRoutes=require('../Authentication/AuthenticationDocs.js')

const swaggerDoc = {
    openapi: "3.0.0",
    info: {
      title: "Dr appointment project powered By Team 17",
      version: "0.0.1",
      description: "This is Dr appointment project RESTful APIs Documetation",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: "Local dev Server",
      },
      {
        url: "",
        description: "production dev server",
      },
    ],
    components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            in: "header",
            bearerFormat: "JWT",
          },
        },
      },
    security: [
        {
            bearerAuth: [],
        },
    ],
    paths: {
        ...AuthenticationRoutes
    },
  }
  module.exports = swaggerDoc