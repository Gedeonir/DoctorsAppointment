"use strict";
const mongoose=require("mongoose")
const { Schema }=require("mongoose");
const Doctor = mongoose.model(
  "doctors",
  new Schema({
    firstName: {
      type: String,
      required:true
    },
    lastName: {
      type: String,
      required:true
    },
    gender: {
      type: String,
      required:true
    },
    email: {
      type: String,
      required:true,
      unique: true
    },
    telNumber: {
      type: String,
      required:true,
    },
    departmentId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"departments",
      required:true
    },
    departmentName:{
      type: String,
    },
    role:{
      type:String
    },
    
    profilePicture: {
      type: String,
      defaultValue:"",
    },
    createdAt:{
      type:String
    }
  })
);
module.exports={Doctor};