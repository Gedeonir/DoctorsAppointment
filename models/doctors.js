"use strict";
const mongoose=require("mongoose")
const { Schema }=require("mongoose");
const Doctor = mongoose.model(
  "doctors",
  new Schema({
    title:{
      type:String,
    },
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
    password: {
      type: String,
      required:true
    },
    passwordResetToken: {
      type: String,
      default: "",
    },
    profilePicture: {
      type: String,
      defaultValue:"",
    },
    accountActivationToken:{
      type: String,
      default: "",
    },
    active:{
      type:Boolean,
      default:false
    },
    createdAt:{
      type:String
    }
  })
);
export {Doctor};