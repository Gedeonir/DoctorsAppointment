const {Department} =require("../../models/Departments");

const registerDepartment=async(req,res)=>{
    const {departmentName,session_lenght,fees}=req.body;
    try {
        const department=await Department.findOne({departmentName:departmentName});

        if (!departmentName||!session_lenght||!fees) {
            return res.status(400).json({
                message:"All fields are required"
            });
        }

        if (department) {
            return res.status(400).json({
                message:'Department Already exists',
            });
        }

        const newDepartment=await Department.create({
            departmentName:departmentName,
            fees:fees,
            sessionDuration:session_lenght
        })

        return res.status(200).json({
            message:"Department added succesfully",
            data:{
                newDepartment
            }
        })


    } catch (error) {
        return res.status(500).json({
            message:"unable to create department",
            error:error
        });
    }
}

const getAllDepartments=async(req,res)=>{
    try {
        const departments=await Department.find();
        return res.status(200).json({
            Count:departments.length,
            data:{
                departments
            }
        })
    } catch (error) {
        return res.status(500).json({
            message:"unable to get users",
            error:error
        })
    }
}

const getOneDepartment=async(req,res)=>{
    const uuid=req.params.deptId;

    try {
        const department=await Department.findOne({_id:uuid});

        return res.status(200).json({
            message:"department fetched succesfully",
            data:{
                department
            }
        });
    } catch (error) {
        return res.status(404).json({
            message:"Department not found",
            error:error
        })
    }
}

const deleteDepartment=async(req,res)=>{
    const uuid=req.params.deptId
    try {
        const department=await Department.findByIdAndRemove({_id:uuid});

        return res.status(200).json({
            message:"Department deleted succesfully"
        });

    } catch (error) {
        return res.status(500).json({
            message:"Unable to delete department",
            error:error
        })
    }
}

const updateDepartment=async(req,res)=>{
    const uuid=req.params.deptId;
    const {departmentName,session_lenght,fees}=req.body;

    try {
        const department=await Department.findOne({_id:uuid});

        department.departmentName=departmentName;
        department.sessionDuration=session_lenght;
        department.fees=fees;
        await department.save();

        return res.status(200).json({
            message:"Department updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message:"Unable to update department",
            error:error
        })
    }
}

module.exports={
    getAllDepartments,
    registerDepartment,
    getOneDepartment,
    deleteDepartment,
    updateDepartment
}