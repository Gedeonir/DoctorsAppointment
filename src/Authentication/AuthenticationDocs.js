const dotenv = require("dotenv");
dotenv.config();

const Email = process.env.USER_EMAIL;
const Password = process.env.USER_PASSWORD;

const login = {
  summary: "Login",
  description: "Admin",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            email: {
              type: "string",
              description: "email of the user",
              example: `${Email}`,
            },
            password: {
              type: "string",
              description: "your password",
              example: `${Password}`,
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
    description: "logged in",
      content: {
        "application/json": {
          schema: {
          type: "object",
          example: {
            status: "OK",
            data: {
              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNjQ1YTQyMzlkMjgxODk4MDI3MjM2YzI1IiwiaWF0IjoxNjgzNzE3NDk5LCJleHAiOjE2ODM4MDM4OTl9.w76ksehR7PgUYbiClFgzm25hRSyWtMyxFDPjL1suF8c",
            },
          },
          },
        },
      },
    },
    400: {
    description: "Empty fields",
      content: {
        "application/json": {
          schema: {
          type: "object",
          example: {
            status: "Bad Request",
            data: {
              message: "All fields are required",
            },
          },
          },
        },
      },
    },
    400: {
    description: "email or password don't match",
    content: {
      "application/json": {
        schema: {
        type: "object",
        example: {
          status: "Bad Request",
          data: {
            message: "email or password don't match",
          },
        },
        },
      },
    },
    },
    500: {
      description: "email or password don't match",
      content: {
        "application/json": {
          schema: {
          type: "object",
          example: {
            status: "Internal server error",
            data: {
              message: "Internal server error",
            },
          },
          },
        },
      },
    },
  },
};


const forgotPassword={
  summary: "Forgot password",
  description: "Admin forgot password api",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            email: {
              type: "string",
              description: "email of the user",
              example: `${Email}`,
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
    description: "OK",
      content: {
        "application/json": {
          schema: {
          type: "object",
          example: {
            status: "OK",
            data: {
              message: "Token sent to email",
              token: "solvitcohort5LeTdgOMSzqIKyikIrO4gdrappoinmentprojectpoweredbyteam17"            
            },
          },
          },
        },
      },
    },
    404: {
    description: "Email not found",
      content: {
        "application/json": {
          schema: {
          type: "object",
          example: {
            status: "Not Found",
            data: {
              message: "There is no User with that email address",
            },
          },
          },
        },
      },
    },
    500: {
      description: "email or password don't match",
      content: {
        "application/json": {
          schema: {
          type: "object",
          example: {
            status: "Internal server error",
            data: {
              message:"Error while sending the email please try again after some times",
            },
          },
          },
        },
      },
      },
  },
};

const resetPassword={
  summary: "Reset password",
  description: "Admin reset password api",
  parameters: [
    {
      name: "reset Token",
      required: true,
      in: "path",
      decription: "This is reset password token",
      type: "string",
      example: "solvitcohort5LeTdgOMSzqIKyikIrO4gdrappoinmentprojectpoweredbyteam17",
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            password: {
              type: "string",
              description: "password",
              example: `123`,
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
    description: "OK",
      content: {
        "application/json": {
          schema: {
          type: "object",
          example: {
            status: "OK",
            data: {
              message: "Your password has been updated successfully 👍🏾"            
            },
          },
          },
        },
      },
    },
    400: {
      description: "Empty field",
      content: {
        "application/json": {
          schema: {
          type: "object",
          example: {
            status: "Bad Request",
            data: {
              message: "All fields are required",
            },
          },
          },
        },
      },
    },
    400: {
      description: "When token is not valid",
      content: {
        "application/json": {
          schema: {
          type: "object",
          example: {
            status: "Bad Request",
            data: {
              message: "Invalid Token",
            },
          },
          },
        },
      },
    },
    404: {
    description: "Email not found",
      content: {
        "application/json": {
          schema: {
          type: "object",
          example: {
            status: "Not Found",
            data: {
              message: "There is no User with that email address",
            },
          },
          },
        },
      },
    },
    500: {
      description: "email or password don't match",
      content: {
        "application/json": {
          schema: {
          type: "object",
          example: {
            status: "Internal server error",
            data: {
              message:"Error while sending the email please try again after some times",
            },
          },
          },
        },
      },
      },
  },
};


const changePassword = {
  summary: "Change password",
  description: "Admin can change password",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            oldpassword: {
              type: "string",
              description: "old password of the user",
              example: `1234`,
            },
            newpassword1: {
              type: "string",
              description: "new password of the user",
              example: `123456`,
            },
            newpassword2: {
              type: "string",
              description: "Re-enter password of the user",
              example: `123456`,
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
    description: "Password updated successfully",
      content: {
        "application/json": {
          schema: {
          type: "object",
          example: {
            status: "OK",
            data: {
              message: "your password is updated successfully"            },
          },
          },
        },
      },
    },
    400: {
    description: "Old password is incorrect",
      content: {
        "application/json": {
          schema: {
          type: "object",
          example: {
            status: "Bad Request",
            data: {
              message: "The old password is wrong, correct it and try again"
            },
          },
          },
        },
      },
    },
    400: {
    description: "New passwords do not match",
    content: {
      "application/json": {
        schema: {
        type: "object",
        example: {
          status: "Bad Request",
          data: {
            message: "new password does not match",
          },
        },
        },
      },
    },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: {
          type: "object",
          example: {
            status: "Internal server error",
            data: {
              message: "Unable to change password",
            },
          },
          },
        },
      },
    },
  },
};

const AuthenticationDoc = {
  "/api/v1/users/login": {
    post: login,
  },
  "/api/v1/users/forgotpassword":{
    patch:forgotPassword
  },
  "/api/v1/users/resetpassword/{resetToken}":{
    patch:resetPassword
  },
  "/api/v1/users/changepassword":{
    patch:changePassword
  }
};
module.exports = AuthenticationDoc;