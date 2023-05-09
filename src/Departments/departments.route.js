import express from "express";
const {
    getAllDepartments,
    registerDepartment,
    getOneDepartment,
    deleteDepartment,
    updateDepartment
}=require('./departments.controller');

const router =express.Router()

router.get("/",getAllDepartments);
router.post("/addNew",registerDepartment);
router.route("/:deptId").get(getOneDepartment).put(updateDepartment).delete(deleteDepartment);


module.exports=router;
