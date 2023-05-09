const bcrypt = require("bcryptjs");
const { User }=require("../models/users");
const { connect }=require("../config/config.js");
const { default: mongoose } = require("mongoose");

const seedUser=async()=>{
    const adminUser=[{
        firstName: "IRAFASHA",
        lastName:"Gedeon",
          gender:"Male",
          email: "irafasha.jedy12@gmail.com",
          telNumber:"0780689938",
          role:"administrator",
          password:await bcrypt.hash("1234", 12),
          passwordResetToken:"",
          profilePicture:[],
          createdAt:""
    }]

    try {
        await User.deleteMany({});
        await User.insertMany(adminUser);
        console.log("Seed success")
    } catch (error) {

        console.log("Seed Fail\n",error);
        
    }

}

connect().then(() => {
    console.log("Database connected!");
    seedUser().then(()=>{
        mongoose.connection.close();
    });
})

