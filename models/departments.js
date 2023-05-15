"use strict";
const mongoose=require("mongoose");
const { Schema }=require("mongoose");
const Department = mongoose.model(
    "departments",
    new Schema({
      departmentName:{
        type: String,
        required:true
      },
      fees:{
        type:Number
      },
      sessionDuration:{
        type:Number,
        required:true
      }

    })
  );
  export {Department};