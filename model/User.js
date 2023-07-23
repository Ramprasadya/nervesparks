const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    user_email:{
        type: String,
        require : true,
        unique : true
    },
    user_id:{
       type:String,
       unique:true,
       require:ture
    },
    user_location: {
        type : String,
        require : true
    },
    user_info:{
        type: json ,
        require : true
    },
    password:{
        type: String,
        require : true
    },
    vehicle_info:{
        type:String,
        require : true
    }
  });


  const User = mongoose.model('User', userSchema);

  module.exports = User