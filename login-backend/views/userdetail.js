const mongoose = require("mongoose");

const userdetailSchema = new mongoose.Schema(
 {
  fname:String,  
  lname: String,
  type: String,
  email:{type:String,unique:true},
  password:String,
  userType:String,
  },
  {
    collection:"userinfo",
  }
);
mongoose.model("Userinfo", userdetailSchema);
