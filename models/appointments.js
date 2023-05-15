"use strict";
const mongoose=require("mongoose"); 
const { Schema }=require("mongoose");
const Appointment = mongoose.model(
  "appointments",
  new Schema({
    document_id: {
      type: String,
      required:true,
    },
    firstName: {
      type: String,
      required:true,
    },
    lastName: {
      type: String,
      required:true
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required:true
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
    },
    doctorName:{
      type: String,
     required:true
    },
    department:{
      type:String
    },
    sessionDate:{
      type:String
    },
    sessionTime:{
      type: String,
      required:true
    },
    status:{
      type:String
    },
    createdAt:{
      type:String
    }
  })
);

module.exports={Appointment};