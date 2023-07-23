const mongoose = require('mongoose')

const dealershipSchema = new mongoose.Schema({
    dealership_email:{
        type:String,
        unique:true,
        require:true
    },
    dealership_id:{
        type:String,
        require:ture
    },
    dealership_name:{
        type:String,
        require:true
    },
  dealership_location :{
    type:String,
    require:true
  },
  password:{
    type:String,
    require:true
  },
  dealership_info:{
    type:String,
    require:true
  },
  cars:{
    type:String,
    require:true
  },
  deals:{
    type:String,
    require:true
  },
  sold_vehicles:{
    type:String,
    require:true
  }
  });


  const Dealership = mongoose.model('Dealership', dealershipSchema);

  module.exports = Dealership