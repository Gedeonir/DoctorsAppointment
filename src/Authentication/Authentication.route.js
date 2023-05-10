const express=require("express");

const {
    login,
    forgotPassword,
    changePassword,
    resetPassword
}=require('./Authentication.controller.js')

const router=express.Router();

router.post("/login",login);
router.patch("/forgotpassword", forgotPassword);
router.patch("/resetpassword/:token", resetPassword);
router.patch("/changepassword", changePassword);

module.exports=router